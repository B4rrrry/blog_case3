const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');


module.exports = function (req,res,next) {
  console.log('dkfldflkdfkl')
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return next(ApiError.badRequest('Не авторизован'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return next(ApiError.badRequest(e.message));
  }

}