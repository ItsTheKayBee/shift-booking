import React, { useCallback, useEffect, useState } from 'react'
import ShiftCard from '../shiftCard'
import { formatRelative, differenceInMinutes } from 'date-fns'
import enIN from 'date-fns/locale/en-IN'
import { filterByProperty, parseDuration } from '../../services/util'
import { formatRelativeLocale } from '../../services/constants'

import styles from './index.module.scss'

const ShiftGroup = ({ shifts = [] }) => {
	const [totalTime, setTotalTime] = useState('')
	const [date, setDate] = useState('')
	const [bookedShifts, setBookedShifts] = useState([])

	const calculateDate = useCallback(() => {
		const newDate = formatRelative(new Date(shifts[0].startTime), new Date(), {
			locale: {
				...enIN,
				formatRelative: token => formatRelativeLocale[token]
			}
		})

		setDate(newDate)
	}, [shifts])

	const calculateTotalTime = useCallback(() => {
		let time = 0
		shifts.forEach(shift => {
			time += differenceInMinutes(
				new Date(shift.endTime),
				new Date(shift.startTime)
			)
		})
		setTotalTime(parseDuration(time))
	}, [shifts])

	useEffect(() => {
		const result = filterByProperty({
			array: shifts,
			property: 'booked',
			propertyValue: true
		})
		setBookedShifts(result)
	}, [shifts])

	useEffect(() => {
		if (shifts.length > 0) {
			calculateDate()
			calculateTotalTime()
		}
	}, [calculateDate, calculateTotalTime, shifts])

	if (shifts.length === 0) return null

	return (
		<div className={styles.group}>
			<div className={styles.date}>
				{date}{' '}
				<span className={styles.groupInfo}>
					{shifts.length} shifts, {totalTime}
				</span>
			</div>
			{shifts.map(shift => (
				<ShiftCard key={shift.id} {...shift} bookedShifts={bookedShifts} />
			))}
		</div>
	)
}

export default ShiftGroup
