import Token from "../models/token.model.js";
class TokenRepository {
  async create(token, userId, expiresAt) {
    return Token.create({ token, userId, expiresAt, type: "refresh" });
  }

  async find(token) {
    return Token.findOne({ where: { token, type: "refresh" } });
  }

  async delete(token) {
    return Token.destroy({ where: { token, type: "refresh" } });
  }
}

export default new TokenRepository();
