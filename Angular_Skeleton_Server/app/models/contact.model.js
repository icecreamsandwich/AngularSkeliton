module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contacts", {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    phone: {
      type: Sequelize.STRING
    },
  });

  return Contact;
};
