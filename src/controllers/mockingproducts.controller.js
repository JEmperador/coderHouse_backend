import { productGenerator } from "../helpers/utils.js";

export const readProducts = async (req, res) => {
  const { max } = req.query;

  try {
    const products = [];

    for (let i = 0; i < Number(max); i++) {
      products.push(productGenerator());
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
