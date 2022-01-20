const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const despesaSchema = new Schema({
  descricao: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    min: [0, "Valor da despesa inválido"],
    required: [true, "Valor da despesa é obrigátorio"],
  },
  data: {
    type: String,
    required: [true, "A Data da receira é obrigatória"],
  },
});

const despesa = mongoose.model("despesaModel", despesaSchema);

module.exports = despesa;
