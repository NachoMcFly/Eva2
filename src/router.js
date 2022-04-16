const express = require('express')
const GamesController = require('./controllers/GamesController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const gamesController = new GamesController(sqlClient)

// Routes
router.get('/', gamesController.renderHomeWithGames)
router.get('/about', pageController.renderAbout)

router.get('/game/create', gamesController.renderGamesCreationForm)
router.post('/game/create', gamesController.insertAndRenderGames)

router.get('/game/:id', gamesController.renderSingleGames)

router.get('/game/:id/update', gamesController.renderGamesUpdateForm)
router.post('/game/:id/update', gamesController.updateAndRenderGames)

router.post('/game/:id/delete', gamesController.deleteGamesAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
