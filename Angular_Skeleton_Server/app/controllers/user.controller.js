const db = require("../models");
const User = db.user;
const Roles = db.role;

const Op = db.Sequelize.Op;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.findUser = (req, res) => {
  Roles.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  User.belongsToMany(Roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });

  if (req.body.username) {
    User.findOne({
      where: {
        username: req.body.username
      },
      include: [
        {
          model: Roles, as: 'roles',
          required: false
        }
      ]
    }).then(user => {
      res.status(200).send({
        message: "User successfully retrieved",
        data: user
      })
    }).catch(error => {
      res.status(200).send({
        message: "User not retrieved",
        error: error
      })
    })
  } else {
    res.status(200).send({
      message: "User not found!",
    })
  }
}

/**
 * Get all user roles
 */
exports.getRoles = (req, res) => {
  Roles.findAll({
    attributes: ["id", "name"]
  }).then(roles => {
    res.status(200).send({
      message: "Roles retrieved successfully",
      data: roles
    })
  }).catch(error => {
    res.status(200).send({
      message: "Roles not retrieved",
      error: error
    })
  })
}

/**
 * Get ALL users to manage for super admin
 */
exports.getAllUsers = (req, res) => {
  User.findAll({}).then(users => {
    res.status(200).send({
      message: "Users retrieved successfully",
      data: users
    })
  }).catch(error => {
    res.status(200).send({
      message: "Users not retrieved",
      error: error
    })
  })
}