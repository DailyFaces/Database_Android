const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = require('./router');
const fs = require('fs')
const path = require('path')
var mysql = require('mysql');



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'daily_faces'
});

connection.connect();

global.db = connection;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var multer = require('multer');

var storage = multer.diskStorage({
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
var upload = multer({ storage: storage });

app.post('/create', upload.single('file'), function (req, res, next) {
    console.log(req.file)
    let url = '/images/' + req.file.filename;
    var sql = "INSERT INTO `images`(`url`,`created_at`, `updated_at`) VALUES ('" + url + "','" + new Date().toISOString() + "','" + new Date().toISOString() + "')";
    console.log("here")
    connection.query(sql, function (err, rows) {
        if (err) {
            res.send(err)
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
})

app.get('/images/:filename', function (req, res) {
    console.log(req.params.filename)
    let file = __dirname + '/public/images/' + req.params.filename;
    res.sendFile(file);
})

app.put('/imageDelete', function (req, res) {
    console.log(req.body.id);
    console.log('file received');
    console.log(req.body.id);
    var sql = "UPDATE `images` SET `updated_at`='" + new Date().toISOString() + "',`deleted_at`='" + new Date().toISOString() + "' WHERE `id` = '" + req.body.id + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.send(err)
        }
        console.log(rows[0])
        res.send(rows);

    })
});

app.listen(port, function () {
    console.log('Server is running on PORT', port);
});