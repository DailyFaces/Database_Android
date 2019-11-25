const express = require('express')
const app = express();
const port = process.env.PORT || 1234;
const SECRET_KEY = "secretkey23456";
const parser = require('body-parser')

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
const feeds_delete = require('./feed_CRUD/delete')
//importing reaction CRUD
const reactions_create = require('./reaction_CRUD/create')
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }))
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
app.put('/feeds/delete', function (req, res) {
  feeds_delete.feeds_delete(req, res);
})

app.put('/feeds/update', function (req, res) {
  feeds_update.feeds_update(req, res);
})
//REACTION
app.post('/reactions/create', function (req, res) {
  console.log(req.body)
  reactions_create.reactions_handler(req, res);
})
app.listen(port, function () {
  console.log("listening on *: " + port);
});
