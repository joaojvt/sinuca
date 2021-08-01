class PatternCrudController {
  constructor(model, requiredAttribuites){
    this.model = model
    this.requiredAttribuites = requiredAttribuites
  }

  async findAll(req, res) {
    const objs = await this.model.findAll()
    res.send(objs)
  }

  async findById(req, res){
    const { id } = req.params
    const obj = await this.model.findById(id)
    res.send(obj)
  }

  async create(req, res){
    const obj = req.body
    if(!this.validateObj(obj)){
      return res.status(400).send({
        msg: 'Invalid body'
      })
    }

    try {
      await this.model.insert(obj)
      res.sendStatus(201)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async update(req, res){
    const obj = req.body
    if(!this.validateObj(obj)){
      return res.status(400).send({
        msg: 'Invalid body'
      })
    }

    try {
      await this.model.update(obj)
      res.sendStatus(201)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async delete(req, res){
    const { id } = req.params
    await this.model.delete(id)
    res.send(200).send()
  }

  validateObj(obj){
    for (const attr of this.requiredAttribuites) {
      if (!obj[attr]) {
        return false;
      }
    }
    return true
  }
}

module.exports = PatternCrudController