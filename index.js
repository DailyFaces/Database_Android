const app = require("express")();
const express = require("express");
const app = express(); //use express instead of http module
const port = process.env.PORT || 3000;
// removed unused imports
// create connection as global
//importing Account CRUD
const account_crud = require('./account_CRUD/account_crud'); //main crud controller

app.post('/auth/user', function(req, res, next) {
    account_crud.auth_user(req, res);
})

app.post("/accounts/create", function(req, res) {
    account_crud.register(req, res);
});

app.post("/auth", function(req, res) {
    account_crud.auth(req, res);
});

app.post("/accounts/update", function(req, res) {
    account_crud.update(req, res);
});

app.post("/accounts/delete", function(req, res) {
    account_crud.delete_account(req, res);
});

app.listen(port, function() {
    console.log("listening on *: " + port);
});