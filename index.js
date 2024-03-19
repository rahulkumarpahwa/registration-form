const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Register = require("./models/register");
require("dotenv").config();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    // res.send("Got the post request");
    const { name, email, password } = req.body;
    let newRegister = new Register({
      name: name,
      email: email,
      password: password,
    });
    await newRegister.save();
    // res.render("/");
    res.send("user Registered successfully");
  } catch (error) {
    console.log("Error" + error);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
