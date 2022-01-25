const { DateTime } = require("luxon");

module.exports = async function ValidacaoDuplicado(dados, Modelo) {
  const modelo = await Modelo.find({}, "descricao data categoria");

  return modelo
    .map(
      (modelo) =>
        modelo.descricao == dados.descricao &&
        DateTime.fromJSDate(modelo.data).toFormat("yyyy MM") ==
          DateTime.fromISO(dados.data).toFormat("yyyy MM")
    )
    .every((entry) => entry == false);
};
