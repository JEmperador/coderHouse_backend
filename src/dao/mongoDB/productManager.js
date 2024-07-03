import mongoose from "mongoose";
import { ProductModel } from "../../models/product.model.js";
import { getLocaleTime } from "../../helpers/utils.js";
import CustomError from "../../helpers/errors/custom-error.js";
import {
  generateFieldProductErrorInfo,
  generateInvalidIdProductErrorInfo,
  generateNotFoundProductErrorInfo,
  generateInvalidCodeProductErrorInfo,
  generateCannotUpdateProductErrorInfo,
} from "../../helpers/errors/info.js";
import { Errors } from "../../helpers/errors/enum.js";

/**
 * Represents a Product
 * @typedef {Object} Product
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} thumbnail
 * @property {string} code
 * @property {number} stock
 * @property {string} category
 * @property {boolean} status
 */

class ProductManager {
  /**
   * Create a product
   * @param {Product} product
   * @returns {Promise<boolean>}
   */
  createProduct = async (product) => {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        product.stock === undefined ||
        !product.category
      ) {
        console.log(`All fields are required - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "All fields are required",
          cause: generateFieldProductErrorInfo(product),
          message: "Error when trying to create a product",
          code: Errors.ALL_FIELD_REQUIRED,
        });
      }

      const validateCode = await ProductModel.findOne({ code: product.code });

      if (validateCode) {
        console.log(
          `Product with code ${
            product.code
          } already exists - ${getLocaleTime()}`
        );
        throw CustomError.createError({
          name: "Product with code already exists",
          cause: generateInvalidCodeProductErrorInfo(product.code),
          message: "Error when trying to create a product",
          code: Errors.INVALID_CODE,
        });
      }

      product.status = product.stock > 0 ? true : false;

      const result = await ProductModel.create(product);

      console.log(`Product was loaded successfully - ${getLocaleTime()}`);

      const Reproducts = await this.readProducts();

      return result;
    } catch (err) {
      throw err;
    }
  };

  readProducts = async (limit) => {
    try {
      const products = await ProductModel.find().limit(Number(limit));

      return products;
    } catch (err) {
      console.log("Products not found");
      return [];
    }
  };

  readProductById = async (idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid product ID",
          cause: generateInvalidIdProductErrorInfo(idP),
          message: "Error when trying to read a product",
          code: Errors.INVALID_ID,
        });
      }

      const product = await ProductModel.findById(idP);

      if (!product) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Product",
          cause: generateNotFoundProductErrorInfo(),
          message: "Error when trying to read a product",
          code: Errors.NOT_FOUND,
        });
      }

      return product;
    } catch (err) {
      throw err;
    }
  };

  updateProduct = async (idP, props) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid product ID",
          cause: generateInvalidIdProductErrorInfo(idP),
          message: "Error when trying to update a product",
          code: Errors.INVALID_ID,
        });
      }

      if (props.hasOwnProperty("id") || props.hasOwnProperty("code")) {
        console.log(
          `Cannot update 'id' or 'code' property - ${getLocaleTime()}`
        );
        throw CustomError.createError({
          name: "Cannot update 'id' or 'code' property",
          cause: generateCannotUpdateProductErrorInfo(props._id, props.code),
          message: "Error when trying to update a product",
          code: Errors.CANNOT_UPDATE,
        });
      }

      if (props.hasOwnProperty("stock")) {
        props.status = props.stock > 0 ? true : false;
      }

      const newProduct = await ProductModel.findByIdAndUpdate(idP, props, {
        new: true,
      });

      if (!newProduct) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Product",
          cause: generateNotFoundProductErrorInfo(),
          message: "Error when trying to update a product",
          code: Errors.NOT_FOUND,
        });
      }

      return newProduct;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteProduct = async (idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid product ID",
          cause: generateInvalidIdProductErrorInfo(idP),
          message: "Error when trying to delete a product",
          code: Errors.INVALID_ID,
        });
      }

      const productDeleted = await ProductModel.findByIdAndDelete(idP);

      if (!productDeleted) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Product",
          cause: generateNotFoundProductErrorInfo(),
          message: "Error when trying to delete a product",
          code: Errors.NOT_FOUND,
        });
      }

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  logicalDeleteProduct = async (idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid product ID",
          cause: generateInvalidIdProductErrorInfo(idP),
          message: "Error when trying to delete a product",
          code: Errors.INVALID_ID,
        });
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        idP,
        { status: false },
        { new: true }
      );

      if (!updatedProduct) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Product",
          cause: generateNotFoundProductErrorInfo(),
          message: "Error when trying to delete a product",
          code: Errors.NOT_FOUND,
        });
      }

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ProductManager;
