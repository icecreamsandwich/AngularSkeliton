const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/resetPassword", [authJwt.verifyToken], controller.resetPassword);
  app.post("/api/auth/forgotPassword", controller.forgotPassword);
  app.post("/api/auth/checkUserToken", controller.checkUserToken);
  app.post("/api/auth/resetPasswordRequest", controller.resetPasswordRequest);
  app.post("/api/auth/changeUserStatus", [authJwt.verifyToken], controller.changeUserStaus);

};
