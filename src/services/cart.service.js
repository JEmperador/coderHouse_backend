import CartManager from "../dao/mongoDB/cartManager.js";

const cartManager = new CartManager();

class CartService {
  createCart = async () => {
    const newCart = await cartManager.createCart();

    return "Cart was created successfully";
  };

  readCarts = async (limit) => {
    const Carts = await cartManager.readCarts(limit);

    return Carts;
  };

  readCartById = async (idC) => {
    const cart = await cartManager.readCartById(idC);

    return cart;
  };

  updateCart = async (idC, idP, quantity) => {
    const updatedCart = await cartManager.updateCart(idC, idP, quantity);

    return updatedCart;
  };

  physicalDeleteCart = async (idC) => {
    const physicalDeletedCart = await cartManager.physicalDeleteCart(idC);

    return "Cart removed";
  };

  physicalDeleteProducts = async (idC) => {
    const physicalDeleteProducts = await cartManager.physicalDeleteProducts(
      idC
    );

    return "Products in the cart were removed";
  };

  physicalDeleteProductById = async (idC, idP) => {
    const physicalDeleteProductById =
      await cartManager.physicalDeleteProductById(idC, idP);

    return "Product from the cart was removed";
  };
}

export default CartService;
