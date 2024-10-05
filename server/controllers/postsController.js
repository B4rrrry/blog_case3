const { Posts, TagsPosts, Tags, Users, Comments } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class PostsController {

  async create(req, res, next) {
    try {
      const { title, description, userId, type, tags } = req.body;
      let preview;
      console.log(req.files, 'req');
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

      if (tags) {
        const tagsArr = tags.split(',');
        tagsArr.forEach((tag) => {
          const newTag = TagsPosts.create({ tagId: tag, postId: post.id });
        })
      }

      preview.mv(path.resolve(__dirname, '..', 'static', 'posts_preview', fileName));


      return res.json(post);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const includeQuery =
      [{ model: TagsPosts, include: [{ model: Tags }] },
      { model: Comments }]
    const posts = await Posts.findAll({ include: includeQuery, order: [['createdAt', 'DESC']] });

    return res.json(posts);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const includeQuery =
      [{ model: TagsPosts, include: [{ model: Tags }] },
      { model: Comments, include: [{model:Users}] }]
    if (!id) {
      return next(ApiError.badRequest("Не заполнен id"));
    }

    const post = await Posts.findOne({ where: { id }, include: includeQuery, });
    console.log(post, '{PPST')
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

      return res.json({ status: 200, message: "Пост успешно удален" });
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

  async updatePost(req, res, next) {
    try {
      const { id, title, description, tags } = req.body;
      if (!id || !title || !description) {
        return next(ApiError.badRequest("Не заполнены поля"));
      }

      const post = await Posts.update({ title, description }, { where: { id } })
      const tagsDeleted = await TagsPosts.destroy({ where: { postId: id } });
      if (tags) {
        const tagsArr = tags.split(',');
        tagsArr.forEach((tag) => {
          const newTag = TagsPosts.create({ tagId: tag, postId: id });
        })
      }

      return res.json(post);
    } catch (e) {

    }
  }

}

module.exports = new PostsController();