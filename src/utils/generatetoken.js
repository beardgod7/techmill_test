import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class TokenService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiry = process.env.JWT_EXPIRES_IN;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET;
    this.refreshExpiry = process.env.JWT_REFRESH_EXPIRES_IN;
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiry });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiry,
    });
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      return null;
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshSecret);
    } catch (err) {
      return null;
    }
  }
}

export default new TokenService();
