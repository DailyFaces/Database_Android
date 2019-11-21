const mysql = require("mysql");
const app = require("express")();
const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const config = require('./config');
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const SECRET_KEY = "secretkey23456";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "database_android"
});

app.get('/auth/user', function (req, res, next) {
  let token = req.headers.token
  console.log(req.headers.token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
        res.status(200).send(decoded);
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
})


app.post("/accounts", function(req, res) {
  console.log(req.headers.username);
  const username = req.headers.username;
  const email = req.headers.email;
  const hash = bcrypt.hashSync(req.headers.password, 10);
  const type = req.headers.type;
  const created_at = new Date().toISOString();

  let stmt =
    "INSERT INTO `accounts`(`username`, `email`, `password`, `type`, `created_at`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    hash +
    "','" +
    type +
    "','" +
    created_at +
    "')";
  connection.query(stmt, function(error, results, fields) {
    if (error) {
      res.status(401).json({
        message : "Username already existed!"
      });
      return;
    }
    if (results[0] == undefined) {
      res.status(200).json({
        message: "Successfully registered!"
      });
    }
  });
});

app.get("/accounts", function(req, res) {
  const username = req.headers.username;
  const password = req.headers.password;
  const type = req.headers.type;

  let stmt =
    "SELECT `password` FROM `accounts` WHERE `username`='" +
    username +
    "' and `type`='" +
    type +
    "'";
  connection.query(stmt, function(error, results, fields) {
    if (error) {
      res.status(401).send(error);
      return;
    }
    if (results[0] == undefined) {
      res.status(401).json({
        message: "Validation failed. Given username and password aren't matching."
      });
    } else {
      if (bcrypt.compareSync(password, results.password)) {
        var token = jwt.sign({
          exist
        }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        })
        res.status(200).json({
          success: true,
          token : token
        });
      } else {
        res.status(401).json({
          message: "Validation failed. Given username and password aren't matching."
        });
      }
    }
  });
});

app.put("/accounts", function(req, res) {
  const username = req.headers.username;
  const type = req.headers.type;
  const password = bcrypt.hashSync(req.headers.password);
  const hash = bcrypt.hashSync(req.headers.newpassword, saltRounds);
  const updated_at = new Date().toISOString();

  let stmt1 =
    "SELECT `password` FROM `accounts` WHERE `username`='" +
    username +
    "' and `type`='" +
    type +
    "'";
  let stmt2 =
    "UPDATE `accounts` SET `password`='" +
    hash +
    "',`updated_at`='" +
    updated_at +
    "' WHERE `username`='" +
    username +
    "'";
  connection.query(stmt1, function(error, results, fields) {
    if (error) {
      res.status(401).send(error);
      return;
    }
    if (results[0] == undefined) {
      res.status(401).json({
        message: "Invalid username!"
      });
    } else {
      if (bcrypt.compareSync(password, results[0].password)) {
        connection.query(stmt2, function(error, results, fields) {
          if (error) {
            res.status(401).send(error);
            return;
          }
          if (results[0] == undefined) {
            res.status(200).json({
              message: "Successfully updated!"
            });
          }
        });
      } else {
        res.status(401).json({
          message: "Incorrect password!"
        });
      }
    }
  });
});

app.delete("/accounts", function(req, res) {
  const username = req.headers.username;
  const type = req.headers.type;

  let stmt =
    "DELETE FROM `accounts` WHERE `username`='" +
    username +
    "' and `type`='" +
    type +
    "'";
    connection.query(stmt, function(error, results, fields) {
        if (error) {
          res.status(401).send(error);
          return;
        }
        if (results[0] == undefined) {
          res.status(401).json({
            message: "Successfully deleted!"
          });
        } 
      });
});

http.listen(port, function() {
  console.log("listening on *: " + port);
});
