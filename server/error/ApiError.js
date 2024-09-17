class ApiError extends Error {
  constructor(message, code) {
    super();

    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

}

module.exports = ApiError;