import productRepository from "./repository.js";

class ProductService {
  async createProduct({ name, description, quantity, userId }) {
    return productRepository.create({ name, description, quantity, userId });
  }

  async approveProduct(productId, isApproved) {
    return productRepository.updateApproveStatus(productId, isApproved);
  }

  async deleteProduct(id) {
    return productRepository.delete(id);
  }

  async getAllProducts(page = 1, limit = 10) {
    return productRepository.getAllApproved(page, limit);
  }

  async getProductById(id) {
    return productRepository.getById(id);
  }

  async updateProduct(productId, updateData) {
    return productRepository.update(productId, updateData);
  }

  async getProductsByUserId(userId) {
    return productRepository.getByUserId(userId);
  }
}

export default new ProductService();
