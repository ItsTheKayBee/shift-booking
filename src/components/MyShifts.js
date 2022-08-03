import { useMemo } from 'react'
import _ from 'underscore'

import { shiftStates } from '../services/constants'
import { filterByProperty } from '../services/util'
import ShiftGroup from './shiftGroup'

import styles from './section.module.scss'

const MyShifts = ({ shifts = [] }) => {
	const bookedShifts = useMemo(
		() =>
			filterByProperty({
				array: shifts,
				property: shiftStates.BOOKED,
				propertyValue: true
			}),
		[shifts]
	)

	const shiftGroups = useMemo(
		() =>
			_.groupBy(bookedShifts, ({ startTime }) =>
				new Date(startTime).toDateString()
			),
		[bookedShifts]
	)

	return (
		<div className={styles.section}>
			{Object.keys(shiftGroups).map(date => (
				<ShiftGroup shifts={shiftGroups[date]} key={date} />
			))}
		</div>
	)
}

export default MyShifts
