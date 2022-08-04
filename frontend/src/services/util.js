import { areIntervalsOverlapping } from 'date-fns'

export const filterByProperty = ({
	array = [],
	property = '',
	propertyValue = ''
}) =>
	array?.filter(element => element[property.toLowerCase()] === propertyValue) ??
	[]

export const parseDuration = minutes => {
	const hours = Math.floor(minutes / 60)

	minutes -= 60 * hours

	if (!minutes) return `${hours} h`

	return `${hours} h ${minutes} m`
}

export const classHelper = (...classes) =>
	classes.reduce((prev, curr) => `${prev} ${curr}`)

export const checkTimeOverlap = (bookedShifts = [], checkShift = {}) => {
	let isOverlapping = false
	bookedShifts.every(shift => {
		const firstInterval = {
			start: new Date(shift.startTime),
			end: new Date(shift.endTime)
		}
		const secondInterval = {
			start: new Date(checkShift.startTime),
			end: new Date(checkShift.endTime)
		}
		if (areIntervalsOverlapping(firstInterval, secondInterval)) {
			isOverlapping = true
			return false
		}
		return true
	})
	return isOverlapping
}
