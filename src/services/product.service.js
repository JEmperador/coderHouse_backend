import { productDAO } from "../dao/factory.js";

const dao = new productDAO();

class ProductService {
  createProduct = async (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
    owner
  ) => {
    const newProduct = await dao.createProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
      owner,
    });

    return "Product was created successfully";
  };

  readProducts = async (limit) => {
    const products = await dao.readProducts(limit);

    return products;
  };

  readProductById = async (idP) => {
    const product = await dao.readProductById(idP);

    return product;
  };

  updateProduct = async (idP, props) => {
    const updatedProduct = await dao.updateProduct(idP, props);

    return updatedProduct;
  };

  physicalDeleteProduct = async (idP) => {
    const physicalDeletedProduct = await dao.physicalDeleteProduct(idP);

    return "Product removed";
  };

  logicalDeleteProduct = async (idP) => {
    const logicalDeletedProduct = await dao.logicalDeleteProduct(idP);

    return "Product removed";
  };
}

export default ProductService;
