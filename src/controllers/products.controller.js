import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const createProduct = async (req, res, next) => {
  const { title, description, price, thumbnail, code, stock, category, owner } =
    req.body;
  try {
    const newProduct = await productService.createProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      owner
    );

    res.status(201).json("Product created successfully");
  } catch (err) {
    next(err);
  }
};

export const readProducts = async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productService.readProducts(limit);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const readProductById = async (req, res, next) => {
  let { pid } = req.params;

  try {
    const product = await productService.readProductById(pid);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { pid } = req.params;
  const props = req.body;

  try {
    const updatedProduct = await productService.updateProduct(pid, props);

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const physicalDeleteProduct = async (req, res, next) => {
  const { pid } = req.params;

  try {
    let result = await productService.physicalDeleteProduct(pid);

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (err) {
    next(err);
  }
};

export const logicalDeleteProduct = async (req, res, next) => {
  const { pid } = req.params;
  try {
    let result = await productService.logicalDeleteProduct(pid);

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (err) {
    next(err);
  }
};
