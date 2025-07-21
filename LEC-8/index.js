const express = require("express");

const app = express();

app.get("/", (req, res) => {
  //   res.send('Hello World')
  //   res.send("<h1>ok<h1>")
  //   res.sendFile(__dirname+"/index.html")
  //   res.json({name:"nitesh",
  //           age:24
  //   })
  res.end("hi");
});

/* path variable
1. Query parameter */
app.get("/watch", (req, res) => {
  let videoId = req.query.v;
  let nId = req.query.n;
  res.send("id got it " + videoId + " " + nId);
  console.log(videoId + " " + nId);
});
//http://localhost:3000/watch?v=3&n=dsuichs738
//you are using query parameters, which are sent in the URL after the ?, in the format of key-value pairs.
//Part	Meaning
//v=3	Key: v, Value: "3"
//n=dsuichs738	Key: n, Value: "dsuichs738"



//2.Path parameters or route parameters
app.get("/watch/:watchId/video/:videoId", (req, res) => {
  console.log(req.params.watchId);
  console.log(req.params.videoId);
  res.send(req.params.watchId+" still got it");
});
//http://localhost:3000/watch/4/video/87tgyuj


app.listen(3000, function () {
  console.log("server started");

});

// to hide your website logic we run program on system not directly on browser
// res.end header is not sended and rres.send header is send
