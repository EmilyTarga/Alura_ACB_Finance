const request = require("supertest");
const app = require("../server");

const Receita = require("../models/receita.model");
const Despesa = require("../models/despesa.model");

const modelTest = {
  descricao: "compra",
  valor: 321.5,
  data: "05/05/2010",
};

describe("POST  /receitas /despesas", () => {
  before((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {});
    done();
  });

  it("posts receita", (done) => {
    request(app)
      .post("/receitas")
      .set("Content-type", "application/json")
      .send(modelTest)
      .expect(200, done);
  });

  it("doesn't posts receita", (done) => {
    request(app)
      .post("/receitas")
      .set("Content-type", "application/json")
      .send(modelTest)
      .expect(400, done);
  });

  it("posts despesas", (done) => {
    request(app)
      .post("/despesas")
      .set("Content-type", "application/json")
      .send(modelTest)
      .expect(200, done);
  });

  it("doesn't posts despesas", (done) => {
    request(app)
      .post("/despesas")
      .set("Content-type", "application/json")
      .send(modelTest)
      .expect(400, done);
  });

  after((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {});
    done();
  });
});
