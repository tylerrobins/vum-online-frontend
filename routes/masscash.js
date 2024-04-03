const router = require('express').Router();

const  dateOptions   = require('../data/inceptionDateLogic')

// DATA IMPORTS
const bisActsList = require('../data/bisActsList')
const bisActsByType = require('../data/bisActsByType')
const coverOptionsObj = require('../data/coverOptionsObj')

const viewsFolder = 'masscash'
const routeDir = 'masscash'

// ROUTES
router.get('/', (req, res) => {
    res.send(
        'Masscash page'
    )
});

// REDIRECT HOME PAGE
router.get('/inception/', (req, res) => { res.redirect(`/${routeDir}/inception/business-details`) });

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

// Cover Options
router.get('/inception/cover-options/:cellNumber/:coverOption', (req, res) => {
    const cellNumber = req.params.cellNumber;
    const coverOption = req.params.coverOption;
    const coverCategoryDetails = coverOptsByTypes[coverOption]
    res.render(`${viewsFolder}/inception-cover-options`,
    {
        cellNumber,
        coverCategoryDetails
    })
});

// Personal Details
router.get('/inception/personal-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
    res.render(`${viewsFolder}/inception-personal-details`,
    {
        cellNumber
    })
});

// Policy Details
router.get('/inception/policy-details/:cellNumber', (req, res) => {
    const cellNumber = req.params.cellNumber;
    const currentDateOptions = dateOptions();
    res.render(`${viewsFolder}/inception-policy-details`,
    {
        cellNumber,
        ...currentDateOptions
    })
});

module.exports = router;