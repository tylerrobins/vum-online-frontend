const barCategoryObj = require('./barCatergoryByFields');

const barCategoryList = []

Object.keys(barCategoryObj).forEach((key) => {
    barCategoryList.push(key)
});

module.exports = barCategoryList