const path = require('path');
const knex = require(path.resolve('src', 'database'))

class PatternCrudModel{

  constructor(table){
    this.table = table
  }

  async findAll() {
    return await knex.select('*').from(this.table)
  }

  async findById(id){
    return await knex(this.table).where('id', id).first()
  }

  async insert(obj){
    try {
      await knex(this.table).insert(obj)
    } catch (error) {
      return `error trying to create ${this.table}`;
    }
  }

  async update(obj){
    try {
      const { id } = obj
      await knex(this.table).where({ id }).update(obj)
    } catch (error) {
      return `error trying to update ${this.table}`;
    }
  }

  async delete(id){
    await knex(this.table).where('id', id).delete()
  }

}

module.exports = PatternCrudModel