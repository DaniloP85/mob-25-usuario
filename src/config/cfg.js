const cfg = () => {
  return {
    jwt_secret: "#V$Code%",
    jwt_expires: "2d",
    salt: 10,
    db_path: "mongodb://localhost:27017/local",
  };
};
module.exports = cfg();
