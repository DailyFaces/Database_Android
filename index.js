const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs')

//importing Account CRUD
const account_create = require('./account_CRUD/create')
const account_auth = require('./account_CRUD/auth')
const account_auth_user = require('./account_CRUD/auth_user')
const account_update = require('./account_CRUD/update')
const account_delete = require('./account_CRUD/delete')

//importing Account Profiles
const information_create = require('./account_informations/create')
const information_retrieve = require('./account_informations/retrieve')
const information_update = require('./account_informations/update')
const information_delete = require('./account_informations/delete')

//importing Account status
const status_create = require('./account_status/create')
const status_retrieve = require('./account_status/retrieve')
const status_update = require('./account_status/update')
const status_delete = require('./account_status/delete')

//importing account profiles
const profiles_create = require('./account_profiles/create')
const profiles_retrieveAll = require('./account_profiles/retrieveAll')
const profiles_retrieve = require('./account_profiles/retrieve')
const profiles_delete = require('./account_profiles/delete')

//importing images
const images_create = require('./images/create')
const images_retrieveAll = require('./images/retrieveAll')
const images_retrieve = require('./images/retrieve')
const images_delete = require('./images/delete')

//importing feed images
const feed_images_create = require('./feeds_images/create')
const feed_images_retrieveAll = require('./feeds_images/retrieveAll')
const feed_images_retrieve = require('./feeds_images/retrieve')
const feed_images_delete = require('./feeds_images/delete')

//importing Feeds CRUD
const feeds_create = require('./feed_CRUD/create')
const feeds_retrieve = require('./feed_CRUD/retrieve')
const feeds_update = require('./feed_CRUD/update')
const feeds_delete = require('./feed_CRUD/delete')

//importing reaction CRUD
const reactions_create = require('./reaction_CRUD/create')
const reactions_delete = require('./reaction_CRUD/delete')
const reactions_retrieve = require('./reaction_CRUD/retrieve')

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403)
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {    cb(null, './public/images');  },
  filename: (req, file, cb) => {
    var filetype = '';

    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, file.fieldname + Date.now() + '.' + filetype);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))

//routes for accounts
app.post('/auth/user', checkToken, function (req, res) {  account_auth_user.auth_user(req, res);})
app.post("/accounts/create", function (req, res) {  account_create.create_account(req, res);});
app.post("/auth", function (req, res) {  account_auth.auth(req, res);});
app.post("/accounts/update", function (req, res) {  account_update.update(req, res);});
app.post("/accounts/delete", function (req, res) {  account_delete.account_delete(req, res);});

//routes for account profiles
app.post('/informations/create', (req, res) => {  information_create.create(req, res);})
app.post('/informations/retrieve/:account_id', (req, res) => {  information_retrieve.retrieve(req, res);})
app.post('/informations/update', (req, res) => {  information_update.update(req, res);})
app.post('/informations/delete/:account_id', (req, res) => {  information_delete.remove(req, res);})

//routes for account status
app.post('/status/create', (req, res) => {  status_create.create(req, res);})
app.post('/status/:account_id', (req, res) => {  status_retrieve.retrieve(req, res);})
app.post('/status/update', (req, res) => {  status_update.update(req, res);})
app.post('/status/delete/:account_id', (req, res) => {  status_delete.remove(req, res);})

//routes for account profiles
app.post('/profiles/create', upload.single('file'), (req, res) => { 
  var raw = new Buffer(req.body.image.toString(), 'base64')
  let filename = Date.now() + req.body.extension
  fs.writeFile('./public/images/' + filename, raw, function (err) {
    if (err) {console.log(err)}
  })
  req.body['filename'] = filename
   profiles_create.create(req, res)}
   )
app.get('/profiles/retrieve', (req, res) => {  profiles_retrieveAll.retrieve(req, res)})
app.get('/profiles/:filename', (req, res) => {  profiles_retrieve.retrieve(req, res)})
app.post('/profiles/delete', (req, res) => {  profiles_delete.remove(req, res)})

//router for images

app.post('/images/create', upload.single('file'), function (req, res) { 
  var raw = new Buffer(req.body.image.toString(), 'base64')
  let filename = Date.now() + req.body.extension
  fs.writeFile('./public/images/' + filename, raw, function (err) {
    if (err) {console.log(err)}
  })
  req.body['filename'] = filename
  images_create.create(req, res);
})
app.get('/images/retrieve', (req, res) => {  images_retrieveAll.retrieve(req, res)})
app.get('/images/:filename', function (req, res) {  images_retrieve.retrieve(req, res);})
app.post('/images/delete', function (req, res) {  images_delete.remove(req, res);});

//routes for feeds images
app.post('/feeds/images/create', upload.single('file'), function (req, res) { 
  var raw = new Buffer(req.body.image.toString(), 'base64')
  let filename = Date.now() + req.body.extension
  fs.writeFile('./public/images/' + filename, raw, function (err) {
    if (err) {console.log(err)}
  })
  req.body['filename'] = filename 
  feed_images_create.create(req, res);})
app.get('/feeds/images/retrieve', (req, res) => { feed_images_retrieveAll.retrieve(req, res)})
app.get('/feeds/images/:filename', function (req, res) {  feed_images_retrieve.retrieve(req, res);})
app.post('/feeds/images/delete', function (req, res) {  feed_images_delete.remove(req, res);});

//FEEDS CRUD
app.post('/feeds/create', function (req, res) {  feeds_create.feeds_create(req, res);});
app.post('/feeds/retrieve', function (req, res) {  feeds_retrieve.feeds_retrieve(req, res);});
app.post('/feeds/delete', function (req, res) {  feeds_delete.feeds_delete(req, res);});
app.post('/feeds/update', function (req, res) {  feeds_update.feeds_update(req, res);});

//REACTION
app.post('/reactions/create', function (req, res) {  reactions_create.reactions_handler(req, res);});
app.post('/reactions/delete', function (req, res) {  reactions_delete.reactions_delete(req, res);});
app.post('/reactions/retrieve', function (req, res) {  reactions_retrieve.reactions_retrieve(req, res);});


http.listen(port, function () {
  console.log("listening on *: " + port);
});
