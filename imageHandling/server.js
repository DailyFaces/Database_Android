const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = require('./router');
const fs = require('fs')
var mysql = require('mysql');



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test1'
});

connection.connect();

global.db = connection;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api/', router);


//upload image

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
        cb(null, file.fieldname + new Date().getTime()+ '.' + filetype);
    }
});
var upload = multer({ storage: storage });


router.post('/create', upload.single('image'), function (req, res, next) {
    console.log(req.file)
    console.log(req.file.filename);
    if (!req.files){
    var file = fs.readFileSync(req.file.path);
    console.log(file)
    var encode_image = file.toString('base64');
    let url = 'http://localhost:3000/images/'+req.file.filename;
    
    var finalImg = {
                contentType: req.file.mimetype,
                item: new Buffer(encode_image, 'base64')
            };
            
    var sql = "INSERT INTO `tlbimage`(`image`,`upload_at`) VALUES ('" + url+ "','" + new Date().toISOString()+ "')";
    if (req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/png" || req.file.mimetype == "image/gif") {
        connection.query(sql, function (err, rows) {
            if (err) {
                res.send(err)
            } else{
                console.log(rows)
                res.send(rows);
            }
        })

    } else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.send(message);
    }
    res.json({ fileUrl: 'http://localhost:3000/images/'+req.file.filename });
}

})


//retrieve image

router.get('/images/:filename',function(req,res){
   console.log(req.params.filename)
    let file = __dirname+'/public/images/' + req.params.filename;
    res.sendFile(file);
})



app.listen(port, function () {
    console.log('Server is running on PORT', port);
});