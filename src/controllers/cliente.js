const ProdutosFinanceiros = require("../produtosFinanceiros");
const Cliente = require("../model/cliente");

const controller = {
  getAll: (req, res) => {
    Cliente.find((erro, usuarios) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao processar dados -> ${erro}` });

      ProdutosFinanceiros.get({}, (err, data) => {
        if (!err) {
          let consolidado = usuarios.map((usuario) => {
            const { _id, nomecompleto, apikey, email, telefone, endereco } =
              usuario;

            const produtosFinanceiros = data.InfoFinanceiras.filter(
              (produto) => {
                return produto.id_cliente === _id.toString();
              }
            );

            return {
              _id,
              nomecompleto,
              apikey,
              email,
              telefone,
              endereco,
              produtosFinanceiros,
            };
          });

          res.status(200).send({ output: "ok", payload: consolidado });
        }
      });
    });
  },
  insert: (req, res) => {
    Cliente.find({ apikey: req.body.apikey }, (erro, cliente) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao tentar localizar -> ${erro}` });

      if (cliente.length != 0) {
        return res
          .status(409)
          .send({ output: "ok", payload: "cliente ja cadastrado" });
      }

      const dados = new Cliente(req.body);

      dados
        .save()
        .then((result) => {
          res
            .status(201)
            .send({ output: "Cadastro realizado", payload: result });
        })
        .catch((erro) =>
          res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` })
        );
    });
  },
  update: (req, res) => {
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
  },
  delete :(req, res) => {
    Cliente.findByIdAndDelete(req.params.id, (erro, dados) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao tentar apagar -> ${erro}` });
  
      res.status(200).send({});
    });
  }
};

module.exports = controller;
