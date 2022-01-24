const moment = require("moment");

module.exports = function Requisicao(descricao, valor, data, categoria) {
  const dados = {
    descricao: descricao,
    valor: valor,
    data: moment(data, "DD MM YYYY"),
    categoria: categoria,
  };
  return dados;
};
