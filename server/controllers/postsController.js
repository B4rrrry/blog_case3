const { Posts } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class PostsController {

  async create(req, res) {
    try {
      const { title, description, userId, type } = req.body;
      let preview;

      if (!req.files) {
        return next(ApiError.badRequest("Не загружено превью для поста"));
      }

      preview = req.files.preview;

      if (!title || !description || !preview || !userId || !type) {
        return next(ApiError.badRequest("Не заполнены обязательные поля"));
      }

      const fileName = uuid.v4() + '.' + preview.name.split('.')[1];
      const post = await Posts.create({ title, description, userId, type, preview: fileName });
      if (!post) {
        return next(ApiError.badRequest("Ошибка"));
      }
      preview.mv(path.resolve(__dirname, '..', 'static', 'posts_preview', fileName));


      return res.json(post);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const posts = await Posts.findAll();

    return res.json(posts);
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest("Не заполнен id"));
    }

    const post = await Posts.findOne({ where: { id } });

    return res.json(post);
  }

  async deletePost(req, res, next) {
   try {
    const { id } = req.body;

    if (!id) { return next(ApiError.badRequest("Не заполнен id")); }

    const post = await Posts.destroy({ where: { id } });

    if (!post) {
      return next(ApiError.badRequest("Пост не был найден"));
    }

    return next(ApiError.badRequest("Пост успешно удален"));
   } catch (e) {
    return next(ApiError.badRequest(e.message))
   }

  }

}

module.exports = new PostsController();