const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const receitaSchema = new Schema({
  descricao: {
    type: String,
    required: true,
    minLength: 3,
  },
  valor: {
    type: Number,
    min: [0, "Valor da receita inválido"],
    required: [true, "Valor da receita é obrigatório"],
  },
  data: {
    type: Date,
    required: [true, "A Data da receita é obrigatória"],
  },
  categoria: {
    type: String,
    enum: [
      "Alimentação",
      "Saúde",
      "Moradia",
      "Transporte",
      "Educação",
      "Lazer",
      "Imprevistos",
      "Outras",
    ],
    default: "Outras",
  },
});

module.exports = mongoose.model("receitaModel", receitaSchema);
