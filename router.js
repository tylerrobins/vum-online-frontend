const router = require('express').Router();

// SUB ROUTES IMPORT
const builders_router = require('./routes/builders');
const game_router = require('./routes/game');
const makro_router = require('./routes/makro');
const masscash_router = require('./routes/masscash');

// ROUTES
router.use('/builders', builders_router);
router.use('/game', game_router);
router.use('/makro', makro_router);
router.use('/masscash', masscash_router);

module.exports = router;