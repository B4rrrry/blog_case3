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

      return next(ApiError.badRequest("Подписка удалена"));
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

}

module.exports = new SubsController();