const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("hello");
});


router.use('/cancellation', (req, res) => {
    console.log('cancellation');
    res.render(`test-views/cancellation`);
});

router.use('/claims', (req, res) => {
    console.log('claims');
    res.render(`test-views/claims`);
});

router.use('/debit-order', (req, res) => {
    console.log('debit-order');
    res.render(`test-views/debit-order`);
});




module.exports = router;