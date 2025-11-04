class OrderBook{
    constructor(symbol="BTCUSD"){          // let orderBook=new OrderBook("BTCUSD"); this will call this constructor       
        this.symbol=symbol,
        this.bids=[],
        this.ask=[],
        this._nextId=1,                    // If a variable or function starts with  '_' then it is private (developer will assume that it is to be kept private)
        this.lastTradedPrice=null
    }
    _genOrderId(){
        return this._nextId++;
    }

    // sort works lexographically(alphabetically) but there is no alphabets so we have to pass a comparator
    _sort(side) {
        if (side === "buy") {
            // Sort bids: highest price first; if equal, earliest timestamp first
            this.bids.sort((a, b) => {
                if (a.price !== b.price) {
                    return b.price - a.price;
                }
                return a.timestamp - b.timestamp;
            });
        } else if (side === "sell") {
            // Sort asks: lowest price first; if equal, earliest timestamp first
            this.ask.sort((a, b) => {
                if (a.price !== b.price) {
                    return a.price - b.price;
                }
                return a.timestamp - b.timestamp;
            });
        }
    } 
    
  placeOrder(side, type, price = null, quantity, user) {
        /*Basic Validation*/
        let order = {
            orderId: this._genOrderId(),
            symbol: this.symbol,
            side,
            type,
            price,
            originalQty: quantity,
            remainingQty: quantity,
            exectQty: 0,
            timestamp: Date.now(),
            user: user
        }

        if (type === "MARKET") {
            let result = this._marketMatch(order);
            if (result.remainingQty > 0) {
                console.log("Order completed: " + result.exectQty + " " + "cancel order: " + result.remainingQty);
            }
        } else {
            let result = this._limitMatch(order);
        }
    }
    //execute order if it is a market order
    /*
        bids:[] sorted descending
        ask:[] sorted ascending
        1. type: buy || sell
        2. if buy start buying from asks array starting from index 0,
           Loop while order.remainingQty> && ask.length>0.
           Buy min(order.remainingQty,asks[0].remainingQty),
           Update remainingQty and executedQty from both sides
    */
    _marketMatch(order) {
        if (order.side === "BUY") {
            let askArr = this.ask;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                let orderFill = Math.min(order.remainingQty, top.remainingQty);

                order.exectQty = order.exectQty + orderFill;
                order.remainingQty = order.remainingQty - orderFill;

                top.exectQty = top.exectQty + orderFill;
                top.remainingQty = top.remainingQty - orderFill;

                this.lastTradedPrice = top.price;

                if (top.remainingQty <= 0) {
                    askArr.shift();
                }
            }
            return order;
        } else if (order.side === "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                let orderFill = Math.min(order.remainingQty, top.remainingQty);

                order.exectQty = order.exectQty + orderFill;
                order.remainingQty = order.remainingQty - orderFill;

                top.exectQty = top.exectQty + orderFill;
                top.remainingQty = top.remainingQty - orderFill;

                this.lastTradedPrice = top.price;

                if (top.remainingQty <= 0) {
                    bidArr.shift();
                }
            }
            return order;
        }
    }

    _limitMatch(order) {
        if (order.side === "BUY") {
            let opposite = this.ask;
            while (order.remainingQty > 0 && opposite.length > 0) {
                let top = opposite[0];
                if (order.price >= top.price) {
                    let filledOrder = Math.min(order.remainingQty, top.remainingQty);

                    order.remainingQty -= filledOrder;
                    order.exectQty += filledOrder;

                    top.remainingQty -= filledOrder;
                    top.exectQty += filledOrder;

                    this.lastTradedPrice = top.price;

                    if (top.remainingQty <= 0) {
                        opposite.shift();
                    }
                } else {
                    break;
                }
            }
            if (order.remainingQty > 0) {
                this.bids.push(order);
                this._sort("BUY");
            }
        }
        else if (order.side === "SELL") {
            let opposite = this.bids;
            while (order.remainingQty > 0 && opposite.length > 0) {
                let top = opposite[0];
                if (order.price <= top.price) {
                    let filledOrder = Math.min(order.remainingQty, top.remainingQty);

                    order.remainingQty -= filledOrder;
                    order.exectQty += filledOrder;

                    top.remainingQty -= filledOrder;
                    top.exectQty += filledOrder;

                    this.lastTradedPrice = top.price;

                    if (top.remainingQty <= 0) {
                        opposite.shift();
                    }
                } else {
                    break;
                }
            }
            if (order.remainingQty > 0) {
                this.ask.push(order);
                this._sort("SELL");
            }
        }
    }

    getBookSnapshot() {
        return {
            lastUpdated: Date.now(),
            bids: this.bids.map((o) => [o.price, o.remainingQty]),
            asks: this.ask.map((o) => [o.price, o.remainingQty])
        }
    }
}


let BTCUSDOrderBook=new OrderBook();

// BTCUSDOrderBook.bids.push({
//     orderId:2,
//     side:"buy",
//     type:"MARKET",
//     price:100,
//     quantity:10,
//     timestamp:Date.now(),
//     user:"Sanam"
// })

// BTCUSDOrderBook.bids.push({
//     orderId:2,
//     side:"buy",
//     type:"MARKET",
//     price:94,
//     quantity:10,
//     timestamp:Date.now(),
//     user:"ZZZZ"
// })

// BTCUSDOrderBook.bids.push({
//     orderId:2,
//     side:"buy",
//     type:"MARKET",
//     price:98,
//     quantity:10,
//     timestamp:Date.now(),
//     user:"VVVV"
// })

// BTCUSDOrderBook.bids.push({
//     orderId:2,
//     side:"buy",
//     type:"MARKET",
//     price:99,
//     quantity:10,
//     timestamp:Date.now(),
//     user:"UUUU"
// })

// BTCUSDOrderBook.bids.push({
//     orderId:2,
//     side:"buy",
//     type:"MARKET",
//     price:99,
//     quantity:10,
//     timestamp:Date.now(),
//     user:"Vivek"
// })
// BTCUSDOrderBook._sort("buy");
// console.log(BTCUSDOrderBook.bids);

// BTCUSDOrderBook.ask.push({orderId:2,side:"sell",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"siddhant"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"sell",type:"MARKET",price:95,quantity:10,timestamp:Date.now(),user:"karan"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"sell",type:"MARKET",price:101,quantity:10,timestamp:Date.now(),user:"aryan"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"sell",type:"MARKET",price:90,quantity:10,timestamp:Date.now(),user:"hvjfy"});

// BTCUSDOrderBook._sort("sell");
// console.log(BTCUSDOrderBook.ask);

console.log(BTCUSDOrderBook.getBookSnapshot());
//fill bids as market maker
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1506.00",10,"siddhant");
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1505.00",20,"aryan");
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1500",10,"karan");

console.log(BTCUSDOrderBook.getBookSnapshot());

//fill ask as market maker
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1507.00",10,"karan");
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1508.00",10,"karan");
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1509.00",10,"karan");

console.log(BTCUSDOrderBook.getBookSnapshot());



