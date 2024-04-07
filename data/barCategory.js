const barCategoryObj = require('./barCatergoryByFields');

const barCategoryList = []

Object.keys(barCategoryObj).forEach((key) => {
    if ( key != ''){
        barCategoryList.push(key)
    }
});

module.exports = barCategoryList