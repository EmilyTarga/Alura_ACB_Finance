const app = require("../server");
const request = require("supertest");
const expect = require("chai").expect;

const Despesa = require("../models/despesa.model");

before((done) => {
  Despesa.deleteMany({}, done);
});

describe("Testes das funcionalidades das Despesas", () => {
  describe("POST /despesas", () => {
    it("cadastra uma nova despesa", async () => {
      const res = await request(app).post("/despesas").send({
        descricao: "Aluguel",
        valor: 1000,
        data: "01-01-2020",
        categoria: "Moradia",
      });

      expect(res.status).to.eql(200);

      const campos = res.body;
      expect(campos).to.include.keys("descricao", "valor", "data", "categoria");
    });

    it("não cadastra a mesma despesa no mesmo mês", async () => {
      const res = await request(app).post("/despesas").send({
        descricao: "Aluguel",
        valor: 1000,
        data: "01-01-2020",
        categoria: "Moradia",
      });

      expect(res.status).to.eql(400);
    });

    it("cadastra a mesma despesa em um mês diferente", async () => {
      const res = await request(app).post("/despesas").send({
        descricao: "Aluguel",
        valor: 1000,
        data: "01-02-2020",
        categoria: "Moradia",
      });

      expect(res.status).to.eql(200);
    });

    it("cadastra uma nova despesa sem categoria e 'Outras' é atribuída ", async () => {
      const res = await request(app).post("/despesas").send({
        descricao: "Aluguel",
        valor: 1000,
        data: "01-05-2020",
      });

      expect(res.status).to.eql(200);

      const campos = res.body;
      expect(campos).to.include.keys("descricao", "valor", "data", "categoria");
      expect(campos.categoria).to.eql("Outras");
    });
  });

  describe("GET /despesas ", () => {
    it("retorna uma lista com todas as despesas", async () => {
      const res = await request(app).get("/despesas");

      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");

      res.body.map((despesa) => {
        expect(despesa).to.include.keys(
          "descricao",
          "valor",
          "data",
          "categoria"
        );
        expect(despesa.descricao).to.have.lengthOf(7);
        expect(despesa.valor).to.eql(1000);
      });
    });
  });

  describe("GET /despesas/:id", () => {
    it("retorna os detalhes da despesa que possui o id passado", async () => {
      const despesa = await new Despesa({
        descricao: "Jantar a luz de velas",
        valor: 100,
        data: "01-01-2020",
        categoria: "Alimentação",
      });
      despesa.save();

      const res = await request(app).get("/despesas/" + despesa._id);

      expect(res.status).to.eql(200);
      expect(res.body).to.include.keys(
        "descricao",
        "valor",
        "data",
        "categoria"
      );
      expect(res.body.descricao).to.have.lengthOf(21);
      expect(res.body.valor).to.eql(100);
    });
  });

  describe("PUT /despesas/:id", () => {
    it("atualiza a despesa com novas informações", async () => {
      const despesa = await new Despesa({
        descricao: "Ida ao Médico",
        valor: 100,
        data: "01-01-2020",
        categoria: "Saúde",
      });
      despesa.save();

      const res = await request(app).put(`/despesas/${despesa._id}`).send({
        descricao: "Ida ao Médico",
        valor: 100,
        data: "01-02-2020",
        categoria: "Saúde",
      });

      expect(res.status).to.eql(200);
      expect(res.body).to.include.keys(
        "descricao",
        "valor",
        "data",
        "categoria"
      );
    });

    it("não atualiza a despesa com informações já presentes na base de dados", async () => {
      const despesa = await new Despesa({
        descricao: "Ida ao Médico",
        valor: 100,
        data: "01-03-2020",
        categoria: "Saúde",
      });
      despesa.save();

      const res = await request(app).put(`/despesas/${despesa._id}`).send({
        descricao: "Aluguel",
        valor: 100,
        data: "01-01-2020",
        categoria: "Moradia",
      });

      expect(res.status).to.eql(400);
    });
  });

  describe("DELETE /despesas/:id", () => {
    it("deleta a despesa", async () => {
      const despesa = await new Despesa({
        descricao: "Despesa Incorreta",
        valor: 100,
        data: "01-01-2020",
      });
      despesa.save();

      const res = await request(app).delete(`/despesas/${despesa._id}`);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /despesas/:ano/:mes", () => {
    it("devolve todas as despesas do ano/mes requisitado", async () => {
      const res = await request(app).get("/despesas/2020/01");

      expect(res.status).to.eql(200);
    });
  });
});

after(async () => {
  const deleta = await Despesa.deleteMany({});
});
