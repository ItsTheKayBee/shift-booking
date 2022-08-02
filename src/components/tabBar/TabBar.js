import { classHelper } from '../../services/util'
import styles from './index.module.scss'

const items = ['My Shifts', 'Available Shifts']

const TabBar = ({ selected, updateSelected }) => (
	<div className={styles.bar}>
		{items.map((item, index) => (
			<h3
				key={index}
				onClick={() => updateSelected(index)}
				className={classHelper(
					styles.tab,
					selected === index ? styles.selected : ''
				)}
			>
				{item}
			</h3>
		))}
	</div>
)

export default TabBar
