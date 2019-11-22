const PORT = process.env.PORT || 3000;
const app = require("express")();
const http = require("http").createServer(app);

//imPORTing Account CRUD
const account_create = require('./account_CRUD/create')
const account_auth = require('./account_CRUD/auth')
const account_auth_user = require('./account_CRUD/auth_user')
const account_update = require('./account_CRUD/update')
const account_delete = require('./account_CRUD/delete')

//importing ms_group_CRUD
const ms_group_create = require('./ms_group_CRUD/create');


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


//ms_groups
app.post('/ms-groups/:id', (req, res) => {
  var title;
  req.on('data', (datai)=>{
     title = JSON.parse(datai)
  })
  ms_group_create.create_ms_group(req,res);
})

http.listen(PORT, function () {
  console.log("listening on *: " + PORT);
});
