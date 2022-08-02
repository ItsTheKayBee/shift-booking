import React, { useCallback, useEffect, useState } from 'react'
import ShiftCard from './shiftCard'
import { formatRelative, differenceInMinutes } from 'date-fns'
import enIN from 'date-fns/locale/en-IN'
import { parseDuration } from '../services/util'

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
		if (shifts.length > 0) {
			calculateDate()
			calculateTotalTime()
		}
	}, [calculateDate, calculateTotalTime, shifts])

	if (shifts.length === 0) return null

	return (
		<div>
			<div>
				{date} {shifts.length} shifts, {totalTime}
			</div>
			{shifts.map(shift => (
				<ShiftCard key={shift.id} {...shift} />
			))}
		</div>
	)
}

export default ShiftGroup
