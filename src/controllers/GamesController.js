const GamesDAO = require('../models/dao/GamesDAO')

class GamesController {
  constructor (db) {
    this.gamesDao = new GamesDAO(db)
    this.renderHomeWithGames = this.renderHomeWithGames.bind(this)
    this.renderSingleGames = this.renderSingleGames.bind(this)
    this.renderAGamesCreationForm = this.renderGamesCreationForm.bind(this)
    this.renderGamesUpdateForm = this.renderGamesUpdateForm.bind(this)
    this.insertAndRenderGames = this.insertAndRenderGames.bind(this)
    this.updateAndRenderGames = this.updateAndRenderGames.bind(this)
    this.deleteGamesAndRenderResponse = this.deleteGamesAndRenderResponse.bind(this)
  }

  async renderHomeWithGames (req, res) {
    const gameName = await this.gamesDao.getAll()
    res.render('home', {
      gameName
    })
  }

  async renderSingleGames (req, res) {
    const id = req.params.id

    try {
      const games = await this.gamesDao.getById(id)

      if (!games) {
        res.status(404).render('404')
        return
      }

      res.render('game', {
        id,
        gameName: games.gameName,
        platform: games.platform,
        developer: games.developer,
        price: games.price
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderGamesCreationForm (req, res) {
    res.render('games-form')
  }

  async renderGamesUpdateForm (req, res) {
    const id = req.params.id

    try {
      const games = await this.gamesDao.getById(id)

      if (!games) {
        res.status(404).render('404')
        return
      }

      res.render('games-form', {
        id,
        gameName: games.gameName,
        platform: games.platform,
        developer: games.developer,
        price: games.price
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderGames (req, res) {
    const gameName = req.body.gameName
    const platform = req.body.platform
    const developer = req.body.developer
    const price = req.body.price

    const games = { gameName, platform, developer, price }

    try {
      const id = await this.gamesDao.create(games)

      res.redirect(`/game/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderGames (req, res) {
    const id = req.params.id
    const gameName = req.body.gameName
    const platform = req.body.platform
    const developer = req.body.developer
    const price = req.body.price

    try {
      const games = { gameName, platform, developer, price, id }

      await this.gamesDao.update(games)

      res.redirect(`/game/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteGamesAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const games = await this.gamesDao.getById(id)

      if (!games) {
        res.status(404).render('404')
        return
      }

      await this.gamesDao.delete(id)

      res.render('games-deleted', {
        id,
        gameName: games.gameName
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = GamesController
