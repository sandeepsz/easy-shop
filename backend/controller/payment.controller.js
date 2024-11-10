import axios from "axios";
import Order from "../models/order.modal.js";

export const payment = async (req, res) => {
  const payload = req.body;

  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key d92804377ea4490eb99a09c785696bf4`,
        },
      }
    );
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

export const order = async (req, res) => {
  const { products, totalAmount } = req.body;
  console.log(products, totalAmount);
  const user = req.user;
  try {
    const newOrder = new Order({
      user: user,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: totalAmount,
    });

    await newOrder.save();
    res.json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
};
