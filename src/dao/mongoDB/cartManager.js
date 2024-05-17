import mongoose from "mongoose";
import { CartModel } from "../../models/cart.model.js";
import TicketManager from "./ticketManager.js";
import ProductManager from "./productManager.js";
import { getLocaleTime } from "../../helpers/utils.js";

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

      if (!purchase.buyer) {
        console.error(`Buyer is missing - ${getLocaleTime()}`);
        throw new Error("Buyer is missing");
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
        throw new Error(
          `This products: ${productsInCartButNotInProducts} not exist`
        );
      }

      //Product stock update
      cart.products.forEach(async (productInCart) => {
        const productId = productInCart.product._id;
        const productStock = productInCart.product.stock;
        const productQuantity = productInCart.quantity;

        const newStock = (productInCart.product.stock -=
          productInCart.quantity);
        console.log(productId, productStock, productQuantity, newStock);
        const updatedProduct = await productManager.updateProduct(productId, {
          stock: newStock,
        });
      });

      //Cart update
      productsInCartButNotInProducts.forEach(async (product) => {
        try {
          const updatedCart = await updateCart(
            cartId,
            product._id,
            product.quantity
          );
        } catch (err) {
          console.error(
            `An error occurred while updating the cart - ${getLocaleTime()}`
          );
          throw new Error("An error occurred while updating the cart");
        }
      });

      const amount = await this.readCartAmountById(cartId);

      const ticket = await ticketManager.createTicket({ amount, purchaser });

      const ticketId = ticket._id;

      if (productsInCartButNotInProducts.length === 0) {
        const result = await this.physicalDeleteProducts(cartId);
      }

      return ticketId;
    } catch (err) {
      console.log(err);
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
        throw new Error("Invalid cart ID");
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.error(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
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
        throw new Error("Invalid cart ID");
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.error(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
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
        throw new Error("Invalid cart ID");
      }

      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw new Error("Invalid product ID");
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
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
        throw new Error("Invalid cart ID");
      }

      const cartDeleted = await CartModel.findByIdAndDelete(idC);

      if (!cartDeleted) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
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
        throw new Error("Invalid cart ID");
      }

      const cart = await CartModel.findById(idC);

      if (!cart) {
        console.log("Not found Cart");
        throw new Error("Not found Cart");
      }

      if (cart.products.length === 0) {
        console.log(`Cart is already empty - ${getLocaleTime()}`);
        throw new Error("Cart is already empty");
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
        throw new Error("Invalid cart ID");
      }

      if (!mongoose.Types.ObjectId.isValid(idP)) {
        console.log(`Invalid product ID - ${getLocaleTime()}`);
        throw new Error("Invalid product ID");
      }

      const updatedCart = await CartModel.findByIdAndUpdate(idC, {
        $pull: { products: { product: idP } },
      });

      if (!updatedCart) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      const productPosition = updatedCart.products.findIndex(
        (el) => el.product._id == idP
      );

      if (productPosition === -1) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
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
