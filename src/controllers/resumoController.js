const Despesa = require("../models/despesa.model");
const Receita = require("../models/receita.model");

exports.resumo_geral = async function (req, res) {
  const ano = req.params.ano;
  const mes = req.params.mes;

  try {
    const receitas = await Receita.find(
      { data: { $gte: `${ano}-${mes}-01`, $lte: `${ano}-${mes}-31` } },
      "descricao valor data categoria"
    );
    const despesas = await Despesa.find(
      { data: { $gte: `${ano}-${mes}-01`, $lte: `${ano}-${mes}-31` } },
      "descricao valor data categoria"
    );

    let resumo = {
      total_receitas: 0,
      total_despesas: 0,
      saldo_final: 0,
      gastos_por_categoria: {},
    };

    receitas.map((receita) => (resumo.total_receitas += receita.valor));
    despesas.map((despesa) => (resumo.total_despesas += despesa.valor));

    resumo.saldo_final = resumo.total_receitas - resumo.total_despesas;

    despesas.map(
      (despesa) => (resumo.gastos_por_categoria[despesa.categoria] = 0)
    );

    despesas.map(
      (despesa) =>
        (resumo.gastos_por_categoria[despesa.categoria] += despesa.valor)
    );

    res.json({ mensagem: "Resumo Mensal", resumo });
  } catch (err) {
    res.status(500).json("Erro: " + err);
  }
};
