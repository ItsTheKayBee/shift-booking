import { useState } from 'react'
import AvailableShifts from './components/AvailableShifts'
import MyShifts from './components/MyShifts'
import TabBar from './components/tabBar/TabBar'

import styles from './app.module.scss'

import Loader from './components/Loader'
import { useShiftsContext } from './context/ShiftsContext'

const App = () => {
	const [currentPage, setCurrentPage] = useState(0)

	const { shifts, loading, error } = useShiftsContext()

	return (
		<div className={styles.container}>
			{!shifts && loading && <Loader />}
			{error && 'Error in loading shifts'}
			<TabBar selected={currentPage} updateSelected={setCurrentPage} />
			{currentPage === 0 && <MyShifts shifts={shifts} />}
			{currentPage === 1 && <AvailableShifts shifts={shifts} />}
		</div>
	)
}

export default App
