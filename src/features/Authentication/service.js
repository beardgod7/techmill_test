import tokenService from "../../utils/generatetoken.js";
import userRepository from "./repository/userrepo.js";
import tokenRepository from "./repository/tokenrepo.js";
import dayjs from "dayjs";
import Userhash from "../../utils/bycrpt.js";

class AuthService {
  async register({ email, password, role }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already registered");
    const hashedPassword = await Userhash.hashPassword(password);
    return userRepository.createUser({ email, password: hashedPassword, role });
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("User doesn't exist");
    if (user.isBanned)
      throw new Error("Your account is banned. Contact admin.");

    const valid = await Userhash.comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const [accessToken, refreshToken] = await Promise.all([
      tokenService.generateAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
      tokenService.generateRefreshToken({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    ]);

    const expiresAt = dayjs().add(7, "day").toDate();
    tokenRepository
      .create(refreshToken, user.id, expiresAt)
      .catch(console.error);

    return { user, accessToken, refreshToken };
  }

  async logout(refreshToken) {
    if (!refreshToken) throw new Error("Refresh token required");
    await tokenRepository.delete(refreshToken);
    return { message: "Logout successful" };
  }

  async refreshToken(oldToken) {
    const tokenRecord = await tokenRepository.find(oldToken);
    if (!tokenRecord) throw new Error("Refresh token revoked");

    const decoded = tokenService.verifyRefreshToken(oldToken);
    if (!decoded) throw new Error("Invalid or expired refresh token");

    const user = await userRepository.findById(decoded.sub);
    if (!user) throw new Error("User not found");

    const accessToken = tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken };
  }
  async setBanStatus(userId, isBanned) {
    return userRepository.updateBanStatus(userId, isBanned);
  }
}

export default new AuthService();
