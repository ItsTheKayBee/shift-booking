import React, { useCallback, useEffect, useState } from 'react'
import ShiftCard from '../shiftCard'
import { formatRelative, differenceInMinutes } from 'date-fns'
import enIN from 'date-fns/locale/en-IN'
import { filterByProperty, parseDuration } from '../../services/util'

import styles from './index.module.scss'

const formatRelativeLocale = {
	lastWeek: 'MMMM dd',
	yesterday: "'Yesterday'",
	today: "'Today'",
	tomorrow: "'Tomorrow'",
	nextWeek: 'MMMM dd',
	other: 'MMMM dd'
}

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
		const time = shifts.reduce((prev, curr, index) => {
			if (index === 1) {
				return (
					differenceInMinutes(
						new Date(prev.endTime),
						new Date(prev.startTime)
					) +
					differenceInMinutes(new Date(curr.endTime), new Date(curr.startTime))
				)
			}

			return (
				prev +
				differenceInMinutes(new Date(curr.endTime), new Date(curr.startTime))
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
