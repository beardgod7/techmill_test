import Token from "../models/token.model.js";

class TokenRepository {
  async create(token, userId, expiresAt) {
    return Token.create({ token, userId, expiresAt });
  }

  async delete(token) {
    return Token.destroy({ where: { token } });
  }

  async find(token) {
    return Token.findOne({ where: { token }, include: "User" });
  }

  async deleteAllForUser(userId) {
    return Token.destroy({ where: { userId } });
  }
}

export default new TokenRepository();
