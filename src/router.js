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

router.get('/games/create', gamesController.renderGamesCreationForm)
router.post('/games/create', gamesController.insertAndRenderGames)

router.get('/games/:id', gamesController.renderSingleGames)

router.get('/games/:id/update', gamesController.renderGamesUpdateForm)
router.post('/games/:id/update', gamesController.updateAndRenderGames)

router.post('/games/:id/delete', gamesController.deleteGamesAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
