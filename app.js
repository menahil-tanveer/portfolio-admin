const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");


const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.get("/", (req, res) => {
  res.status(200).json("Home route *_* ");
});


app.listen(port, () => {
  console.log("Server is running on::::", port);
});
