import { cartDAO } from "../dao/factory.js";

const dao = new cartDAO();

class CartService {
  createCart = async () => {
    const newCart = await dao.createCart();

    return "Cart was created successfully";
  };

  readCarts = async (limit) => {
    const Carts = await dao.readCarts(limit);

    return Carts;
  };

  readCartById = async (idC) => {
    const cart = await dao.readCartById(idC);

    return cart;
  };

  updateCart = async (idC, idP, quantity) => {
    const updatedCart = await dao.updateCart(idC, idP, quantity);

    return updatedCart;
  };

  physicalDeleteCart = async (idC) => {
    const physicalDeletedCart = await dao.physicalDeleteCart(idC);

    return "Cart removed";
  };

  physicalDeleteProducts = async (idC) => {
    const physicalDeleteProducts = await dao.physicalDeleteProducts(idC);

    return "Products in the cart were removed";
  };

  physicalDeleteProductById = async (idC, idP) => {
    const physicalDeleteProductById = await dao.physicalDeleteProductById(
      idC,
      idP
    );

    return "Product from the cart was removed";
  };
}

export default CartService;
