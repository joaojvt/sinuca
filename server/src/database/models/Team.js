const PatternCrudModel = require('./PatternCrudModel');
const path = require('path');
const knex = require(path.resolve('src', 'database'))

class Team extends PatternCrudModel {
  constructor() {
    super('team')
  }

  async getTeamPointsInTable(tableId, teamId) {
    return await knex.select('points')
      .from('team_table')
      .where('id_team', teamId)
      .andWhere('id_table', tableId)
      .first()
  }
}

module.exports = Team