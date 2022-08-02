import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'
import { getAllShifts } from '../../services/apis'
import _ from 'underscore'
import Loader from '../Loader'
import ShiftGroup from '../ShiftGroup'
import AreaTabBar from '../AreaTabBar'
import { areas } from '../../services/constants'

const AvailableShifts = () => {
	const [shiftGroups, setShiftGroups] = useState({})
	const [selectedArea, setSelectedArea] = useState(areas.HELSINKI)

	const { data, error, loading, handleRequest } = useRequest()

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

	return (
		<div>
			{loading && <Loader />}
			{error && 'Error in loading shifts'}
			<AreaTabBar
				selectedArea={selectedArea}
				setSelectedArea={setSelectedArea}
				shiftGroups={shiftGroups}
			/>
			{<ShiftGroup shifts={shiftGroups[selectedArea]} />}
		</div>
	)
}

export default AvailableShifts
