const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();

app.use(sessions({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

var session;
global.session = session;
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

const connectDB = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'db_nodejs'
});

connectDB.connect((err) => {
	if (err) throw err;
	console.log('Connected to database successful.');
});

global.connectDB = connectDB;

app.listen(3000, () => {
	{
		console.log("server is read, Plase click link : http://localhost:3000/");
	}
});

const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);
app.get('*', function (req, res, next) {
	res.status(404);
	session = req.session;
	session.message = "หน้า Page นี้ไม่พร้อมใช้งาน";
	res.redirect('/');
});

