const moment = require("moment");

module.exports = async function mensal(descricao, data, Model) {
  const model = await Model.find({}, "descricao data");

  return model
    .map(
      (model) =>
        model.descricao == descricao &&
        moment(model.data, "DD MM YYYY").format("MM YYYY") ==
          moment(data, "DD MM YYYY").format("MM YYYY")
    )
    .every((entry) => entry == false);
};
