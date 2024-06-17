export const sortObject = (data) => {
  const array = Object.entries(data);
  array.sort((a, b) => b[1] - a[1]);
  return Object.fromEntries(array);
}

export const reduceToObject = (arrayData, key) => {
  const group = arrayData.reduce((newObj, item) => {
    if (newObj[item[key]] == undefined) {
      newObj[item[key]] = 0;
    }
    newObj[item[key]]++
    return newObj
  }, {});
  return sortObject(group)
}

export const formatDate = (date) => {
  const [year, month, day] = date.slice(0, 10).split('-');
  return `${day}/${month}/${year}`
}