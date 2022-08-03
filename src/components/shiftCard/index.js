import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { checkTimeOverlap, classHelper } from '../../services/util'
import useRequest from '../../hooks/useRequest'

import styles from './index.module.scss'
import { shiftStates } from '../../services/constants'
import { bookShiftByID, cancelShiftByID } from '../../services/apis'
import Loader from '../Loader'

const ShiftCard = ({
	startTime,
	endTime,
	area,
	booked = false,
	myShiftsTab = true,
	bookedShifts,
	id
}) => {
	const [status, setStatus] = useState('')

	const isOverlapping = useMemo(() => {
		if (booked) return false
		return checkTimeOverlap(bookedShifts, { startTime, endTime })
	}, [bookedShifts, startTime, endTime, booked])

	const getStatus = useCallback(() => {
		if (booked) return shiftStates.BOOKED

		return isOverlapping ? shiftStates.OVERLAPPING : ''
	}, [booked, isOverlapping])

	useEffect(() => {
		setStatus(getStatus())
	}, [getStatus])

	return (
		<div className={styles.card}>
			<div className={styles.timeArea}>
				<h5 className={styles.time}>
					{format(new Date(startTime), 'HH:mm')}-
					{format(new Date(endTime), 'HH:mm')}
				</h5>
				{myShiftsTab && <p className={styles.area}>{area}</p>}
			</div>
			<div className={styles.statusAction}>
				<div className={classHelper(styles.status)}>{status}</div>
				<Button
					startTime={startTime}
					endTime={endTime}
					booked={booked}
					id={id}
					isOverlapping={isOverlapping}
				/>
			</div>
		</div>
	)
}

const Button = ({ startTime, endTime, booked, isOverlapping, id }) => {
	const { loading, handleRequest } = useRequest()

	const hasShiftStarted = useCallback(() => Date.now() > startTime, [startTime])

	const hasShiftEnded = useCallback(() => Date.now() >= endTime, [endTime])

	const isShiftGone = useMemo(
		() => hasShiftEnded() || hasShiftStarted(),
		[hasShiftStarted, hasShiftEnded]
	)

	const bookSlot = () => {
		handleRequest(() => bookShiftByID(id))
	}

	const cancelSlot = () => {
		handleRequest(() => cancelShiftByID(id))
	}

	const onClickHandler = () => {
		if (isShiftGone || isOverlapping) return null

		if (booked) {
			cancelSlot()
			return
		}

		bookSlot()
	}

	return (
		<button
			className={classHelper(
				styles.button,
				booked ? styles.danger : styles.success
			)}
			onClick={onClickHandler}
			disabled={isShiftGone || isOverlapping}
		>
			{loading ? <Loader /> : booked ? 'Cancel' : 'Book'}
		</button>
	)
}

export default ShiftCard
