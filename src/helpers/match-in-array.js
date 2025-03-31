export default (val, array) => {
  return array.filter(item => val.includes(item)).length > 0
}
