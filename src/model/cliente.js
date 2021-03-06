const mongoose = require("mongoose");

const schema_cliente = new mongoose.Schema({
  nomecompleto: { type: String },
  apikey: { type: String },
  email: { type: String, unique: true },
  telefone: { type: String },
  endereco: { type: String },
},{ strict: true, versionKey: false });
module.exports = mongoose.model("Cliente", schema_cliente);
