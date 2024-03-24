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
  res.render("register");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, age, mobile, gender } = req.body;
    const existingUser = await Register.findOne({ email: email });
    if (!existingUser) {
      const newRegister = new Register({
        name,
        email,
        password,
        age,
        gender,
        mobile,
      });
      await newRegister.save();
      console.log("user Registered successfully");
      res.render("user", { name, email, mobile });
    } else {
      res.render("error", { email });
    }
  } catch (error) {
    console.log("Error" + error);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
