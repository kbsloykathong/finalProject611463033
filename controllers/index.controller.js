// const fs = require('fs');

// const session = require("express-session");

exports.getHomePage = (req, res) => {

	let sql_query = "SELECT iduser, idpost, username, name, image, title, detail, DATE_FORMAT(created_post, '%d %M %Y %r') as postdate FROM post JOIN users USING(iduser) ORDER BY idpost DESC";
	session = req.session;
	connectDB.query(sql_query, (err, result) => {
		if (err) {
			res.redirect('/');
		} res.render('index', {
			title: "Home Page.",
			error: "",
			post: result
		});
	});

};

exports.editUsers = (req, res) => {

	let sql_query = "SELECT iduser, idpost, username, name, image, title, detail, DATE_FORMAT(created_post, '%d %M %Y %r') as postdate FROM post JOIN users USING(iduser) ORDER BY idpost ASC";
	session = req.session;
	connectDB.query(sql_query, (err, result) => {
		if (err) {
			res.redirect('/');
		} res.render('edituser', {
			title: "Home Page.",
			error: "",
			post: result
		});
	});

};

exports.updateUser = (req, res) => {

	session = req.session;
	let iduser = session.iduser;
	let name = req.body.name;
	let phone = req.body.phone;
	session.name = name;
	session.phone = phone;

	let query = "UPDATE `users` SET `name` = '" + name + "', `phone` = '" + phone + "' WHERE `iduser` = '" + iduser + "'";
	connectDB.query(query, (err, result) => {
		if (err) {
			return res.status(500).send(err);
		}
		session.message = "แก้ไขข้อมูลเรียบร้อยแล้ว";
		res.redirect('/');
	});

};

// exports.editPosts = (req, res) => {

// 	let id = req.params.id;

// 	let sql_query = "SELECT iduser, idpost, username, name, image, title, detail, DATE_FORMAT(created_post, '%d %M %Y %r') as postdate FROM post JOIN users USING(iduser) WHERE idpost = " + id + "";
// 	session = req.session;
// 	connectDB.query(sql_query, (err, result) => {
// 		console.log(result);
// 		if (err) {
// 			res.redirect('/');
// 		} res.render('editpost', {
// 			title: "Home Page.",
// 			error: "",
// 			post: result
// 		});
// 	});
// };

exports.updateUser = (req, res) => {

	session = req.session;
	let iduser = session.iduser;
	let name = req.body.name;
	let phone = req.body.phone;
	session.name = name;
	session.phone = phone;

	let query = "UPDATE `users` SET `name` = '" + name + "', `phone` = '" + phone + "' WHERE `iduser` = '" + iduser + "'";
	connectDB.query(query, (err, result) => {
		if (err) {
			return res.status(500).send(err);
		}
		session.message = "แก้ไขข้อมูลเรียบร้อยแล้ว";
		res.redirect('/');
	});

};


exports.addUsers = (req, res) => {
	session = req.session;

	if (!req.files) {
		session.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
		res.redirect('/');
	} else {

		if (req.body.name && req.body.username && req.body.password && req.body.phone) {
			let name = req.body.name;
			let username = req.body.username;
			let password = req.body.password;
			let phone = req.body.phone;
			let uploadedFile = req.files.image;
			let image_name = uploadedFile.name;

			let fileExtension = uploadedFile.mimetype.split('/')[1];
			image_name = username + '.' + fileExtension;

			let usernameQuery = "SELECT * FROM `users` WHERE username = '" + username + "'";

			connectDB.query(usernameQuery, (err, result) => {
				if (err) {
					return res.status(500).send(err);
				}

				if (result.length > 0) {
					res.render('index', {
						title: "Home Page.",
						error: "userID นี้ได้ลงทะเบียนไปแล้ว",
					});
				} else {
					if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg') {
						uploadedFile.mv(`public/uploads/${image_name}`, (err) => {
							if (err) {
								return res.status(500).send(err);
							}
							let query = "INSERT INTO `users` (name, username, password, phone, image) VALUES ('" +
								name + "', '" + username + "', '" + password + "', '" + phone + "', '" + image_name + "')";
							connectDB.query(query, (err, result) => {
								if (err) {
									return res.status(500).send(err);
								}
								let queryMax = "SELECT iduser, name, phone, image FROM `users` WHERE username = '"
									+ username + "'";
								connectDB.query(queryMax, (err, result) => {
									if (err) {
										return res.status(500).send(err);
									}
									console.log(result);
									session = req.session;
									session.userid = username;
									session.iduser = result[0].iduser;
									session.name = result[0].name;
									session.phone = result[0].phone;
									session.image = result[0].image;
									session.message = "สมัครสมาชิกเรียบร้อยแล้ว";
									res.redirect('/');
								});
							});
						});
					} else {
						session.message = "กรุณากรอกข้อมูลให้ครบ";
						res.redirect('/');
					}
				}
			});
		} else {
			session.message = "กรุณากรอกข้อมูลให้ครบ";
			res.redirect('/');
		}
	}
}

exports.addPost = (req, res) => {

	session = req.session;

	if (req.body.title == '' || req.body.detail == '') {
		session.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
		res.redirect('/');
	} else {
		let title = req.body.title;
		let detail = req.body.detail;
		let query = "INSERT INTO `post` (title, detail, iduser) VALUES ('"
			+ title + "', '" + detail + "', " + session.iduser + ")";
		connectDB.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			session.message = "โพสเรียบร้อยแล้ว";
			res.redirect('/');
		});
	}

}

exports.login = (req, res) => {

	session = req.session;

	if (req.body.username && req.body.password) {

		let username = req.body.username;
		let password = req.body.password;

		if (username && password) {
			connectDB.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, result, fields) {
				if (result.length > 0) {
					session.message = "เข้าสู่ระบบเรียบร้อยแล้ว";
					session.userid = username;
					session.iduser = result[0].iduser;
					session.name = result[0].name;
					session.phone = result[0].phone;
					session.image = result[0].image;
					res.redirect('/');
				} else {
					session.message = "ไม่มีข้อมูลผู้ใช้นี้";
					res.redirect('/');
				}
			});
		} else {
			session.message = "กรุณากรอกข้อมูลให้ครบ";
			res.redirect('/');
		}

	} else {
		session.message = "กรุณากรอกข้อมูลให้ครบ";
		res.redirect('/');
	}

};

exports.delete = (req, res) => {
    let id = req.params.id;
    let deleteUser = 'DELETE FROM users WHERE iduser = "' + id + '"';
    let deletePost = 'DELETE FROM users WHERE iduser = "' + id + '"';

	session = req.session;
	connectDB.query(deletePost, (err, result) => {
		if (err) {
			return res.status(500).send(err);
		}
		connectDB.query(deleteUser, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			req.session.destroy();
			session.message = "ลบข้อมูลผู้ใช้ทั้งหมดแล้ว";
			res.redirect('/');
		});
	});
    
}

exports.logout = (req, res) => {
	req.session.destroy();
	res.redirect('/');
};