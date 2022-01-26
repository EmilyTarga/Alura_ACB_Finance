const app = require("../server");
const request = require("supertest");
const expect = require("chai").expect;

const Receita = require("../models/receita.model");
const Despesa = require("../models/despesa.model");

describe("Testes das funcionalidades do Resumo", () => {
  describe("GET /resumo/:ano/:mes", () => {
    it("retorna o resumo do mês", async () => {
      const res = await request(app).get("/resumo/2020/01");

      expect(res.body.mensagem).to.be.a("string").to.eql("Resumo Mensal");

      let resumo = res.body.resumo;
      expect(resumo.total_despesas).to.be.a("number").to.eql(1200);
      expect(resumo.total_receitas).to.be.a("number").to.eql(1200);
      expect(resumo.saldo_final).to.be.a("number").to.eql(0);
      expect(resumo.gastos_por_categoria).to.include.keys(
        "Moradia",
        "Alimentação",
        "Saúde"
      );
    });
  });
});

after((done) => {
  Receita.deleteMany({});
  Despesa.deleteMany({}, done);
});
