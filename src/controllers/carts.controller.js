import CartService from "../services/cart.service.js";

const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart();

    res.status(201).json("New Cart created");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPurchase = async (req, res) => {
  let { cid } = req.params;
  let { buyer } = req.body;

  try {
    const purchase = await cartService.createPurchase({ cid, buyer });

    res.status(201).json(purchase);
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found Cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Buyer is")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("This products")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const readCarts = async (req, res) => {
  const { limit } = req.query;

  try {
    const carts = await cartService.readCarts(limit);

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const readCartById = async (req, res) => {
  let { cid } = req.params;

  try {
    const cart = await cartService.readCartById(cid);

    res.status(200).json(cart);
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const readCartAmountById = async (req, res) => {
  const { cid } = req.params;

  try {
    const total = await cartService.readCartAmountById(cid);

    res.status(200).json(total);
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Cart is")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const updateCart = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;

  try {
    const result = await cartService.updateCart(cid, pid, quantity);

    res.status(200).json("Product was added correctly");
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const physicalDeleteCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const result = await cartService.physicalDeleteCart(cid);

    res.status(200).json(`Cart with id: ${cid} was removed`);
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const physicalDeleteProducts = async (req, res) => {
  const { cid } = req.params;

  try {
    const result = await cartService.physicalDeleteProducts(cid);

    res.status(200).json(`Cart with id: ${cid} was emptied`);
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Cart is already")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const physicalDeleteProductById = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const result = await cartService.physicalDeleteProductById(cid, pid);

    res.status(200).json(`Product with id: ${pid} has been removed`);
  } catch (err) {
    if (err.message.includes("Invalid cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Invalid product")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found Cart")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found Product")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};
