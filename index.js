const mysql = require("mysql");
const app = require("express")();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require('./config');
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const SECRET_KEY = "secretkey23456";

//importing Account CRUD
const account_create = require('./account_CRUD/create')
const account_auth = require('./account_CRUD/auth')
const account_auth_user = require('./account_CRUD/auth_user')
const account_update = require('./account_CRUD/update')
const account_delete = require('./account_CRUD/delete')
//importing Feeds CRUD
const feeds_create = require('./feed_CRUD/create')
const feeds_retrieve = require('./feed_CRUD/retrieve')
const feeds_update = require('./feed_CRUD/update')
// const feeds_delete = require('./feed_CRUD/delete')

app.get('/auth/user', function (req, res, next) {
  account_auth_user.auth_user(req, res);
})
// USER CRUD
app.post("/accounts/create", function (req, res) {
  account_create.create_account(req, res);
});

app.get("/auth", function (req, res) {
  account_auth.auth(req, res);
});

app.put("/accounts/update", function (req, res) {
  account_update.update(req, res);
});

app.delete("/accounts/delete", function (req, res) {
  account_delete.account_delete(req, res);
});


//FEEDS CRUD
app.post('/feeds/create', function (req, res) {
  feeds_create.feeds_create(req, res);
})

app.get('/feeds/retrieve', function (req, res) {
  feeds_retrieve.feeds_retrieve(req, res);
})

// app.delete('feeds/delete',function(req,res){
//   feeds_delete.feeds_delete(req,res);
// })
app.put('/feeds/update', function (req, res) {
  feeds_update.feeds_update(req, res);
})

http.listen(port, function () {
  console.log("listening on *: " + port);
});
