const express = require("express");
const {verificar_token, verificar_token_apikey} = require("../middleware/verificartoken");
const route = express.Router();
const controller = require("../controllers/usuario");

route.get("/", verificar_token_apikey, controller.getAll);
route.post("/cadastro", controller.insert);
route.post("/login", controller.login);
route.put("/atualizar/:id", verificar_token_apikey, controller.update);
route.delete("/apagar/:id", verificar_token_apikey, controller.delete);

module.exports = route;