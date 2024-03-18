const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/form", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  // res.send("Got the post request");
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
