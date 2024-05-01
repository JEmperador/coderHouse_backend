import ProductManager from "../dao/mongoDB/productManager.js";

const productManager = new ProductManager();

class ProductService {
  createProduct = async (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status
  ) => {
    const newProduct = await productManager.createProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    });

    return "Product was created successfully";
  };

  readProducts = async (limit) => {
    const products = await productManager.readProducts(limit);

    return products;
  };

  readProductById = async (idP) => {
    const product = await productManager.readProductById(idP);

    return product;
  };

  updateProduct = async (idP, props) => {
    const updatedProduct = await productManager.updateProduct(idP, props);

    return updatedProduct;
  };

  physicalDeleteProduct = async (idP) => {
    const physicalDeletedProduct = await productManager.physicalDeleteProduct(
      idP
    );

    return "Product removed";
  };

  logicalDeleteProduct = async (idP) => {
    const logicalDeletedProduct = await productManager.logicalDeleteProduct(
      idP
    );

    return "Product removed";
  };
}

export default ProductService;
