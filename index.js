const express = require('express')
const app = express();
const port = process.env.PORT || 1234;
const SECRET_KEY = "secretkey23456";
const parser = require('body-parser');

//importing Account CRUD
const account_create = require('./account_CRUD/create');
const account_auth = require('./account_CRUD/auth');
const account_auth_user = require('./account_CRUD/auth_user');
const account_update = require('./account_CRUD/update');
const account_delete = require('./account_CRUD/delete');
//importing Feeds CRUD
const feeds_create = require('./feed_CRUD/create')
const feeds_retrieve = require('./feed_CRUD/retrieve')
const feeds_update = require('./feed_CRUD/update')
const feeds_delete = require('./feed_CRUD/delete')
//importing reaction CRUD
const reactions_create = require('./reaction_CRUD/create');
const reactions_delete = require('./reaction_CRUD/delete');
const reactions_retrieve = require('./reaction_CRUD/retrieve');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.post('/auth/user', function (req, res, next) {
  account_auth_user.auth_user(req, res);
})

// USER CRUD
app.post("/accounts/create", (req, res) => {
  account_create.create_account(req, res);
});

app.post("/auth", (req, res) => {
  account_auth.auth(req, res);
});

app.post("/accounts/update", (req, res) => {
  account_update.update(req, res);
});

app.post("/accounts/delete", (req, res) => {
  account_delete.account_delete(req, res);
});

//FEEDS CRUD
app.post('/feeds/create', (req, res) => {
  feeds_create.feeds_create(req, res);
});

app.get('/feeds/retrieve', (res) => {
  feeds_retrieve.feeds_retrieve(req, res);
});

app.post('/feeds/delete', (req, res) => {
  feeds_delete.feeds_delete(req, res);
});

app.post('/feeds/update', (req, res) => {
  feeds_update.feeds_update(req, res);
});

//REACTION
app.post('/reactions/create', (req, res) => {
  reactions_create.reactions_handler(req, res);
});

app.post('/reactions/delete', (req, res) => {
  reactions_delete.reactions_delete(req, res);
});

app.post('/reactions/retrieve', (res) => {
  reactions_retrieve.reactions_retrieve(req, res);
});

app.listen(port, () => {
  console.log("listening on *: " + port);
});
