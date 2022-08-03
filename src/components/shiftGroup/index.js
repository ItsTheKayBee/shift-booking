import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ShiftCard from '../shiftCard'
import { formatRelative, differenceInMinutes } from 'date-fns'
import enIN from 'date-fns/locale/en-IN'
import { filterByProperty, parseDuration } from '../../services/util'
import { formatRelativeLocale, pages } from '../../services/constants'

import styles from './index.module.scss'
import { useShiftsContext } from '../../context/ShiftsContext'

const ShiftGroup = ({ shifts = [] }) => {
	const [date, setDate] = useState('')
	const [bookedShifts, setBookedShifts] = useState([])

	const { shifts: allShifts, currentPage } = useShiftsContext()

	const calculateDate = useCallback(() => {
		const newDate = formatRelative(new Date(shifts[0].startTime), new Date(), {
			locale: {
				...enIN,
				formatRelative: token => formatRelativeLocale[token]
			}
		})

		setDate(newDate)
	}, [shifts])

	const totalTime = useMemo(() => {
		if (currentPage === pages.AVAILABLE_SHIFTS) return 0

		let time = 0
		shifts.forEach(shift => {
			time += differenceInMinutes(
				new Date(shift.endTime),
				new Date(shift.startTime)
			)
		})
		return parseDuration(time)
	}, [shifts, currentPage])

	useEffect(() => {
		const result = filterByProperty({
			array: allShifts,
			property: 'booked',
			propertyValue: true
		})
		setBookedShifts(result)
	}, [allShifts])

	useEffect(() => {
		if (shifts.length > 0) calculateDate()
	}, [calculateDate, shifts])

	if (shifts.length === 0) return null

	return (
		<div className={styles.group}>
			<div className={styles.date}>
				{date}{' '}
				{currentPage !== pages.AVAILABLE_SHIFTS && (
					<span className={styles.groupInfo}>
						{shifts.length} shifts, {totalTime}
					</span>
				)}
			</div>
			{shifts.map(shift => (
				<ShiftCard key={shift.id} {...shift} bookedShifts={bookedShifts} />
			))}
		</div>
	)
}

export default ShiftGroup
