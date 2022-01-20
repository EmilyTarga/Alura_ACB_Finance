const express = require("express");
const router = express.Router();
const moment = require("moment");

const Receita = require("../models/receita.model");
const Mensal = require("../controlls/mensal");
31415;

router
  .get("/", async (req, res) => {
    try {
      const receitas = await Receita.find({}, "descricao valor data");
      res.json(receitas);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post("/", async (req, res) => {
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = moment(req.body.data, "DD/MM/YYYY").format("DD/MM/YYYY");

    Mensal(descricao, data, Receita)
      .then(function (value) {
        if (value) {
          const newReceita = new Receita({ descricao, valor, data });

          newReceita
            .save()
            .then(() => res.json("Receita Adicionada"))
            .catch((err) => res.status(400).json("Error: " + err));
        } else {
          throw "Você já teve essa Receita nesse mês... ";
        }
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

router
  .get("/:id", (req, res) => {
    Receita.findById(req.params.id, "valor descricao data")
      .then((receita) => res.json(receita))
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .delete("/:id", async (req, res) => {
    Receita.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json("Receita Deletada");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  })
  .put("/:id", async (req, res) => {
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = req.body.data;

    console.log(descricao, data);

    Mensal(descricao, data, Receita).then(function (value) {
      if (value) {
        Receita.findByIdAndUpdate(req.params.id, {
          descricao: descricao,
          valor: valor,
          data: data,
        })
          .then(() => res.json("Receita Atualizada"))
          .catch((err) => res.status(500).json("Error: " + err));
      } else {
        res.json(
          "Você já teve essa Receita nesse mês... Atualize para outro mês"
        );
      }
    });
  });

module.exports = router;
