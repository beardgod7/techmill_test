import Joi from "joi";

class ProductValidator {
  constructor() {
    this.productSchema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      description: Joi.string().max(500).required(),
      quantity: Joi.number().integer().min(0).required(),
      isApproved: Joi.boolean().optional(),
    });

    this.approveSchema = Joi.object({
      isApproved: Joi.boolean().required(),
    });
  }

  validateCreate(data) {
    return this.productSchema.validate(data);
  }

  validateUpdate(data) {
    return this.productSchema.validate(data, { presence: "optional" });
  }

  validateApprove(data) {
    return this.approveSchema.validate(data);
  }
}

export default new ProductValidator();
