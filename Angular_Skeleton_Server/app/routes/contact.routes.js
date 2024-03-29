const { authJwt } = require("../middleware");
const controller = require("../controllers/contact.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/addContact",controller.addContact);
  app.post("/api/getAllContacts",[authJwt.verifyToken], controller.getAllContacts);
  app.post("/api/findContact",[authJwt.verifyToken], controller.findContact);
  app.post("/api/deleteContact",[authJwt.verifyToken], controller.deleteContact);
};
