const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const despesaSchema = new Schema({
  descricao: {
    type: String,
    required: true,
    minLength: 3,
  },
  valor: {
    type: Number,
    min: [0, "Valor da despesa inválido"],
    required: [true, "Valor da despesa é obrigátorio"],
  },
  data: {
    type: Date,
    required: [true, "A Data da receira é obrigatória"],
  },
});

module.exports = mongoose.model("despesaModel", despesaSchema);
