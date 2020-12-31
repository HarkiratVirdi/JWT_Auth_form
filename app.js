const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const { requireAuth } = require("./middleware/authMiddleware");

// middleware

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://harkirat:Jetairways1@cluster0.0mb3p.mongodb.net/nodeAuth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.send("You got the cookies!");
});

app.get("/read-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
