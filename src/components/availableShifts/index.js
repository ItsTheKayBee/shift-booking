import React, { useCallback, useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'
import { getAllShifts } from '../../services/apis'
import _ from 'underscore'
import Loader from '../Loader'
import AreaTabBar from '../areaTabBar/AreaTabBar'
import { areas } from '../../services/constants'
import ShiftGroup from '../shiftGroup'

import styles from './index.module.scss'

const AvailableShifts = () => {
	const [shiftGroups, setShiftGroups] = useState({})
	const [shiftGroupsByDate, setShiftGroupsByDate] = useState({})
	const [selectedArea, setSelectedArea] = useState(areas.HELSINKI)

	const { data, error, loading, handleRequest } = useRequest()

	const groupByDate = useCallback(() => {
		const result = _.groupBy(shiftGroups[selectedArea], ({ startTime }) =>
			new Date(startTime).toDateString()
		)
		console.log(result)
		setShiftGroupsByDate(result)
	}, [selectedArea, shiftGroups])

	useEffect(() => {
		handleRequest(getAllShifts)
	}, [handleRequest])

	useEffect(() => {
		if (data) {
			const result = _.groupBy(data, ({ area }) => area)
			console.log(result)
			setShiftGroups(result)
		}
	}, [data])

	useEffect(() => {
		groupByDate()
	}, [groupByDate])

	return (
		<section className={styles.section}>
			{loading && <Loader />}
			{error && 'Error in loading shifts'}
			<AreaTabBar
				selectedArea={selectedArea}
				setSelectedArea={setSelectedArea}
				shiftGroups={shiftGroups}
			/>
			{Object.keys(shiftGroupsByDate).map(date => (
				<ShiftGroup shifts={shiftGroupsByDate[date]} key={date} />
			))}
		</section>
	)
}

export default AvailableShifts
