import Product from "./model.js";

class ProductRepository {
  async create(productData) {
    return Product.create(productData);
  }

  async updateApproveStatus(productId, isApproved) {
    const product = await this.getById(productId);
    if (!product) throw new Error("Product not found");

    product.isApproved = isApproved;
    return product.save();
  }
  async update(productId, updateData) {
    const product = await this.getById(productId);
    if (!product) throw new Error("Product not found");
    Object.assign(product, updateData);
    return product.save();
  }

  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return product.destroy();
  }

  async getAllApproved(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { rows: products, count: total } = await Product.findAndCountAll({
      where: { isApproved: true },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return { products, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getById(id) {
    return Product.findByPk(id);
  }

  async getByUserId(userId) {
    return Product.findAll({ where: { userId } });
  }
}

export default new ProductRepository();
