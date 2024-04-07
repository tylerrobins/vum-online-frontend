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
router.post('/inception/business-details/:cellNumber', (req,res) => {
    console.log("Business Details POST")
    const cellNumber = req.params.cellNumber;
    const data = req.body
    const coverOption = bisActsByType[data.bisAct]
    data['coverType'] = coverOption
    writeJSON(cellNumber, data)
    return res.redirect(`/${routeDir}/inception/cover-options/${cellNumber}/${coverOption}`)
});

// Cover Options
router.get('/inception/cover-options/:cellNumber/:coverOption', (req, res) => {
    const cellNumber = req.params.cellNumber;
    const coverOption = req.params.coverOption;
    const coverCategoryDetails = coverOptionsObj[coverOption]
    res.render(`${viewsFolder}/inception-cover-options`,
    {
        cellNumber,
        coverCategoryDetails
    })
});
router.post('/inception/cover-options/:cellNumber/:coverOption', (req, res) => {
    const cellNumber = req.params.cellNumber;
    const coverOption = req.params.coverOption;
    const coverOptionSelectedName = req.body.coverOpt
    const coverOptionSelectedDetails = coverOptionsObj[coverOption][coverOptionSelectedName]
    readWrtieJSON(cellNumber, {'coverSelected': { 'coverName':coverOptionSelectedName,...coverOptionSelectedDetails}})
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
    writeJSON(cellNumber, {...clientData, ...data})
    const barNumberLmt = clientData['coverSelected']['barNumberLmt'];
    return res.redirect(`/${routeDir}/inception/policy-details/${cellNumber}?barNum=${barNumberLmt}`)
});

// Policy Details
router.get('/inception/policy-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
    const currentDateOptions = dateOptions();
    const barNumberLmt = req.query['barNum']
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
    let paramString = ''
    const barItemObj = {}
    const clientData = await readJSON(cellNumber);
    for (let i=0; i < data.barItemsNumDropdown; i++) {
        const barItem = data[`barItemCategory${i+1}`]
        paramString += `&barItemCategory${i+1}=${barItem}`
        barItemObj[barItem] = {}
    }
    writeJSON(cellNumber, {...clientData, barItems: barItemObj})
    console.log(data)
    return res.redirect(`/${routeDir}/inception/bar-details/${cellNumber}?barNum=${data.barItemsNumDropdown}${paramString}`)
});

// BAR Details
router.get('/inception/bar-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
    const barItemsSelected = req.query['barNum'];
    const barItems = {}
    for (let i=0; i < barItemsSelected; i++){
        let item = req.query[`barItemCategory${i+1}`]
        barItems[item] = barCategoryObj[item]
    }
    console.log({ cellNumber: cellNumber, barItemNum: barItemsSelected, barItems: barItems })
    res.render(`${viewsFolder}/inception-bar-details`,
        {
            cellNumber,
            barItems
        }
    )
});

router.post('/inception/bar-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
});

module.exports = router;