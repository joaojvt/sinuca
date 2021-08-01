const knex = require('../database')

class TableController {
  async getTables(req, res) {
    const table = await knex.select('*').from('table')
    return res.status(200).send(table);
  }

  async createTable(req, res) {
    const table = req.body;
    if (!table.points_to_win || !table.prize) {
      return res.status(400).send({
        msg: 'Invalid body'
      });
    }

    await knex('table').insert(table)
    return res.status(201).send();
  }

  async getTableById(req, res) {
    const { id } = req.params

    if (!id) res.status(200).send([])

    const table = await knex('table').where('id', id).first()
    return res.status(200).send(table)
  }

  async editTable(req, res) {
    const table = req.body;
    if (!table.points_to_win || !table.prize) {
      return res.status(400).send({
        msg: 'Invalid body',
        table
      });
    }
    
    const { id } = table
    
    if(!id) res.status(400).send({
      msg: 'No id passed'
    })

    await knex('table').where({ id }).update(table)
    return res.status(200).send();
  }

  async deleteTable(req, res) {
    const { id } = req.params

    if(!id) res.status(400).send({
      msg: 'No id passed'
    })
    
    await knex('table').where('id', id).delete()
    return res.status(200).send()
  }

  async addTeamToTable(req, res){
    const { id_team, id_table } = req.body
    const table =  knex('table').where('id_table', id_table).first()
    if (!table) {
      return res.status(404).send({
        msg: 'table not found'
      })
    }
    const team =  knex('team').where('id_team', id_team).first()
    if (!team) {
      return res.status(404).send({
        msg: 'team not found'
      })
    }

    await knex('team_table').insert({ id_team, id_table, ponits: 0})

    res.status(201).send()
  }

  async updateTeamPoits(req, res){
    const { tableId, teamId, points } = req.body
    const tableMaxPoints = await knex.select('points_to_win')
      .from('table')
      .where('id', tableId)
    const currentTeamPoints = await knex.select('points')
      .from('team_table')
      .where('id_team', teamId)
    const newTeamPoints =  points + currentTeamPoints;

    if (newTeamPoints > tableMaxPoints) {
      newTeamPoints = tableMaxPoints;
    }

    await knex('team_points')
      .update({ points: newTeamPoints })
      .where({ 
        id_team: teamId, 
        id_table: tableId,
      })
    res.status(200).send();
  }

}

module.exports = TableController