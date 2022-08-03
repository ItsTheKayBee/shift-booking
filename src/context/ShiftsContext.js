import { createContext, useCallback, useContext, useEffect } from 'react'
import useRequest from '../hooks/useRequest'
import { getAllShifts } from '../services/apis'

const ShiftsContext = createContext({})

const ShiftsProvider = ({ children }) => {
	const { data: shifts, error, loading, handleRequest } = useRequest()

	useEffect(() => {
		handleRequest(getAllShifts)
	}, [handleRequest])

	const refreshShifts = useCallback(
		() => handleRequest(getAllShifts),
		[handleRequest]
	)

	return (
		<ShiftsContext.Provider value={{ shifts, error, loading, refreshShifts }}>
			{children}
		</ShiftsContext.Provider>
	)
}

export const useShiftsContext = () => useContext(ShiftsContext)

export default ShiftsProvider
