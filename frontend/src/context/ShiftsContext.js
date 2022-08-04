import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'
import useRequest from '../hooks/useRequest'
import { getAllShifts } from '../services/apis'
import { pages } from '../services/constants'

const ShiftsContext = createContext({})

const ShiftsProvider = ({ children }) => {
	const [currentPage, changeCurrentPage] = useState(pages.MY_SHIFTS)

	const { data: shifts, error, loading, handleRequest } = useRequest()

	useEffect(() => {
		handleRequest(getAllShifts)
	}, [handleRequest])

	const refreshShifts = useCallback(
		() => handleRequest(getAllShifts),
		[handleRequest]
	)

	return (
		<ShiftsContext.Provider
			value={{
				shifts,
				error,
				loading,
				refreshShifts,
				currentPage,
				changeCurrentPage
			}}
		>
			{children}
		</ShiftsContext.Provider>
	)
}

export const useShiftsContext = () => useContext(ShiftsContext)

export default ShiftsProvider
