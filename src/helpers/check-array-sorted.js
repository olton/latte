export default (arr) => arr.every((value, index, array) => index === 0 || value >= array[index - 1])
