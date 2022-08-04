import { useShiftsContext } from '../../context/ShiftsContext'
import { pages } from '../../services/constants'
import { classHelper } from '../../services/util'
import styles from './index.module.scss'

const TabBar = () => {
	const { currentPage, changeCurrentPage } = useShiftsContext()

	return (
		<div className={styles.bar}>
			{Object.keys(pages).map(item => (
				<h3
					key={item}
					onClick={() => changeCurrentPage(pages[item])}
					className={classHelper(
						styles.tab,
						currentPage === pages[item] ? styles.selected : ''
					)}
				>
					{pages[item]}
				</h3>
			))}
		</div>
	)
}

export default TabBar
