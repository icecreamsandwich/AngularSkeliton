module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      reset_password_token: {
        type: Sequelize.TEXT
      },
      reset_password_expires: {
        type: Sequelize.TEXT
      }
    });
  
    return User;
  };
  