const app = require("../server");
const request = require("supertest");
const expect = require("chai").expect;

const Receita = require("../models/receita.model");

before((done) => {
  Receita.deleteMany({}, done);
});

describe("Testes das funcionalidades das Receitas", () => {
  describe("POST /receitas", () => {
    it("cadastra uma nova receita", async () => {
      const res = await request(app).post("/receitas").send({
        descricao: "Salário",
        valor: 1000,
        data: "01-01-2020",
      });

      expect(res.status).to.eql(200);

      const campos = res.body;
      expect(campos).to.include.keys("descricao", "valor", "data");
    });

    it("não cadastra a mesma receita no mesmo mês", async () => {
      const res = await request(app).post("/receitas").send({
        descricao: "Salário",
        valor: 1000,
        data: "01-01-2020",
      });

      expect(res.status).to.eql(400);
    });

    it("cadastra a mesma receita em um mês diferente", async () => {
      const res = await request(app).post("/receitas").send({
        descricao: "Salário",
        valor: 1000,
        data: "01-02-2020",
      });

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /receitas ", () => {
    it("retorna uma lista com todas as receitas", async () => {
      const res = await request(app).get("/receitas");

      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");

      res.body.map((receita) => {
        expect(receita).to.include.keys("descricao", "valor", "data");
        expect(receita.descricao).to.have.lengthOf(7);
        expect(receita.valor).to.eql(1000);
      });
    });
  });

  describe("GET /receitas/:id", () => {
    it("retorna os detalhes da receita que possui o id passado", async () => {
      const receita = await new Receita({
        descricao: "Venda",
        valor: 100,
        data: "01-01-2020",
      });
      receita.save();

      const res = await request(app).get("/receitas/" + receita._id);

      expect(res.status).to.eql(200);
      expect(res.body).to.include.keys("descricao", "valor", "data");
      expect(res.body.descricao).to.have.lengthOf(5);
      expect(res.body.valor).to.eql(100);
    });
  });

  describe("PUT /receitas/:id", () => {
    it("atualiza a receita com novas informações", async () => {
      const receita = await new Receita({
        descricao: "Freelancing",
        valor: 100,
        data: "01-01-2020",
      });
      receita.save();

      const res = await request(app).put(`/receitas/${receita._id}`).send({
        descricao: "Freelancing",
        valor: 100,
        data: "01-02-2020",
      });

      expect(res.status).to.eql(200);
      expect(res.body).to.include.keys("descricao", "valor", "data");
    });

    it("não atualiza a receita com informações já presentes na base de dados", async () => {
      const receita = await new Receita({
        descricao: "Venda",
        valor: 100,
        data: "01-03-2020",
      });
      receita.save();

      const res = await request(app).put(`/receitas/${receita._id}`).send({
        descricao: "Venda",
        valor: 100,
        data: "01-01-2020",
      });

      expect(res.status).to.eql(400);
    });
  });

  describe("DELETE /receitas/:id", () => {
    it("deleta a receita", async () => {
      const receita = await new Receita({
        descricao: "Receita Incorreta",
        valor: 100,
        data: "01-01-2020",
      });
      receita.save();

      const res = await request(app).delete(`/receitas/${receita._id}`);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /receitas/:ano/:mes", () => {
    it("devolve todas as receitas do ano/mes requisitado", async () => {
      const res = await request(app).get("/receitas/2020/01");

      expect(res.status).to.eql(200);
    });
  });
});
