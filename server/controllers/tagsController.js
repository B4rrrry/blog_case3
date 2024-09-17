const ApiError = require('../error/ApiError');
const { Tags } = require('../models/models');

class TagController {

  async create(req, res, next) {
    try {
      const { title } = req.body;

      if (!title) {
        return next(ApiError.badRequest("Введите название тега"));
      }
      const tag = await Tags.create({ title });
  
      return res.json(tag);
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }


  async getAll(req,res,next) {

    const tags = await Tags.findAll();

    return res.json(tags);

  }

}

module.exports = new TagController();