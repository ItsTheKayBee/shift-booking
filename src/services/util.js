export const filterByProperty = ({
	array = [],
	property = '',
	propertyValue = ''
}) => array.filter(element => element[property.toLowerCase()] === propertyValue)

export const parseDuration = minutes => {
	const hours = minutes / 60
	minutes %= 60
	return `${hours} h ${minutes} m`
}

export const classHelper = (...classes) =>
	classes.reduce((prev, curr) => `${prev} ${curr}`)
