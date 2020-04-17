const db = require("../models");
const config = require("../config/auth.config");
const Contact = db.contact;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.addContact = (req, res) => {
    // Save Contact to Database
    Contact.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
    })
        .then(user => {
            res.status(200).send({
                message: "User registered successfully!",
                "data": user
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllContacts = (req, res) => {
    Contact.findAll({}).then(contacts => {
        res.status(200).send({
            message: "Contacts retrieved successfully",
            "data": contacts
        })
    })
}


exports.findContact = (req, res) => {
    Contact.findOne({
        where: {
            [Op.or]: {
                firstname: {
                    [Op.like]: `%${req.body.username}%`,
                },
                lastname: {
                    [Op.like]: `%${req.body.username}%`,
                }
            }
        }
    }).then(contact => {
        res.status(200).send({
            message: "Contacts retrieved successfully",
            "data": contact
        })
    })
}