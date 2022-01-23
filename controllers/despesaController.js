const Despesa = require("../models/despesa.model");
const ValidacaoDuplicado = require("../controllers/ValidacaoDuplicado");
const Requisicao = require("./Requisicao");

exports.despesa_lista = async function (req, res) {
  try {
    const despesas = await Despesa.find({}, "descricao valor data");
    res.json(despesas);
  } catch (err) {
    res.status(500).json("Erro: " + err);
  }
};

exports.despesa_nova = async function (req, res) {
  const dados = Requisicao(req.body.descricao, req.body.valor, req.body.data);

  try {
    const ehValido = await ValidacaoDuplicado(dados, Despesa);

    if (ehValido) {
      const novaDespesa = await new Despesa(dados).save();

      try {
        res.json(novaDespesa);
      } catch (err) {
        res.status(500).json("Erro: " + err);
      }
    } else {
      throw `A despesa ${dados.descricao} já foi adicionada neste mês `;
    }
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
};

exports.despesa_detalhes = async function (req, res) {
  try {
    const detalhes = await Despesa.findById(
      req.params.id,
      "valor descricao data"
    );
    res.json(detalhes);
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
};

exports.despesa_deletada = async function (req, res) {
  const deletar = await Despesa.findByIdAndDelete(req.params.id);
  try {
    res.json(deletar);
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
};

exports.despesa_atualizada = async function (req, res) {
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
        res.json(atualizar);
      } catch (err) {
        res.status(400).json("Erro: " + err);
      }
    } else {
      throw `A despesa ${dados.descricao} já existe neste mês, tente outro.`;
    }
  } catch (err) {
    res.status(400).json("Erro: " + err);
  }
};
