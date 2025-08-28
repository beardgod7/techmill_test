import authService from "./service.js";
import authValidator from "./schema.js";
class AuthController {
  async register(req, res) {
    try {
      const { error } = authValidator.validateRegister(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { email, password, role } = req.body;
      const user = await authService.register({ email, password, role });
      const safeUser = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      res.status(201).json({
        message: "Registration successful",
        user: safeUser,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Login
  async login(req, res) {
    try {
      const { error } = authValidator.validateLogin(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await authService.login(
        email,
        password
      );

      const safeUser = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      res.status(200).json({
        message: "Login successful",
        user: safeUser,
        accessToken,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async logout(req, res) {
    try {
      const { error } = authValidator.validateLogout(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const { token } = req.body;
      const result = await authService.logout(token);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async refresh(req, res) {
    try {
      const { error } = authValidator.validateRefresh(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const { token } = req.body;
      const result = await authService.refreshToken(token);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new AuthController();
