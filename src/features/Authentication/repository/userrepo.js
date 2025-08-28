import User from "../models/user.model.js";

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async createUser({ email, password, role }) {
    return User.create({ email, password, role });
  }
  async updateBanStatus(userId, isBanned) {
    const user = await this.findById(userId);
    if (!user) throw new Error("User not found");
    user.isBanned = isBanned;
    return user.save();
  }
}

export default new UserRepository();
