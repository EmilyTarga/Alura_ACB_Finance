const request = require("supertest");
const app = require("../server");

const Receita = require("../models/receita.model");
const Despesa = require("../models/despesa.model");

const modelTest = {
  descricao: "compra",
  valor: 321.5,
  data: "05/05/2010",
};

const updatedTest = {
  descricao: "compra updated",
  valor: 321.5,
  data: "05/05/2010",
};

describe("PUT  /:id", () => {
  before((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {});
    done();
  });

  it("updates receita", (done) => {
    let receita = new Receita(modelTest);
    receita.save();

    request(app)
      .put("/receitas/" + receita._id)
      .expect("Content-Type", /json/)
      .send(updatedTest)
      .expect(200, done);
  });

  it("updates despesas", (done) => {
    let despesa = new Despesa(modelTest);
    despesa.save();

    request(app)
      .put("/despesas/" + despesa._id)
      .expect("Content-Type", /json/)
      .send(updatedTest)
      .expect(200, done);
  });

  after((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {});
    done();
  });
});
