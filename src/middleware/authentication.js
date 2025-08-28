import jwt from "jsonwebtoken";
import userRepository from "../features/Authentication/repository/userrepo.js";
export default class AuthMiddleware {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  authenticate() {
    return async (req, res, next) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
          return res.status(401).json({ message: "Access token required" });

        const payload = jwt.verify(token, this.jwtSecret);

        const user = await userRepository.findById(payload.sub);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        if (user.isBanned) {
          return res
            .status(403)
            .json({ message: "Your account is banned. Contact admin." });
        }

        req.userId = user.id;
        req.role = user.role;
        req.accessToken = token;

        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Session expired. Please login again." });
        }
        return res.status(401).json({ message: "Unauthorized" });
      }
    };
  }
  authorize(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.role))
        return res.status(403).json({ message: "Forbidden" });
      next();
    };
  }
}
