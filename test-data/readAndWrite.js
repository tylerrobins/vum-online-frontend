const fs = require('fs').promises;

async function writeJSON(cellNumber, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(`test-data/${cellNumber}.json`, jsonData, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('JSON data written successfully');
        }
    })
}

async function readJSON(cellNumber){
    try {
        const jsonData = await fs.readFile(`test-data/${cellNumber}.json`,'utf8')
        const data = JSON.parse(jsonData);
        return data
    } catch (err) { 
        console.log('Error:', err)
     }
}

async function readWrtieJSON(cellNumber, additionalData){
    const currentData = await readJSON(cellNumber);
    const data = {...currentData, ...additionalData};
    writeJSON(cellNumber, data)
}

module.exports = {
    writeJSON,
    readJSON,
    readWrtieJSON
}