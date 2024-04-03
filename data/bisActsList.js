const bisActsByType = require('./bisActsByType')

const bisActsList = []

Object.keys(bisActsByType).forEach((key)=>{
    bisActsList.push(key);
});

module.exports = bisActsList;