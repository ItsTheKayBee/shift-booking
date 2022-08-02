import { useState } from 'react'
import AvailableShifts from './components/availableShifts'
import MyShifts from './components/myShifts'
import TabBar from './components/TabBar'

const App = () => {
	const [currentPage, setCurrentPage] = useState(0)

	return (
		<div>
			<TabBar selected={currentPage} updateSelected={setCurrentPage} />

			{currentPage === 0 && <MyShifts />}
			{currentPage === 1 && <AvailableShifts />}
		</div>
	)
}

export default App
