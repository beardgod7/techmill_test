class ErrorHandler {
  static handle(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: {
        message: err.message || "Internal Server Error",
      },
    });
  }
}

export default ErrorHandler;
