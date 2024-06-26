import mongoose from "mongoose";
import { CartModel } from "../../models/cart.model.js";
import TicketManager from "./ticketManager.js";
import ProductManager from "./productManager.js";
import { getLocaleTime } from "../../helpers/utils.js";
import CustomError from "../../helpers/errors/custom-error.js";
import {
  generateDatabaseErrorInfo,
  generateInvalidIdProductErrorInfo,
  generateNotFoundProductErrorInfo,
  generateInvalidIdCartErrorInfo,
  generateNotFoundCartErrorInfo,
  generateBuyerMissingCartErrorInfo,
} from "../../helpers/errors/info.js";
import { Errors } from "../../helpers/errors/enum.js";

const ticketManager = new TicketManager();
const productManager = new ProductManager();

class CartManager {
  createCart = async (cart) => {
    try {
      const theLastCart = await CartModel.create(cart);

      console.log(`Cart created successfully - ${getLocaleTime()}`);
      return theLastCart;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  createPurchase = async (purchase) => {
    try {
      const cartId = purchase.cid;
      const purchaser = purchase.buyer;

      const cart = await this.readCartById(cartId);
      const products = await productManager.readProducts();

      const amount = await this.readCartAmountById(cartId);

      if (!purchase.buyer) {
        console.error(`Buyer is missing - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Buyer is missing",
          cause: generateBuyerMissingCartErrorInfo(),
          message: "Error when trying to create a purchase",
          code: Errors.BUYER_MISSING,
        });
      }

      //Products in Cart but not in Products
      const productsInCartButNotInProducts = cart.products
        .filter((productInCart) => {
          return !products.some(
            (product) => product.product === productInCart._id
          );
        })
        .map((product) => product.id);

      if (productsInCartButNotInProducts.length > 0) {
        console.error(
          `This products: ${productsInCartButNotInProducts} not exist - ${getLocaleTime()}`
        );
      }

      //Product stock update
      cart.products.forEach(async (productInCart) => {
        const productId = productInCart.product._id;
        const productStock = productInCart.product.stock;
        const productQuantity = productInCart.quantity;

        //Products out of Stock
        if (productQuantity > productStock) {
          productsInCartButNotInProducts.push(productInCart);
          return;
        }

        const newStock = (productInCart.product.stock -=
          productInCart.quantity);

        const updatedProduct = await productManager.updateProduct(productId, {
          stock: newStock,
        });
      });

      //Cart update
      const result = await this.physicalDeleteProducts(cartId);
      productsInCartButNotInProducts.forEach(async (product) => {
        try {
          const updatedCart = await this.updateCart(
            cartId,
            product.product._id,
            product.quantity
          );
        } catch (err) {
          console.error(
            `An error occurred while updating the cart - ${getLocaleTime()}`
          );
          throw CustomError.createError({
            name: "An error occurred while updating the cart",
            cause: generateDatabaseErrorInfo(),
            message: "Error when trying to update a purchase",
            code: Errors.DB_ERROR,
          });
        }
      });

      const ticket = await ticketManager.createTicket({ amount, purchaser });

      const ticketId = ticket._id;

      if (productsInCartButNotInProducts.length === 0) {
        const result = await this.physicalDeleteProducts(cartId);
      }

      return ticketId;
    } catch (err) {
      throw err;
    }
  };

  readCarts = async (limit) => {
    try {
      const carts = CartModel.find().limit(Number(limit));

      return carts;
    } catch {
      console.log("Carts not found");
      return [];
    }
  };

  readCartById = async (idC) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idC)) {
        console.log(`Invalid cart ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid cart ID",
          cause: generateInvalidIdCartErrorInfo(idC),
          message: "Error when trying to read a cart",
          code: Errors.INVALID_ID,
        });
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.error(`Not found Cart - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Cart",
          cause: generateNotFoundCartErrorInfo(),
          message: "Error when trying to read a cart",
          code: Errors.NOT_FOUND,
        });
      }

      return cart;
    } catch (err) {
      throw err;
    }
  };

  readCartAmountById = async (idC) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idC)) {
        console.log(`Invalid cart ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid cart ID",
          cause: generateInvalidIdCartErrorInfo(idC),
          message: "Error when trying to read a cart",
          code: Errors.INVALID_ID,
        });
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.error(`Not found Cart - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Cart",
          cause: generateNotFoundCartErrorInfo(),
          message: "Error when trying to read a cart",
          code: Errors.NOT_FOUND,
        });
      }

      const products = cart.products;

      let total = 0;

      products.forEach((product) => {
        total += product.product.price;
      });

      console.log(`Cart amount: $${total} - ${getLocaleTime()}`);
      return total;
    } catch (err) {
      throw err;
    }
  };

  updateCart = async (idC, idP, quantity) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idC)) {
        console.log(`Invalid cart ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid cart ID",
          cause: generateInvalidIdCartErrorInfo(idC),
          message: "Error when trying to update a cart",
          code: Errors.INVALID_ID,
        });
      }

      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid product ID",
          cause: generateInvalidIdProductErrorInfo(idP),
          message: "Error when trying to update a product",
          code: Errors.INVALID_ID,
        });
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Cart",
          cause: generateNotFoundCartErrorInfo(),
          message: "Error when trying to update a cart",
          code: Errors.NOT_FOUND,
        });
      }

      const existingProduct = cart.products.find((product) =>
        product.product.equals(idP)
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: idP, quantity });
      }

      const updatedCart = await cart.save();

      console.log(updatedCart);
      return updatedCart;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteCart = async (idC) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idC)) {
        console.log(`Invalid cart ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid cart ID",
          cause: generateInvalidIdCartErrorInfo(idC),
          message: "Error when trying to delete a cart",
          code: Errors.INVALID_ID,
        });
      }

      const cartDeleted = await CartModel.findByIdAndDelete(idC);

      if (!cartDeleted) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Cart",
          cause: generateNotFoundCartErrorInfo(),
          message: "Error when trying to delete a cart",
          code: Errors.NOT_FOUND,
        });
      }

      console.log(`Cart removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteProducts = async (idC) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idC)) {
        console.log(`Invalid cart ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid cart ID",
          cause: generateInvalidIdCartErrorInfo(idC),
          message: "Error when trying to remove products from cart",
          code: Errors.INVALID_ID,
        });
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.log("Not found Cart");
        throw CustomError.createError({
          name: "Not found Cart",
          cause: generateNotFoundCartErrorInfo(),
          message: "Error when trying to remove products from cart",
          code: Errors.NOT_FOUND,
        });
      }

      const productsDelete = await CartModel.findByIdAndUpdate(idC, {
        products: [],
      });

      console.log(`Cart was emptied - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteProductById = async (idC, idP) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idC)) {
        console.log(`Invalid cart ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid cart ID",
          cause: generateInvalidIdCartErrorInfo(idC),
          message: "Error when trying to remove product from cart",
          code: Errors.INVALID_ID,
        });
      }

      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Invalid product ID",
          cause: generateInvalidIdProductErrorInfo(idP),
          message: "Error when trying to remove product from cart",
          code: Errors.INVALID_ID,
        });
      }

      const updatedCart = await CartModel.findByIdAndUpdate(idC, {
        $pull: { products: { product: idP } },
      });

      if (!updatedCart) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Cart",
          cause: generateNotFoundCartErrorInfo(),
          message: "Error when trying to remove product from cart",
          code: Errors.NOT_FOUND,
        });
      }

      const productPosition = updatedCart.products.findIndex(
        (el) => el.product._id == idP
      );

      if (productPosition === -1) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Product",
          cause: generateNotFoundProductErrorInfo(),
          message: "Error when trying to remove product from cart",
          code: Errors.NOT_FOUND,
        });
      }

      updatedCart.products.splice(productPosition, 1);
      await updatedCart.save();

      console.log(`Product removed successfully - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default CartManager;
