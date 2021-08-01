const express = require('express');
const routes = express.Router()

const TeamController = require('./controllers/TeamController');
const TableController = require('./controllers/TableController');

const teamController = new TeamController()
const tableController = new TableController()

routes.get('/teams', teamController.findAll.bind(teamController))
routes.post('/team', teamController.create.bind(teamController))
routes.get('/team/:id', teamController.findById.bind(teamController))
routes.put('/team', teamController.update.bind(teamController))
routes.delete('/team/:id', teamController.delete.bind(teamController))

routes.get('/tables', tableController.findAll.bind(tableController))
routes.post('/table', tableController.create.bind(tableController))
routes.get('/table/:id', tableController.findById.bind(tableController))
routes.put('/table', tableController.update.bind(tableController))
routes.delete('/table/:id', tableController.delete.bind(tableController))

routes.get('/table-teams/:id', tableController.getTableTeams.bind(tableController))
routes.post('/add-team-table', tableController.addTeamToTable.bind(tableController))
routes.put('/update-team-points', tableController.updateTeamPoints.bind(tableController))
routes.get('/table-top-team/:id', tableController.tableTopTeam.bind(tableController))

module.exports = routes
