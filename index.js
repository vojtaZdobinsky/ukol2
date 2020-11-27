const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const { request } = require("http");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  var Mnozstvi = Number(req.body.Mnozstvi);
  var kryptomena = req.body.kryptomena;
  var mena = req.body.mena;

  console.log("Množství kryptomeny " + Mnozstvi);
  console.log("sourceCurrency " + kryptomena);
  console.log("targetCurrency " + mena);

  var request = require("request");

  url =
    "https://api.coingecko.com/api/v3/simple/price?ids=" +
    kryptomena +
    "&vs_currencies=" +
    mena;
  console.log(url);
  console.log("");

  request(
    {
      url: url,
      json: false
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var multiplier = Number(
          body.substring(body.lastIndexOf('"') - 2, body.length - 2)
        );
        var result = noc * multiplier;
        res.send(
          Mnozstvi +
            " jednotky ve měně: " +
            kryptomena +
            ", mají hodnotu " +
            result +
            " " +
            mena
        );
      }
    }
  );
});
app.listen(8080, function () {
  console.log("port 8080");
});
