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
}

export default new UserRepository();
