const request = require("supertest");
const app = require("../server");

const Receita = require("../models/receita.model");
const Despesa = require("../models/despesa.model");

const modelTest = {
  descricao: "compra",
  valor: 321.5,
  data: "05/05/2010",
};

describe("DELETE  /:id", () => {
  before((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {});
    done();
  });

  it("deletes receita", (done) => {
    let receita = new Receita(modelTest);
    receita.save();

    request(app)
      .delete("/receitas/" + receita._id)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("deletes despesas", (done) => {
    let despesa = new Despesa(modelTest);
    despesa.save();

    request(app)
      .delete("/despesas/" + despesa._id)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  after((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {});
    done();
  });
});
