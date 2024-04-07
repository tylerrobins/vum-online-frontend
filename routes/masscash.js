const router = require('express').Router();

const  dateOptions   = require('../data/inceptionDateLogic')
const { writeJSON, readJSON, readWrtieJSON } = require('../test-data/readAndWrite')

// DATA IMPORTS
const bisActsList = require('../data/bisActsList')
const bisActsByType = require('../data/bisActsByType')
const coverOptionsObj = require('../data/coverOptionsObj')
const barCategoryList = require('../data/barCategory')
const barCategoryObj = require('../data/barCatergoryByFields')

const viewsFolder = 'masscash'
const routeDir = 'masscash'

// ROUTES
router.get('/', (req, res) => {
    res.send(
        'Masscash page'
    )
});

// REDIRECT HOME PAGE
router.get('/inception/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber
    res.redirect(`/${routeDir}/inception/business-details/${cellNumber}`) 
});

// Business Details
router.get('/inception/business-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
    res.render(
        `${viewsFolder}/inception-business-details`,
        {
            cellNumber,
            bisActsList
        }
    )
});
router.post('/inception/business-details/:cellNumber', async (req,res) => {
    console.log("Business Details POST")
    const cellNumber = req.params.cellNumber;
    const data = req.body
    data['coverType'] = bisActsByType[data.bisAct]
    await writeJSON(cellNumber, data)
    return res.redirect(`/${routeDir}/inception/cover-options/${cellNumber}`)
});

// Cover Options
router.get('/inception/cover-options/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber;
    const clientData = await readJSON(cellNumber)
    const coverCategoryDetails = coverOptionsObj[clientData['coverType']];
    res.render(`${viewsFolder}/inception-cover-options`,
    {
        cellNumber,
        coverCategoryDetails
    })
});
router.post('/inception/cover-options/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber;
    const coverOptionSelectedName = req.body.coverOpt
    const clientData = await readJSON(cellNumber)
    const coverOptionSelectedDetails = coverOptionsObj[clientData['coverType']][coverOptionSelectedName]
    await writeJSON(cellNumber, {...clientData,'coverSelected': { 'coverName':coverOptionSelectedName,...coverOptionSelectedDetails}})
    return res.redirect(`/${routeDir}/inception/personal-details/${cellNumber}`)
});

// Personal Details
router.get('/inception/personal-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
    res.render(`${viewsFolder}/inception-personal-details`,
    {
        cellNumber
    })
});
router.post('/inception/personal-details/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber
    const data = req.body
    const clientData = await readJSON(cellNumber);
    await writeJSON(cellNumber, {...clientData, ...data})
    return res.redirect(`/${routeDir}/inception/policy-details/${cellNumber}`)
});

// Policy Details
router.get('/inception/policy-details/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber;
    const currentDateOptions = dateOptions();
    const clientData = await readJSON(cellNumber);
    const barNumberLmt = clientData['coverSelected']['barNumberLmt'];
    res.render(`${viewsFolder}/inception-policy-details`,
    {
        cellNumber,
        ...currentDateOptions,
        barNumberLmt,
        barCategoryList
    });
});
router.post('/inception/policy-details/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber;
    const data = req.body
    const clientData = await readJSON(cellNumber);
    await writeJSON(cellNumber, {...clientData, ...data})
    return res.redirect(`/${routeDir}/inception/bar-details/${cellNumber}`)
});

// BAR Details
router.get('/inception/bar-details/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber;
    const clientData = await readJSON(cellNumber) 
    const barNumberSelected =  clientData['barItemsSelected'] || 0;
    const barItems = {}
    for (let i = 0; i < Number(barNumberSelected); i++){
        let catergory = clientData[`barItem${i+1}Category`]
        barItems[catergory] = barCategoryObj[catergory]
    }
    res.render(`${viewsFolder}/inception-bar-details`,
         {  
             cellNumber,
             barItems
         }
     )
});

router.post('/inception/bar-details/:cellNumber', async (req, res) => {
    const cellNumber = req.params.cellNumber;
    const clientData = await readJSON(cellNumber)
    const data = req.body
    const fullData = {...clientData, 'Item Details': data }
    await writeJSON(cellNumber, fullData)
    res.json(fullData)
});

module.exports = router;