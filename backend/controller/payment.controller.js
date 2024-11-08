import axios from "axios";

export const paymentController = async (req, res) => {
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
