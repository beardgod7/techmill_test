import productService from "./service.js";
import productValidator from "./schema.js";
class ProductController {
  async create(req, res) {
    try {
      const { error, value } = productValidator.validateCreate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const product = await productService.createProduct({
        ...value,
        userId: req.userId,
      });

      res.status(201).json({ message: "Product created", product });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      const { error, value } = productValidator.validateUpdate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const product = await productService.updateProduct(req.params.id, value);
      res.status(200).json({ message: "Product updated", product });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async approve(req, res) {
    try {
      const { error, value } = productValidator.validateApprove(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const product = await productService.approveProduct(
        req.params.id,
        value.isApproved
      );

      res.status(200).json({
        message: `Product ${value.isApproved ? "approved" : "unapproved"} successfully`,
        product,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
      console.log(err);
    }
  }
  async delete(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await productService.getAllProducts(page, limit);

      res.status(200).json({
        products: result.products,
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
        },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getByUser(req, res) {
    try {
      const products = await productService.getProductsByUserId({
        userId: req.userId,
      });
      res.status(200).json({ products });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new ProductController();
