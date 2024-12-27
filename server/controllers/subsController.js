const ApiError = require('../error/ApiError');
const { SubUsers, Subscription } = require('../models/models');

class SubsController {

  async createSubUser(req, res, next) {
    try {
      const { id } = req.body;

      if (!id) {
        return next(ApiError.badRequest("Не заполнен id"));
      }

      const sub = await SubUsers.create({ userId: id });

      return res.json(sub);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getSubUser(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("Не заполнен id"));
      }
      const subUser = await SubUsers.findOne({ where: { userId: id } });

      res.json(subUser);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getSubscriptionsById(req, res, next) {
    try {
      const { id } = req.params;
      const subs = await Subscription.findAll({ where: { subUserId: id } });
      return res.json(subs);
    } catch (e) {

    }
  }

  async createSubscription(req, res, next) {
    try {
      const { subUserId, userId } = req.body;

      if (!subUserId || !userId) {
        return next(ApiError.badRequest("Не заполнены поля"));
      }

      if (subUserId === userId) {
        return next(ApiError.badRequest("Вы не можете подписаться на самого себя"));
      }

      const subscription = await Subscription.create({ subUserId, userId });

      return res.json(subscription);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteSubscription(req, res, next) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return next(ApiError.badRequest("Не заполнены поля"));
      }

      const deletedUser = await Subscription.destroy({ where: { userId } });

      if (!deletedUser) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }

      return res.json({ message: "Подписка удалена" })
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

}

module.exports = new SubsController();