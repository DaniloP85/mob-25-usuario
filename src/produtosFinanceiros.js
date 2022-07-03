const PROTO_PATH = "./src/instituicoes.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const Gerenciar = grpc.loadPackageDefinition(packageDefinition).Gerenciar;
const ProdutosFinanceiros = new Gerenciar(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = ProdutosFinanceiros;