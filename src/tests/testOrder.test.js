const Receita = require("../models/receita.model");
const Despesa = require("../models/despesa.model");

describe("Primeiro Teste", () => {
  before(async () => {
    try {
      const deleta = await Receita.deleteMany({});
    } catch (err) {
      console.log(err);
    }
  });

  require("./receitas.test");
});
describe("Segundo Teste", () => {
  before(async () => {
    try {
      const deleta = await Despesa.deleteMany({});
    } catch (err) {
      console.log(err);
    }
  });

  require("./despesas.test");
});
describe("Último Teste", () => {
  after(async () => {
    try {
      const deletaReceita = await Receita.deleteMany({});
      const deletaDespesa = await Despesa.deleteMany({});
    } catch (err) {
      console.log(err);
    }
  });

  require("./resumo.test");
});
