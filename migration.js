var mysql = require('mysql');
var migration = require('mysql-migrations');
var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var port = process.env.PORT || 3000;

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_android'
});

migration.init(connection, __dirname + '/migrations');

http.listen(port, function () {
    console.log('listening on *: ' + port);
});
