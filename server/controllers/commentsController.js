const ApiError = require('../error/ApiError');
const { Comments, Users } = require('../models/models');

class PostsController {

  async create(req,res,next) {
    try {
      const {userId, postId, text} = req.body;

    if(!userId || !postId || !text) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }

    const comment = await Comments.create({userId, postId, text});

    return res.json(comment);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req,res,next) {
    const {id} = req.body;

   /*  if(!id) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    } */

    const comments = await Comments.findAll();

    return res.json(comments);
  }

}

module.exports = new PostsController();