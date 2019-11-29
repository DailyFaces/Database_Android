const express = require("express");
const app = express(); //use express instead of http module
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});



// removed unused imports
// create connection as global
//importing Account CRUD
const account_crud = require('./account_CRUD/account_crud'); //main crud controller

app.post('/auth/user', function (req, res, next) {
  account_crud.auth_user(req, res);
})

app.post("/accounts/create", function (req, res) {
  account_crud.register(req, res);
});

app.post("/auth", function (req, res) {
  account_crud.auth(req, res);
});

app.post("/accounts/update", function (req, res) {
  account_crud.update(req, res);
});

app.post("/accounts/delete", function (req, res) {
  account_crud.delete_account(req, res);
});


//importing ms_group_CRUD
const ms_group_crud = require('./ms_group_CRUD/ms_group_crud');

app.post('/ms-groups/create/:id', (req, res) => {
  ms_group_crud.create.create_ms_group(req, res);
})

app.post('/ms-groups/retrieve-all', (req, res) => {
  ms_group_crud.retrieve.all_retrieve_ms_group(req, res);
})

app.post('/ms-groups/retrieve/active', (req, res) => {
  ms_group_crud.retrieve.retrieve_ms_group(req, res);
})

app.post('/ms-groups/delete/:id', (req, res) => {
  ms_group_crud.delete.delete_ms_group(req, res);
})

app.post('/ms-groups/update/:id', (req, res) => {
  ms_group_crud.update.update_ms_group(req, res);
})


//importing ms_member_CRUD
const ms_member_crud = require('./ms_member_CRUD/ms_member_crud');

app.post('/ms-members/create/:id', (req, res) => {
  ms_member_crud.create.create_ms_member(req, res);
})

app.post('/ms-members/retrieve/all', (req, res) => {
  ms_member_crud.retrieve.all_retrieve_ms_member(req, res);
})
app.post('/ms-members/retrieve/active', (req, res) => {
  ms_member_crud.retrieve.retrieve_ms_member(req, res);
})

app.post('/ms-members/update/:id', (req, res) => {
  ms_member_crud.update.update_ms_member(req, res);
})

app.post('/ms-members/delete/:id', (req, res) => {
  ms_member_crud.delete.delete_ms_member(req, res);
})

//importing ms_messages_CRUD
const ms_messages_crud = require('./ms_messages_CRUD/ms_messages_crud');

app.post('/ms-messages/create/:id', (req, res) => {
  ms_messages_crud.create.create_ms_message(req, res);
})

app.post('/ms-messages/retrieve/all', (req, res) => {
  ms_messages_crud.retrieve.all_retrieve_ms_message(req, res);
})

app.post('/ms-messages/retrieve/active', (req, res) => {
  ms_messages_crud.retrieve.retrieve_ms_message(req, res);
})

app.post('/ms-messages/update/:id', (req, res) => {
  ms_messages_crud.update.update_ms_message(req, res);
})


app.listen(PORT, function () {
  console.log("listening on *: " + PORT);
});
