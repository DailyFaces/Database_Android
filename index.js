const PORT = process.env.PORT || 3000;
// Create express app
const app = require("express")();
const http = require("http").createServer(app);
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

//imPORTing Account CRUD
const account_create = require('./account_CRUD/create')
const account_auth = require('./account_CRUD/auth')
const account_auth_user = require('./account_CRUD/auth_user')
const account_update = require('./account_CRUD/update')
const account_delete = require('./account_CRUD/delete')

console.log("connecting..,");

app.get('/auth/user', function (req, res, next) {
  account_auth_user.auth_user(req, res);
})

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

//importing ms_group_CRUD
const ms_group_create = require('./ms_group_CRUD/create')
const ms_group_retrieve = require('./ms_group_CRUD/retrieve')
const ms_group_update = require('./ms_group_CRUD/update')
const ms_group_delete = require('./ms_group_CRUD/delete')

//ms_groups
app.post('/ms-groups/:id', (req, res) => {
  ms_group_create.create_ms_group(req, res);
})

app.get('/ms-groups', (req, res) => {
  ms_group_retrieve.all_retrieve_ms_group(req, res);
})

app.get('/ms-groups/active', (req, res) => {
  ms_group_retrieve.retrieve_ms_group(req, res);
})

app.delete('/ms-groups/:id', (req, res) => {
  ms_group_delete.delete_ms_group(req, res);
})

app.put('/ms-groups/:id', (req, res) => {
  ms_group_update.update_ms_group(req, res);
})



//importing ms_group_CRUD
const ms_member_create = require('./ms_member_CRUD/create')
//ms_members
app.post('/ms-member', (req, res) => {
  ms_member_create.create_ms_member(req, res);
})

//server Connection
http.listen(PORT, function () {
  console.log("listening on *: " + PORT);
});
