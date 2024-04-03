const router = require('express').Router();

// ROUTES
router.get('/', (req, res) => {
    res.send(
        'Builders page'
    )
});

module.exports = router;