const ProdutosFinanceiros = require("../produtosFinanceiros");
const Cliente = require("../model/cliente");

const controller = {
  insert: (req, res) => {
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
  },
  update: (req, res) => {
    Cliente.findOne({ _id: req.body.id_cliente }, (erro, dados) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar cadastrar -> ${erro}` });
      }

      if (dados === null) {
        return res.status(204).send({ output: `Cliente nao localizado` });
      }

      const InfoFinanceiras = {
        _id: req.params.id,
        nome_banco: req.body.nome_banco,
        tipo_conta: req.body.tipo_conta,
        nome_titular: req.body.nome_titular,
        limite_cartao: req.body.limite_cartao,
        id_cliente: req.body.id_cliente,
      };

      ProdutosFinanceiros.update(InfoFinanceiras, (err, data) => {
        if (!err) {
          return res.status(202).send({ output: "ok", payload: data });
        }
      });
    });
  },
  delete: (req, res) => {
    Cliente.findOne({ _id: req.body.id_cliente }, (erro, dados) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar cadastrar -> ${erro}` });
      }

      const InfoFinanceiras = {
        _id: req.params.id,
      };

      ProdutosFinanceiros.delete(InfoFinanceiras, (err, data) => {
        if (!err) {
          return res.status(200).send({ output: "ok", payload: {} });
        }
      });
    });
  },
  getAll: (req, res) => {
    ProdutosFinanceiros.get({}, (err, data) => {
      if (!err) {
        return res.status(200).send({ output: "ok", payload: data });
      }
    });
  },
};
module.exports = controller;
