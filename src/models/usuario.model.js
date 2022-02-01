const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  usuario: {
    type: String,
    required: [true, "Usuário é obrigatória"],
    minLength: 5,
    maxLength: 15,
    unique: true,
  },

  senha: {
    type: String,
    required: [true, "Senha é obrigatória"],
  },
});

usuarioSchema.plugin(uniqueValidator);

usuarioSchema.pre("save", async function save(next) {
  if (!this.isModified("senha")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.senha = await bcrypt.hash(this.senha, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

usuarioSchema.methods.comparaSenha = async function (senhaCandidata) {
  return await bcrypt.compare(senhaCandidata, this.senha);
};

module.exports = mongoose.model("usuarioModel", usuarioSchema);
