const moment = require("moment");

module.exports = function Requisicao(descricao, valor, data) {
  const dados = {
    descricao: descricao,
    valor: valor,
    data: moment(data, "DD MM YYYY"),
  };
  return dados;
};
