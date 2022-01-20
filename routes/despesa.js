const express = require("express");
const router = express.Router();
const moment = require("moment");

const Despesa = require("../models/despesa.model");
const Mensal = require("../controlls/mensal");

router
  .get("/", async (req, res) => {
    try {
      const despesa = await Despesa.find({}, "descricao valor data");
      res.json(despesa);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post("/", async (req, res) => {
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = moment(req.body.data, "DD/MM/YYYY").format("DD/MM/YYYY");

    Mensal(descricao, data, Despesa)
      .then(function (value) {
        if (value) {
          const newDespesa = new Despesa({ descricao, valor, data });

          newDespesa
            .save()
            .then(() => res.json("Despesa Adicionada"))
            .catch((err) => res.status(400).json("Error: " + err));
        } else {
          throw "Você já teve essa Despesa nesse mês...";
        }
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

router
  .get("/:id", (req, res) => {
    Despesa.findById(req.params.id, "valor descricao data")
      .then((despesa) => res.json(despesa))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .delete("/:id", (req, res) => {
    Despesa.findByIdAndDelete(req.params.id)
      .then(() => res.json("Despesa Deletada"))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .put("/:id", async (req, res) => {
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = req.body.data;

    console.log(descricao, data);

    Mensal(descricao, data, Despesa).then(function (value) {
      if (value) {
        Despesa.findByIdAndUpdate(req.params.id, {
          descricao: descricao,
          valor: valor,
          data: data,
        })
          .then(() => res.json("Despesa Atualizada"))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.json(
          "Você já teve essa Despesa nesse mês... Atualize para outro mês"
        );
      }
    });
  });

module.exports = router;
