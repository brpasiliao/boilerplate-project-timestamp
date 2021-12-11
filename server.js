// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/:d?", (req, res) => {
  let date;

  if (req.params.d == undefined) date = new Date();
  else if (isNaN(req.params.d)) date = new Date(req.params.d);
  else if (!isNaN(req.params.d))
    date = new Date(parseInt(req.params.d));

  if (date == "Invalid Date") res.send({ error: "Invalid Date" });
  else {
    let unix = date.getTime();
    let words = date.toString().split(" ");
    let utc = words[0] + ", " + words[2] + " " + words[1] + date.toString().substr(10).split("+")[0];
    res.send({ unix, utc });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
