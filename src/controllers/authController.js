require("dotenv").config();

const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuario.model");

exports.usuario_lista = async function (req, res) {
  try {
    const listaUsuarios = await usuarioModel.find({});
    res.json(listaUsuarios);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
};

exports.usuario_signup = async function (req, res) {
  const dados = {
    usuario: req.body.usuario,
    senha: req.body.senha,
  };

  try {
    const novoUsuario = await new usuarioModel(dados).save();
    res.json(novoUsuario);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.usuario_login = async function (req, res) {
  const dados = {
    usuario: req.body.usuario,
    senha: req.body.senha,
  };

  try {
    const db = await usuarioModel.findOne({ usuario: dados.usuario });

    if (await db.comparaSenha(dados.senha)) {
      const id = db._id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300,
      });
      return res.json({ auth: true, token: token });
    }
    throw "Usuário e senha inválido";
  } catch (err) {
    res.status(400).json("Usuário e senha inválido");
  }
};

exports.usuario_logout = async function (req, res) {
  res.json({ auth: false, token: null });
};

exports.usuario_autenticado = async function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({
      auth: false,
      message: "Credenciais inválidas",
    });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res.status(500).json({ auth: false, message: "Não autorizado" });

    req.userId = decoded.id;
    next();
  });
};
