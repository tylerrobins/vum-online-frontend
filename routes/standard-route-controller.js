function routerFunction(routerName, viewsFolderName) {
    const dateOptions = require('../data/inceptionDateLogic');
    const { writeJSON, readJSON, readWrtieJSON } = require('../test-data/readAndWrite');

    // DATA IMPORTS
    const bisActsList = require('../data/bisActsList');
    const bisActsByType = require('../data/bisActsByType');
    const coverOptionsObj = require('../data/coverOptionsObj');
    const barCategoryList = require('../data/barCategory');
    const barCategoryObj = require('../data/barCatergoryByFields');

    const routeDir = routerName;
    const viewsFolder = viewsFolderName;

    const router = require('express').Router();
    // ROUTES
    router.get('/', (req, res) => {
        res.send(
            `${routeDir}`
        );
    });

    // REDIRECT HOME PAGE
    router.get('/inception/:cellNumber', (req, res) => {
        const cellNumber = req.params.cellNumber;
        res.redirect(`/${routeDir}/inception/business-details/${cellNumber}`);
    });

    // Business Details
    router.get('/inception/business-details/:cellNumber', (req, res) => {
        const cellNumber = req.params.cellNumber;
        console.log(cellNumber);
        if (!cellNumber) {
            return res.json({ failed: "Please insert a cell number as the last route", expect: "..../business-details/PHONE-NUMBER" });
        }
        res.render(
            `${viewsFolder}/inception-business-details`,
            {
                cellNumber,
                bisActsList
            }
        );
    });

    router.post('/inception/business-details/:cellNumber', async (req, res) => {
        console.log("Business Details POST");
        const cellNumber = req.params.cellNumber;
        const data = req.body;
        data['coverType'] = bisActsByType[data.bisAct];
        await writeJSON(cellNumber, { ...data, channel: routeDir });
        return res.redirect(`/${routeDir}/inception/cover-options/${cellNumber}`);
    });

    // Cover Options
    router.get('/inception/cover-options/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const clientData = await readJSON(cellNumber);
        console.log(clientData.bisAct);
        if (clientData.bisAct == 'Other') {
            return res.render(`${viewsFolder}/other-business-activity`);
        } else {
            const coverCategoryDetails = coverOptionsObj[clientData['coverType']];
            return res.render(`${viewsFolder}/inception-cover-options`,
                {
                    routeDir,
                    cellNumber,
                    coverCategoryDetails
                });
        }

    });
    router.post('/inception/cover-options/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const coverOptionSelectedName = req.body.coverOpt;
        const clientData = await readJSON(cellNumber);
        const coverOptionSelectedDetails = coverOptionsObj[clientData['coverType']][coverOptionSelectedName];
        await writeJSON(cellNumber, { ...clientData, 'coverSelected': { 'coverName': coverOptionSelectedName, ...coverOptionSelectedDetails } });
        return res.redirect(`/${routeDir}/inception/personal-details/${cellNumber}`);
    });

    // Personal Details
    router.get('/inception/personal-details/:cellNumber', (req, res) => {
        const cellNumber = req.params.cellNumber;
        res.render(`${viewsFolder}/inception-personal-details`,
            {
                routeDir,
                cellNumber
            });
    });
    router.post('/inception/personal-details/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const data = req.body;
        const clientData = await readJSON(cellNumber);
        await writeJSON(cellNumber, { ...clientData, ...data });
        return res.redirect(`/${routeDir}/inception/policy-details/${cellNumber}`);
    });

    // Policy Details
    router.get('/inception/policy-details/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const currentDateOptions = dateOptions();
        const clientData = await readJSON(cellNumber);
        const barNumberLmt = clientData['coverSelected']['barNumberLmt'];
        res.render(`${viewsFolder}/inception-policy-details`,
            {
                routeDir,
                cellNumber,
                ...currentDateOptions,
                barNumberLmt,
                barCategoryList
            });
    });
    router.post('/inception/policy-details/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const data = req.body;
        const clientData = await readJSON(cellNumber);
        await writeJSON(cellNumber, { ...clientData, ...data });
        return res.redirect(`/${routeDir}/inception/bar-details/${cellNumber}`);
    });

    // BAR Details
    router.get('/inception/bar-details/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const clientData = await readJSON(cellNumber);
        const barNumberSelected = clientData['barItemsSelected'] || 0;
        const barItems = {};
        for (let i = 0; i < Number(barNumberSelected); i++) {
            let catergory = clientData[`barItem${i + 1}Category`];
            barItems[catergory] = barCategoryObj[catergory];
        }
        res.render(`${viewsFolder}/inception-bar-details`,
            {
                routeDir,
                cellNumber,
                barItems
            }
        );
    });
    router.post('/inception/bar-details/:cellNumber', async (req, res) => {
        const cellNumber = req.params.cellNumber;
        const clientData = await readJSON(cellNumber);
        const data = req.body;
        const fullData = { ...clientData, 'Item Details': data };
        await writeJSON(cellNumber, fullData);
        res.json(fullData);
    });

    return router;
}

module.exports = routerFunction;