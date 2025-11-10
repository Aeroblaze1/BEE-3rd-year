const OrderBook = require("../service/orderService");
let { publisher } = require("../../shared/index");

let ob = new OrderBook("BTCUSD"); //global object

module.exports.postPlaceOrder = async (req, res) => {
  //to create a new order for user who is placing an order

  let { side, type, price, quantity, user } = req.body;
  // if i create an object here
  let response = ob.placeOrder(side, type, price, quantity, user);
  publisher.publish("book_Update", JSON.stringify(response.book));

  res.json({
    event: "orderupdate",
    data: {
      orderReport: response.result,
      book: response.book,
    },
  });
};
