const express = require("express");
const route = express.Router();
const controller = require("../controllers/cliente");
const {
  verificar_token,
  verificar_token_apikey,
} = require("../middleware/verificartoken");

route.post("/cadastro", verificar_token, controller.insert);
route.get("/", verificar_token_apikey, controller.getAll);
route.put("/atualizar/:id", verificar_token_apikey, controller.update);
route.delete("/apagar/:id", verificar_token_apikey, controller.delete);

module.exports = route;