const router = require('express').Router();
const routerFunction = require('./routes/standard-route-controller')

// Builders
const buildersName = 'builders';
const builders_router = routerFunction(buildersName,'standard-route-views');
router.use(`/${buildersName}`, builders_router);

// Game
const gameName = 'game';
const game_router = routerFunction(gameName,'standard-route-views');
router.use(`/${gameName}`, game_router);

// Makro
const makroName = 'makro';
const makro_router = routerFunction(makroName,'standard-route-views');
router.use(`/${makroName}`, makro_router);

// Masscash
const masscashName = 'masscash'
const masscash_router = routerFunction(masscashName,'standard-route-views');
router.use(`/${masscashName}`, masscash_router);

module.exports = router;