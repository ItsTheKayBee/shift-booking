import { requestMethods, shiftActions } from './constants'
import { request } from './networkHandler'

const SHIFTS_API = '/shifts'

export const getAllShifts = () =>
	request({
		endpoint: SHIFTS_API
	})

export const getShiftByID = id =>
	request({
		endpoint: `${SHIFTS_API}/${id}`
	})

export const bookShiftByID = id =>
	request({
		endpoint: `${SHIFTS_API}/${id}/${shiftActions.BOOK}`,
		method: requestMethods.POST
	})

export const cancelShiftByID = id =>
	request({
		endpoint: `${SHIFTS_API}/${id}/${shiftActions.CANCEL}`,
		method: requestMethods.POST
	})
