import CartService from "../services/cart.service.js";
import { Preference } from "mercadopago";
import { client } from "../configs/mercadopago.config.js";

const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart();

    res.status(201).json("New Cart created");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPurchase = async (req, res, next) => {
  let { cid } = req.params;
  let { buyer } = req.body;

  try {
    const purchase = await cartService.createPurchase({ cid, buyer });

    res.status(201).json(purchase);
  } catch (err) {
    next(err);
  }
};

export const mercadopago = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://www.mercadolibre.com.ar",
        failure: "https://www.mercadolibre.com.ar",
        pending: "https://www.mercadolibre.com.ar",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({
      id: result.id,
    });

  } catch (err) {
    res.status(500).json(err);
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

export const readCartById = async (req, res, next) => {
  let { cid } = req.params;

  try {
    const cart = await cartService.readCartById(cid);

    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const readCartAmountById = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const total = await cartService.readCartAmountById(cid);

    res.status(200).json(total);
  } catch (err) {
    next(err);
  }
};

export const updateCart = async (req, res, next) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;

  try {
    const result = await cartService.updateCart(cid, pid, quantity);

    res.status(200).json("Product was added correctly");
  } catch (err) {
    next(err);
  }
};

export const physicalDeleteCart = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const result = await cartService.physicalDeleteCart(cid);

    res.status(200).json(`Cart with id: ${cid} was removed`);
  } catch (err) {
    next(err);
  }
};

export const physicalDeleteProducts = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const result = await cartService.physicalDeleteProducts(cid);

    res.status(200).json(`Cart with id: ${cid} was emptied`);
  } catch (err) {
    next(err);
  }
};

export const physicalDeleteProductById = async (req, res, next) => {
  const { cid, pid } = req.params;

  try {
    const result = await cartService.physicalDeleteProductById(cid, pid);

    res.status(200).json(`Product with id: ${pid} has been removed`);
  } catch (err) {
    next(err);
  }
};
