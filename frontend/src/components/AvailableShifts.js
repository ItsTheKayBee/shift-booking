import React, { useMemo, useState } from 'react'
import _ from 'underscore'
import AreaTabBar from './areaTabBar/AreaTabBar'
import { areas } from '../services/constants'
import ShiftGroup from './shiftGroup'

import styles from './section.module.scss'

const AvailableShifts = ({ shifts = [] }) => {
	const [selectedArea, setSelectedArea] = useState(areas.HELSINKI)

	const shiftGroupsByArea = useMemo(
		() => _.groupBy(shifts, ({ area }) => area),
		[shifts]
	)

	const shiftGroupsByDate = useMemo(
		() =>
			_.groupBy(shiftGroupsByArea[selectedArea], ({ startTime }) =>
				new Date(startTime).toDateString()
			),
		[selectedArea, shiftGroupsByArea]
	)

	return (
		<section className={styles.section}>
			<AreaTabBar
				selectedArea={selectedArea}
				setSelectedArea={setSelectedArea}
				shiftGroups={shiftGroupsByArea}
			/>
			{Object.keys(shiftGroupsByDate).map(date => (
				<ShiftGroup shifts={shiftGroupsByDate[date]} key={date} />
			))}
		</section>
	)
}

export default AvailableShifts
