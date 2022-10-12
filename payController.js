const axios = require("axios");
const MARCENT_KEY = "sk_id";

const test = async (obj) => {
  try {
    let maakaPayUrl = "https://apisandbox.maakapay.com/v1/createOrder/";

    const response = await axios.post(maakaPayUrl, obj);
    console.log("result: ", response);
    return { status: response.status, message: response.statusText };
    // return {
    //   data: error.response.data,
    // };
  } catch (error) {
    console.log("test error 1");
    if (error.isAxiosError) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        data: error.response.data,
      };
    }
    return {
      status: 422,
      message: error.message,
    };
  }
};

const pay = async (req, res) => {
  try {
    let obj = {
      currency: req.body.currency,
      amount: req.body.amount,
      transaction_code: req.body.transaction_code,
      description: req.body.description,
      merchant_key: MARCENT_KEY,
      approved: "http://localhost:8080/api/success",
      canceled: "http://localhost:8080/api/cancel",
      declined: "http://localhost:8080/api/failed",
    };
    console.log("body:", obj);

    let result = await test(obj);
    res.json(result);
  } catch (error) {
    res.json({ msg: "error" });
  }
};

const success = async (req, res) => {
  try {
    res.json({ msg: "success" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred.",
    });
  }
};

const cancel = async (req, res) => {
  try {
    res.json({ msg: "cancel" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred.",
    });
  }
};

const failed = async (req, res) => {
  try {
    res.json({ msg: "failed" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred.",
    });
  }
};

const dummy = (req, res) => {
  let obj = {
    currency: req.body.currency,
    amount: req.body.amount,
    transaction_code: req.body.transaction_code,
    description: req.body.description,
    merchant_key: MARCENT_KEY,
    approved: "http://localhost:8080/api/success",
    canceled: "http://localhost:8080/api/cancel",
    declined: "http://localhost:8080/api/failed",
  };

  let maakaPayUrl = "https://apisandbox.maakapay.com/v1/createOrder";

  axios
    .post(maakaPayUrl, obj)
    .then((res) => {
      console.log("dummy success");
      res.status(302).json({ status: response.status, message: response.statusText });
    })
    .catch((error) => {
      console.log("dummy error 2");
      res.status(500).json({
        status: error.response.status,
        message: error.response.statusText,
        data: error.response.data,
      });
    });
};

module.exports = {
  dummy,
  pay,

  success,
  cancel,
  failed,
};
