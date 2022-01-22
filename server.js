require("dotenv").config();
const logger = require("morgan");
// server.js
// where your node app starts
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(logger("dev"));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  if (req.params.date === undefined) {
    res.json({
      unix: Date.now(),
      utc: new Date(Date.now()).toUTCString(),
    });
  }
  const regex = /\s+|\-+|\,+|\.+/g;
  let unixDate;
  if (regex.test(req.params.date)) {
    unixDate = new Date(req.params.date).getTime(); //:v evaluate to my local time
  } else {
    unixDate = +req.params.date;
  }
  const UTCDate = new Date(unixDate).toUTCString();
  if (UTCDate === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: unixDate, utc: UTCDate });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
