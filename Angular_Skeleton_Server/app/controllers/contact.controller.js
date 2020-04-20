const db = require("../models");
const config = require("../config/auth.config");
const Contact = db.contact;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Adds a contact
 * @param req contains firstname, lastname, email, address and phone
 */

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

/**
 * Gets all contacts from table
 * 
 */

exports.getAllContacts = (req, res) => {
    Contact.findAll({}).then(contacts => {
        res.status(200).send({
            message: "Contacts retrieved successfully",
            "data": contacts
        })
    })
}

/**
 * Find a contact
 * @param req contains username
 */
exports.findContact = (req, res) => {
    Contact.findAll({
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

/**
 * Deletes a contact
 * @param req contains userID
 */
exports.deleteContact = (req, res) => {
    Contact.destroy({
        where : {
            id : req.body.userId
        }
    }).then( contact => {
        console.log(contact)
        console.log("contact deleted successfully")
        res.status(200).send({
            status : 200,
            message: "Contact deleted successfully",
        })
    })
}