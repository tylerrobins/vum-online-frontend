const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("hello");
});


router.use('/cancellation', (req, res) => {
    console.log('cancellation');
    res.render(`test-views/standard-template`);
});

router.use('/claims', (req, res) => {
    console.log('claims');
    res.render(`test-views/standard-template`);
});

router.use('/debit-order', (req, res) => {
    console.log('debit-order');
    res.render(`test-views/standard-template`);
});




module.exports = router;