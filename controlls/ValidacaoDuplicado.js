const moment = require("moment");

module.exports = async function ValidacaoDuplicado(dados, Modelo) {
  const modelo = await Modelo.find({}, "descricao data");

  return modelo
    .map(
      (modelo) =>
        modelo.descricao == dados.descricao &&
        moment(modelo.data, "DD MM YYYY").format("MM YYYY") ==
          moment(dados.data, "DD MM YYYY").format("MM YYYY")
    )
    .every((entry) => entry == false);
};
