const router = require('express').Router();

// ROUTES
router.get('/', (req, res) => {
    res.send(
        'Game page'
    )
});

module.exports = router;