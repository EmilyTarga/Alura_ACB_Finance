const { DateTime } = require("luxon");

module.exports = function Requisicao(descricao, valor, data, categoria) {
  const dados = {
    descricao: descricao,
    valor: valor,
    data: DateTime.fromFormat(data, "dd-MM-yyyy"),
    categoria: categoria,
  };
  return dados;
};
