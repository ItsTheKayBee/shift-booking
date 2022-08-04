import { useCallback, useState } from 'react'

const useRequest = () => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleRequest = useCallback(async callback => {
		setLoading(true)
		try {
			if (typeof callback === 'function') {
				const response = await callback()
				setData(response.data)
			} else {
				throw new Error('Callback should be a function')
			}
		} catch (exception) {
			setError(exception)
		} finally {
			setLoading(false)
		}
	}, [])

	return { data, error, loading, handleRequest }
}

export default useRequest
