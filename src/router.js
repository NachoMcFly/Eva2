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
router.get('/', gamesController.renderHomeWithArticles)
router.get('/about', pageController.renderAbout)

router.get('/articles/create', gamesController.renderGamesCreationForm)
router.post('/articles/create', gamesController.insertAndRenderGames)

router.get('/articles/:id', gamesController.renderSingleGames)

router.get('/articles/:id/update', gamesController.renderGamesUpdateForm)
router.post('/articles/:id/update', gamesController.updateAndRenderGames)

router.post('/articles/:id/delete', gamesController.deleteGamesAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
