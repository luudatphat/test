var express     = require("express");
var path        = require('path');
var dotenv      = require('dotenv').config();
var webpush     = require('web-push');
var bodyPares   = require('body-parser');
// var mysql       = require('mysql');

// Cách lấy key của web push
// let vapiKeys = webpush.generateVAPIDKeys();
// console.log(vapiKeys); 



var app     = express();
// khai báo sử dụng  view ejs, mục view đặt ở /views
app.set("view engine", "ejs");
app.set("views", "./views"); 
app.use(express.static(path.join(__dirname, 'public'))); // Chuyển hướng thư mục 

// xuất ra kiểu json
app.use(bodyPares.urlencoded({ extended: true }))
app.use(bodyPares.json())

// Kết nối quá route
let routes = require(path.join(__dirname, 'api/routes'))
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

// kết nối port
const port = process.env.POST||7000;
app.listen(port, () => console.log(`Serve connet port ${port}`));