import Joi from "joi";

class AuthValidator {
  constructor() {
    this.registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).{6,}$"
          )
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character",
        }),
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
