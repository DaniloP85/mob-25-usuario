const express = require("express");
const Cliente = require("../model/cliente");
const verificar_token = require("../middleware/verificartoken");
const ProdutosFinanceiros = require("../produtosFinanceiros");
const route = express.Router();

route.get("/", verificar_token, (req, res) => {
  Cliente.find((erro, dados) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao processar dados -> ${erro}` });

        //TODO: arrumar um jeito de relacionar os clientes com as informacoes financeiras
    res.status(200).send({ output: "ok", payload: dados });
  });
});

route.post("/cadastro", verificar_token, (req, res) => {
  const dados = new Cliente(req.body);
  dados
    .save()
    .then((result) => {
      res.status(201).send({ output: "Cadastro realizado", payload: result });
    })
    .catch((erro) =>
      res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` })
    );
});

route.put("/atualizar/:id", verificar_token, (req, res) => {
  Cliente.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao processar a atualização-> ${erro}` });
      if (!dados)
        return res
          .status(400)
          .send({ output: `Não foi possível atualizar -> ${erro}` });
      return res.status(202).send({ output: "Atualizado", payload: dados });
    }
  );
});

route.delete("/apagar/:id", verificar_token, (req, res) => {
  Cliente.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao tentar apagar -> ${erro}` });

    res.status(204).send({});
  });
});


//TODO: criar um outro arquivo para as rotas financeiras
route.post("/financeiro/cadastro", verificar_token, (req, res) => {
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
