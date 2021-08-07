const PatternCrudController = require('./PatternCrudController');
const path = require('path');
const Team = require(path.resolve('src', 'database', 'models', 'Team'))
const Table = require(path.resolve('src', 'database', 'models', 'Table'))

const tableModel = new Table();
const teamModel = new Team()

const requiredAttribuites = [
  'name',
  'points_to_win',
  'prize'
]

class TableController extends PatternCrudController {
  constructor() {
    super(tableModel, requiredAttribuites)
  }

  async getTableTeams(req, res) {
    const { id } = req.params
    const teams = await this.model.getTableTeams(id)
    res.send(teams);
  }

  async addTeamToTable(req, res) {
    const { tableId, teamId } = req.body

    if (!tableId || !teamId) {
      res.status(400).send({
        msg: 'Invalid body'
      })
    }

    const table = tableModel.findById(tableId)
    if (!table) {
      return res.sendStatus(404)
    }

    const team = teamModel.findById(teamId)
    if (!team) {
      return res.sendStatus(404)
    }

    const teamExistsOntable = await tableModel.findTeamTable(tableId, teamId)

    if (teamExistsOntable) {
      return res.status(400).send({
        msg: 'team already on table'
      })
    }

    await this.model.addTeamToTable({
      id_table: tableId,
      id_team: teamId,
      points: 0,
    })

    res.sendStatus(201)
  }

  async updateTeamPoints(req, res) {
    const { tableId, teamId, points } = req.body

    if (!tableId || !teamId || !points) {
      res.status(400).send({
        msg: 'Invalid body'
      })
    }

    const tableMaxPoints = this.model.getTableMaxPoints(tableId)
    const { points: currentTeamPoints } = await teamModel.getTeamPointsInTable(tableId, teamId)

    const newTeamPoints = points + currentTeamPoints;

    if (newTeamPoints > tableMaxPoints) {
      newTeamPoints = tableMaxPoints;
    }

    await this.model.updateTeamPoints(newTeamPoints, teamId, tableId)

    res.status(200).send()
  }

  async tableTopTeam(req, res) {
    const tableId = req.params.id
    const team = await this.model.topTableTeam(tableId)
    res.status(200).send(team)
  }

}

module.exports = TableController