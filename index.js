const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');

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

//importing images
const images_create  = require('./images/create')
const images_retrieve = require('./images/retrieve')
const images_delete = require('./images/delete')

//importing feed images
const feed_images_create  = require('./feeds_images/create')
const feed_images_retrieve = require('./feeds_images/retrieve')
const feed_images_delete = require('./feeds_images/delete')

const checkToken = (req, res, next) => {
  console.log(req.headers)
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
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
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes for accounts
app.post('/auth/user', checkToken, function (req, res) {
  console.log(req.body);
  account_auth_user.auth_user(req, res);
})
app.post("/accounts/create", function(req, res) {
  console.log(req.body);
  account_create.create_account(req,res);
});
app.post("/auth", function(req, res) {
  console.log(req.body);
  account_auth.auth(req, res);
});
app.post("/accounts/update", function(req, res) {
  console.log(req.body);
  account_update.update(req, res);
});
app.post("/accounts/delete", function(req, res) {
  console.log(req.body);
  account_delete.account_delete(req, res);
});

//routes for account profiles
app.post('/informations/create', (req, res) => {
  console.log(req.body);
  information_create.create(req, res);
})
app.post('/informations/retrieve/:account_id', (req, res) => {
  console.log(req.body);
  information_retrieve.retrieve(req, res);
})
app.post('/informations/update', (req, res) => {
  console.log(req.body);
  information_update.update(req, res);
})
app.post('/informations/delete/:account_id', (req, res) => {
  console.log(req.body);
  information_delete.remove(req, res);
})

//routes for account status
app.post('/status/create', (req, res) => {
  console.log(req.body);
  status_create.create(req, res);
})
app.post('/status/:account_id', (req, res) => {
  console.log(req.body);
  status_retrieve.retrieve(req, res);
})
app.post('/status/update', (req, res) => {
  console.log(req.body);
  status_update.update(req, res);
})
app.post('/status/delete/:account_id', (req, res) => {
  console.log(req.body);
  status_delete.remove(req, res);
})

//router for images
app.post('/images/create', upload.single('file'), function (req, res) {
    images_create.create(req, res);
})
app.get('/images/:filename', function (req, res) {
    images_retrieve.retrieve(req, res);
})
app.put('/images/delete', function (req, res) {
    images_delete.remove(req, res);
});

//routes for feeds images
app.post('/feeds/images/create', upload.single('file'), function (req, res) {
    feed_images_create.create(req, res);
})
app.get('/feeds/images/:filename', function (req, res) {
    feed_images_retrieve.retrieve(req, res);
})
app.put('/feeds/images/delete', function (req, res) {
    feed_images_delete.remove(req, res);
});

http.listen(port, function() {
  console.log("listening on *: " + port);
});
