const router = require('express').Router();

const cancellationList = require("../data/cancellationList");
const bisActsList = require('../data/bisActsList');
const cancellationDateList = require("../data/cancellationDateList");
const bankList = require("../data/bankList")

router.get('/', (req, res) => {
    res.send("hello");
});


router.use('/cancellation', (req, res) => {
    console.log('cancellation');
    res.render(`test-views/cancellation`, {cancellationList, cancellationDateList});
});

router.use('/claims', (req, res) => {
    console.log('claims');
    res.render(`test-views/claims`);
});

router.use('/debit-order', (req, res) => {
    console.log('debit-order');
    res.render(`test-views/debit-order`, {bankList});
});

 router.use('/business-details/:cellNumber', (req, res) => {
        const cellNumber = req.params.cellNumber;
        console.log(cellNumber);
        if (!cellNumber) {
            return res.json({ failed: "Please insert a cell number as the last route", expect: "..../business-details/PHONE-NUMBER" });
        }
        res.render(
            `standard-route-views/inception-business-details`,
            {
                cellNumber,
                bisActsList
            }
        );
 });




module.exports = router;
