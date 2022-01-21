const express = require("express");
const router = express.Router();

const Despesa = require("../models/despesa.model");
const ValidacaoDuplicado = require("../controlls/ValidacaoDuplicado");
const Requisicao = require("../controlls/Requisicao");

router.get("/", async (req, res) => {
  try {
    const despesas = await Despesa.find({}, "descricao valor data");
    res.setHeader("Content-Type", "application/json");
    res.end("Listagem de despesas: " + JSON.stringify(despesas));
  } catch (err) {
    res.status(500).json("Erro: " + err);
  }
});

router.post("/", async (req, res) => {
  const dados = Requisicao(req.body.descricao, req.body.valor, req.body.data);

  try {
    const ehValido = await ValidacaoDuplicado(dados, Despesa);

    if (ehValido) {
      const novaDespesa = await new Despesa(dados).save();

      try {
        res.setHeader("Content-Type", "application/json");
        res.end(
          `Despesa ${novaDespesa.descricao} adicionada: ` +
            JSON.stringify(novaDespesa)
        );
      } catch (err) {
        res.status(500).json("Erro: " + err);
      }
    } else {
      throw `A despesa ${dados.descricao} já foi adicionada neste mês `;
    }
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const detalhes = await Despesa.findById(
      req.params.id,
      "valor descricao data"
    );
    res.setHeader("Content-Type", "application/json");
    res.end(
      `Detalhes sobre a receita ${detalhes.descricao}: ` +
        JSON.stringify(detalhes)
    );
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  const deletar = await Despesa.findByIdAndDelete(req.params.id);
  try {
    res.setHeader("Content-Type", "application/json");
    res.end(`A despesa ${deletar.descricao} foi deletada`);
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

router.put("/:id", async (req, res) => {
  const dados = Requisicao(req.body.descricao, req.body.valor, req.body.data);

  try {
    const ehValido = await ValidacaoDuplicado(dados, Despesa);

    if (ehValido) {
      try {
        const atualizar = await Despesa.findOneAndUpdate(
          { _id: req.params.id },
          dados,
          { runValidators: true }
        );
        res.setHeader("Content-Type", "application/json");
        res.end(
          `A despesa ${atualizar.descricao} foi atualizada: ` +
            JSON.stringify(atualizar)
        );
      } catch (err) {
        res.status(400).json("Erro: " + err);
      }
    } else {
      throw `A despesa ${dados.descricao} já existe neste mês, tente outro.`;
    }
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

module.exports = router;
