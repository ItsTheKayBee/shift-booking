import { useState } from 'react'
import AvailableShifts from './components/availableShifts'
import MyShifts from './components/myShifts'
import TabBar from './components/tabBar/TabBar'

import styles from './app.module.scss' 

const App = () => {
	const [currentPage, setCurrentPage] = useState(0)

	return (
		<div className={styles.container}>
			<TabBar selected={currentPage} updateSelected={setCurrentPage} />

			{currentPage === 0 && <MyShifts />}
			{currentPage === 1 && <AvailableShifts />}
		</div>
	)
}

export default App
