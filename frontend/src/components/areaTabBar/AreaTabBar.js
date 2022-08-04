import { areas } from '../../services/constants'
import { classHelper } from '../../services/util'

import styles from './index.module.scss'

const AreaTabBar = ({ selectedArea, setSelectedArea, shiftGroups = {} }) => {
	return (
		<div className={styles.bar}>
			{Object.keys(areas).map(area => {
				return (
					<div
						key={area}
						onClick={() => setSelectedArea(areas[area])}
						className={classHelper(
							styles.tab,
							selectedArea === areas[area] ? styles.selected : ''
						)}
					>
						{areas[area]} ({shiftGroups[areas[area]]?.length ?? 0})
					</div>
				)
			})}
		</div>
	)
}

export default AreaTabBar
