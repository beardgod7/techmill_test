import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }
  authenticate() {
    return async (req, res, next) => {
      try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
          return res.status(401).json({
            success: false,
            message: "Access token required!",
          });
        }

        const payload = jwt.verify(accessToken, this.jwtSecret);

        req.accessToken = accessToken;
        req.userId = payload.sub;
        req.role = payload.role;

        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Your session has expired. Please log in again.",
          });
        }
        return res.status(401).json({
          success: false,
          message: "Unauthorized access. Please log in.",
        });
      }
    };
  }
  authorize(...allowedRoles) {
    return (req, res, next) => {
      if (!req.role || !allowedRoles.includes(req.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden. You don't have permission to access this resource.",
        });
      }
      next();
    };
  }
}
