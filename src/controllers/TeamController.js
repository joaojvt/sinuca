const PatternCrudController = require('./PatternCrudController');
const path = require('path');

const Team = require(path.resolve('src', 'database', 'models', 'Team'))

const teamModel =  new Team();

const requiredAttribuites = [
  'name',
  'player_one',
  'player_two'
]

class TeamController extends PatternCrudController{
  constructor(){
    super(teamModel, requiredAttribuites)
  }
}

module.exports = TeamController