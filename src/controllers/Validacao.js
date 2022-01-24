const moment = require("moment");

module.exports = async function ValidacaoDuplicado(dados, Modelo) {
  const modelo = await Modelo.find({}, "descricao data categoria");

  return modelo
    .map(
      (modelo) =>
        modelo.descricao == dados.descricao &&
        moment(modelo.data, "DD MM YYYY").format("MM YYYY") ==
          moment(dados.data, "DD MM YYYY").format("MM YYYY") &&
        modelo.categoria == dados.categoria
    )
    .every((entry) => entry == false);
};

// module.exports = function validacaoCategoria(dados, Categorias) {
//   return Categorias.map((categoria) => dados != categoria && dados != "").every(
//     (entry) => entry == false
//   );
// };
