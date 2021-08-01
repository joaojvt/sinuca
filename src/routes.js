const express = require('express');
const routes = express.Router()

const TeamController = require('./controllers/TeamController');
const TableController = require('./controllers/TableController');

const teamController = new TeamController()
const tableController = new TableController()

routes.get('/teams', teamController.getTeams)
routes.post('/team', teamController.createTeam)
routes.get('/team/:id', teamController.getTeamById)
routes.put('/team', teamController.editTeam)
routes.delete('/team/:id', teamController.deleteTeam)

routes.get('/tables', tableController.getTables)
routes.post('/table', tableController.createTable)
routes.get('/table/:id', tableController.getTableById)
routes.put('/table', tableController.editTable)
routes.delete('/table/:id', tableController.deleteTable)

routes.post('/add-team-table', tableController.addTeamToTable)
routes.put('/update-team-points', tableController.updateTeamPoits)

module.exports = routes
