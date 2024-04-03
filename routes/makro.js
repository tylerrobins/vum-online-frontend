const router = require('express').Router();

// ROUTES
router.get('/', (req, res) => {
    res.send(
        'Makro page'
    )
});

module.exports = router;