import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const createProduct = async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  try {
    const newProduct = await productService.createProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );
    
    res.status(201).json("Product created successfully");
  } catch (err) {
    if (err.message.includes("All fields")) {
      res.status(409).json(err.message);
    } else if (err.message.includes("Product with")) {
      res.status(409).json(err.message);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
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

export const readProductById = async (req, res) => {
  let { pid } = req.params;

  try {
    const product = await productService.readProductById(pid);

    res.status(200).json(product);
  } catch (err) {
    if (err.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const props = req.body;

  try {
    const updatedProduct = await productService.updateProduct(pid, props);

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Cannot update")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const physicalDeleteProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    let result = await productService.physicalDeleteProduct(pid);

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (err) {
    if (err.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const logicalDeleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    let result = await productService.logicalDeleteProduct(pid);

    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (err) {
    if (err.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};
