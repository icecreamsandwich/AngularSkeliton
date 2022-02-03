module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "P@55w0rd",
  DB: "angular_skeleton",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
