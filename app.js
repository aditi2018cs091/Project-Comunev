// JavaScript source code
var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://muskan:aditi@cluster0-nvyf0.mongodb.net/application-form?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})
var app = express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/detailsform', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var portfolio = req.body.portfolio;
    var position = req.body.position;
    var qualification = req.body.qualification;
    var info = {
        "name": name,
        "email": email,
        "portfolio": portfolio,
        "position": position,
        "qualification": qualification
    }
    db.collection('details').insertOne(info, function (err, collection) {
        if (err) throw err;
        console.log("Submitted Successfully");
    });
    return res.redirect('index.html');
})
app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000)
console.log("server listening at port 3000"); 
