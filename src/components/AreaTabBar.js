import { areas } from '../services/constants'

const AreaTabBar = ({ selectedArea, setSelectedArea, shiftGroups = {} }) => {
	return (
		<div>
			{Object.keys(areas).map(area => {
				return (
					<div key={area} onClick={() => setSelectedArea(areas[area])}>
						{areas[area]} ({shiftGroups[areas[area]]?.length ?? 0})
					</div>
				)
			})}
		</div>
	)
}

export default AreaTabBar
