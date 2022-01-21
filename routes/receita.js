const express = require("express");
const router = express.Router();

const Receita = require("../models/receita.model");
const ValidacaoDuplicado = require("../controlls/ValidacaoDuplicado");
const Requisicao = require("../controlls/Requisicao");

router.get("/", async (req, res) => {
  try {
    const receitas = await Receita.find({}, "descricao valor data");
    res.setHeader("Content-Type", "application/json");
    res.end("Listagem de receitas: " + JSON.stringify(receitas));
  } catch (err) {
    res.status(500).json("Erro: " + err);
  }
});

router.post("/", async (req, res) => {
  const dados = Requisicao(req.body.descricao, req.body.valor, req.body.data);

  try {
    const ehValido = await ValidacaoDuplicado(dados, Receita);

    if (ehValido) {
      const novaReceita = await new Receita(dados).save();

      try {
        res.setHeader("Content-Type", "application/json");
        res.end(
          `Receita ${novaReceita.descricao} adicionada: ` +
            JSON.stringify(novaReceita)
        );
      } catch (err) {
        res.status(500).json("Erro: " + err);
      }
    } else {
      throw `A receita ${dados.descricao} já foi adicionada neste mês `;
    }
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const detalhes = await Receita.findById(
      req.params.id,
      "descricao valor data"
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
  try {
    const deletar = await Receita.findByIdAndDelete(req.params.id);
    res.setHeader("Content-Type", "application/json");
    res.end(`A receita ${deletar.descricao} foi deletada`);
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

router.put("/:id", async (req, res) => {
  const dados = Requisicao(req.body.descricao, req.body.valor, req.body.data);

  try {
    const ehValido = await ValidacaoDuplicado(dados, Receita);

    if (ehValido) {
      try {
        const atualizar = await Receita.findOneAndUpdate(
          { _id: req.params.id },
          dados,
          { runValidators: true }
        );
        res.setHeader("Content-Type", "application/json");
        res.end(
          `A receita ${atualizar.descricao} foi atualizada: ` +
            JSON.stringify(atualizar)
        );
      } catch (err) {
        res.status(400).json("Erro: " + err);
      }
    } else {
      throw `A receita ${dados.descricao} já existe neste mês, tente outro.`;
    }
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
});

module.exports = router;
