const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri);

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const receitaRouter = require("./routes/receita");
const despesaRouter = require("./routes/despesa");

app.use("/receitas", receitaRouter);
app.use("/despesas", despesaRouter);

app.listen(port, () => {
  console.log(`Example App is listening at http://localhost:${port}`);
});

module.exports = app;
