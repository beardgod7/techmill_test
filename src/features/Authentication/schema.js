import Joi from "joi";

class AuthValidator {
  constructor() {
    this.registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("User", "Admin").required(),
    });

    this.loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    this.refreshSchema = Joi.object({
      token: Joi.string().required(),
    });

    this.logoutSchema = Joi.object({
      token: Joi.string().required(),
    });
  }

  validateRegister(data) {
    return this.registerSchema.validate(data);
  }

  validateLogin(data) {
    return this.loginSchema.validate(data);
  }

  validateRefresh(data) {
    return this.refreshSchema.validate(data);
  }

  validateLogout(data) {
    return this.logoutSchema.validate(data);
  }
}

export default new AuthValidator();
