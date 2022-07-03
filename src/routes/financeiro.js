const express = require("express");
const Cliente = require("../model/cliente");
const verificar_token = require("../middleware/verificartoken");
const ProdutosFinanceiros = require("../produtosFinanceiros");
const route = express.Router();

route.post("/cadastro", verificar_token, (req, res) => {
  Cliente.findOne({ _id: req.body.id_cliente }, (erro, dados) => {
    if (erro) {
      return res
        .status(500)
        .send({ output: `Erro ao tentar cadastrar -> ${erro}` });
    }

    if (dados === null) {
      return res.status(204).send({ output: `Cliente nao localizado` });
    }

    const InfoFinanceiras = req.body;

    ProdutosFinanceiros.insert(InfoFinanceiras, (err, data) => {
      if (!err) {
        return res.status(201).send({ output: "ok", payload: data });
      }
    });
  });
});

module.exports = route;
