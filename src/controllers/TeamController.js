const knex = require('../database')

class TeamController{
  async getTeams(req, res){
    const teams = await knex.select('*').from('team')
    return res.status(200).send(teams);
  }

  async createTeam(req, res){
    const team = req.body;
    if(!team.player_one || !team.player_two){
      return res.status(400).send({
        msg: 'Invalid body'
      });
    }

    await knex('team').insert(team)
    return res.status(201).send();
  }

  async getTeamById(req, res){
    const { id } = req.params
    
    if(!id) res.status(200).send([])

    const team = await knex('team').where('id', id).first()
    return res.status(200).send(team)
  }

  async editTeam(req, res){
    const team = req.body;
    if(!team.player_one && !team.player_two){
      return res.status(400).send({
        msg: 'Invalid body'
      });
    }
    const { id } = team

    if(!id) res.status(400).send({
      msg: 'No id passed'
    })

    await knex('team').where({ id }).update(team)
    return res.status(200).send();
  }

  async deleteTeam(req, res){
    const { id } = req.params

    if(!id) res.status(400).send({
      msg: 'No id passed'
    })

    await knex('team').where('id', id).delete()
    return res.status(200).send()
  }
}

module.exports = TeamController