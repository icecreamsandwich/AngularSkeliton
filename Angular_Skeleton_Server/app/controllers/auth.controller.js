const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require('crypto');

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!", data: user });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!", data: user });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        //expiresIn: 86400 // 24 hours
        expiresIn: 3600 // 1 hour
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.resetPassword = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(200).send({
        status: "failure",
        message: "User not found!"
      })
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(200).send({
        status: "failure",
        message: "Password is not matching with your original password"
      })
    } else {
      //update the user
      user.update({
        password: bcrypt.hashSync(req.body.newpassword, 8)
      }).then(user => {
        return res.status(200).send({
          status: "success",
          message: "Password Updated successfully",
          data: user
        })
      })
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  })
};


/**
   * Forgot password functionality
   * Send user the reset password link
*/

exports.forgotPassword = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(200).send({
        status: "failure",
        message: "User not found!"
      })
    } else {
      //update the database with reset password token and expiry
      var getTokenPromise = new Promise(function (resolve, reject) {
        crypto.randomBytes(20, function (err, buffer) {
          token = buffer.toString('hex');
          resolve(token)
        })
      })
      getTokenPromise.then(token => {
        const expiresIn = Date.now() + 86400000;
        user.update({
          reset_password_token: token,
          reset_password_expires: expiresIn
        }).then(user => {
          console.log("Reset password token set")
          this.sendSESMail(req.body.email, token).then(function (data) {
            if (data) {
              return res.status(200).send({
                status: "success",
                message: "Forgot Password Mail Sent. Please check\
                your mail for further intstructions",
              })
            } else {
              return res.status(200).send({
                status: "failure",
                message: "Mail Not Sent!"
              })
            }
          })
        })
      })

    }
  })
}


exports.sendSESMail = (email, token) => {
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  //AWS.config.update({region: 'us-east-1'});

  AWS.config.update({
    accessKeyId: "AKIAIMPM63GNWBF4MV3A",
    secretAccessKey: "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",
    region: "us-east-1"
  });
  const url = `http://localhost:4200/resetPasswordRequest?token=${token}`;

  // Create sendEmail params 
  var params = {
    Destination: { /* required */
      ToAddresses: [
        email,//'muneebkt@gmail.com'
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<p>You requested for a password reset.</p> 
          <p>Kindly use this <a href=${url}>Link</a> to reset your password</p>
          <br>
          <p>Cheers!</p>
          </div>
          </body>
          </html>`
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Angular Skeliton Password Reset'
      }
    },
    Source: 'muneebkt@gmail.com', /* required */

  };

  return new Promise(function (resolve, reject) {
    // Create the promise and SES service object
    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
    // Handle promise's fulfilled/rejected states
    sendPromise.then(
      function (data) {
        console.log("Email sent successfully")
        //console.log(data.MessageId);
        resolve(true);
      }).catch(
        function (err) {
          console.error(err, err.stack);
          resolve(false);
        });
  })
}


/**
 * Check the token send by the user is correct
 */
exports.checkUserToken = (req, res) => {
  User.findOne({
    where: {
      reset_password_token: req.body.token,
      reset_password_expires: {
        [Op.gte]: Date.now()
      }
    }
  }).then(user => {
    if (!user) {
      return res.status(200).send({
        status: "failure",
        message: "Token sent is incorrect!"
      })
    } else {
      return res.status(200).send({
        status: "success",
        message: "Token is correct"
      })
    }
  })
} 