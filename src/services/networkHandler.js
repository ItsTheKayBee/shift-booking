import axios from 'axios'
import { requestMethods } from './constants'

const apiCall = () => {
	const baseURL = process.env.REACT_APP_BASE_URL

	const headers = { 'content-type': 'application/json' }

	return axios.create({
		baseURL,
		timeout: 2000,
		headers
	})
}

export const request = ({ endpoint = '', method = requestMethods.GET }) => {
	if (method === requestMethods.POST) return apiCall().post(endpoint)

	return apiCall().get(endpoint)
}
