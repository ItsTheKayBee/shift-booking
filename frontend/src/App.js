import AvailableShifts from './components/AvailableShifts'
import MyShifts from './components/MyShifts'
import TabBar from './components/tabBar/TabBar'

import styles from './app.module.scss'

import Loader from './components/Loader'
import { useShiftsContext } from './context/ShiftsContext'
import { pages } from './services/constants'

const App = () => {
	const { shifts, loading, error, currentPage } = useShiftsContext()

	return (
		<div className={styles.container}>
			{!shifts && loading && <Loader />}
			{error && 'Error in loading shifts'}
			{shifts && <TabBar />}
			{currentPage === pages.MY_SHIFTS && <MyShifts shifts={shifts} />}
			{currentPage === pages.AVAILABLE_SHIFTS && (
				<AvailableShifts shifts={shifts} />
			)}
		</div>
	)
}

export default App
