import { useEffect, useState } from 'react'
import _ from 'underscore'

import useRequest from '../../hooks/useRequest'
import { getAllShifts } from '../../services/apis'
import { shiftStates } from '../../services/constants'
import { filterByProperty } from '../../services/util'
import Loader from '../Loader'
import ShiftGroup from '../ShiftGroup'

const MyShifts = () => {
	const [shiftGroups, setShiftGroups] = useState({})

	const { data, error, loading, handleRequest } = useRequest()

	useEffect(() => {
		handleRequest(getAllShifts)
	}, [handleRequest])

	useEffect(() => {
		if (data) {
			const bookedShifts = filterByProperty({
				data,
				property: shiftStates.BOOKED,
				propertyValue: true
			})

			const result = _.groupBy(bookedShifts, ({ startTime }) =>
				new Date(startTime).toDateString()
			)
			setShiftGroups(result)
		}
	}, [data])

	return (
		<div>
			{loading && <Loader />}
			{error && 'Error in loading shifts'}
			{Object.keys(shiftGroups).map(date => (
				<ShiftGroup shifts={shiftGroups[date]} key={date} />
			))}
		</div>
	)
}

export default MyShifts
