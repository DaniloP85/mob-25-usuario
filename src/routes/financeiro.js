const express = require("express");
const route = express.Router();
const controller = require("../controllers/financeiro");
const {
  verificar_token,
  verificar_token_apikey,
} = require("../middleware/verificartoken");

route.post("/cadastro", verificar_token_apikey, controller.insert);
route.put("/atualizar/:id", verificar_token_apikey, controller.update);
route.delete("/deletar/:id", verificar_token_apikey, controller.delete);
route.get("/", verificar_token_apikey, controller.getAll);

module.exports = route;
