const PatternCrudModel = require('./PatternCrudModel');
const path = require('path');
const knex = require(path.resolve('src', 'database'))

class Table extends PatternCrudModel {
  constructor() {
    super('table')
  }

  async addTeamToTable(obj) {
    await knex('team_table').insert(obj)
  }

  async getTableTeams(idTable) {
    return await knex.select('team.id', 'team.name', 'team.player_one', 'team.player_two', 'team_table.points')
      .from('team')
      .innerJoin('team_table', 'team.id', '=', 'team_table.id_team')
      .where('team_table.id_table', idTable)
  }

  async getTableMaxPoints(idTable) {
    return await knex.select('points_to_win')
      .from('table')
      .where('id', idTable)
  }

  async updateTeamPoints(newTeamPoints, teamId, tableId) {
    await knex('team_table')
      .update({ points: newTeamPoints })
      .where({
        id_team: teamId,
        id_table: tableId,
      })
  }

  async findTeamTable(teamId, tableId) {
    return await knex('team_table')
      .where({
        id_team: teamId,
        id_table: tableId,
      }).first()
  }

  async

  async topTableTeam(tableId) {
    return await knex.select('team.id', 'team.name', 'team.player_one', 'team.player_two', 'team_table.points')
      .from('team_table')
      .innerJoin('team', 'team_table.id_team', '=', 'team.id')
      .where('team_table.id_table', tableId)
      .orderBy('team_table.points', 'desc')
      .first()
  }

}

module.exports = Table