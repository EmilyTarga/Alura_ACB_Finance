const request = require("supertest");
const app = require("../server");

const Receita = require("../models/receita.model");
const Despesa = require("../models/despesa.model");

const modelTest = {
  descricao: "compra",
  valor: 321.5,
  data: "05/05/2010",
};

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("GET /receitas /despesas", () => {
  beforeEach((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {
      done();
    });
  });

  it("responds with receitas in JSON", (done) => {
    request(app)
      .get("/receitas")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("responds with despesas in JSON", (done) => {
    request(app)
      .get("/despesas")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("/GET/:id", () => {
  it("responds with receita details in JSON", (done) => {
    let receita = new Receita(modelTest);
    receita.save();

    request(app)
      .get("/receitas/" + receita._id)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("responds with desepesa details in JSON", (done) => {
    let despesa = new Despesa(modelTest);
    despesa.save();

    request(app)
      .get("/despesas/" + despesa._id)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  afterEach((done) => {
    Receita.deleteMany({}, (err) => {});
    Despesa.deleteMany({}, (err) => {
      done();
    });
  });
});
