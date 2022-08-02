import { format } from 'date-fns'
import { classHelper } from '../../services/util'

import styles from './index.module.scss'

const ShiftCard = ({
	startTime,
	endTime,
	area,
	booked = false,
	myShiftsTab = true
}) => {
	return (
		<div className={styles.card}>
			<div>
				<h5 className={styles.time}>
					{format(new Date(startTime), 'HH:mm')}-
					{format(new Date(endTime), 'HH:mm')}
				</h5>
				{myShiftsTab && <p>{area}</p>}
			</div>
			<div className={styles.statusAction}>
				{<div className={classHelper(styles.status)}>Booked</div>}
				<button className={classHelper(styles.button, styles.danger)}>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default ShiftCard
