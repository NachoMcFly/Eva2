class GamesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, gameName, platform, developer, price FROM games')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, gameName, platform, developer, price FROM games WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (games) {
    const response = await this.db.query('INSERT INTO games (gameName, platform, developer, price) VALUES (?, ?)', [games.gameName, games.platform, games.developer, games.price])
    const result = response[0]
    return result.insertId
  }

  async update (games) {
    const response = await this.db.query('UPDATE games SET gameName = ?, platform = ?, developer = ?, price = ? WHERE id = ?', [games.gameName, games.platform, games.developer, games.price, games.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM games WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = GamesDAO
