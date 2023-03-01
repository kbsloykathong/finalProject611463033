var loadFile = function (event) {
	var output = document.getElementById('output');
	output.src = URL.createObjectURL(event.target.files[0]);
	output.onload = function () {
		URL.revokeObjectURL(output.src)
	}
};

setTimeout(function () {
	document.getElementById("alert").style.display = "none";
}, 3000);

function openScreenRegister() {
	Swal.fire({
		title: 'สมัครสมาชิกกับเรา',
		html:
			'<form class="form-box" method="post" action="/adduser" enctype="multipart/form-data">' +
			'<center>' +
			'<img width="100px" style="border-radius: 50px; border: 5px solid #2a7cb7;" id="output" src="image/profile-image.png"/><br><br>' +
			'<label class="select-image-register" for="inpFile">' +
			'<i class="fa-solid fa-image"></i> เลือกไฟล์รูปภาพ</label></center><br>' +
			'<input id="inpFile" type="file" name="image" accept="image/*" style="display: none;" multiple onchange="loadFile(event)">' +
			'<label>ชื่อ</label>' +
			'<input id="name" name="name" class="form-input" placeholder="ชื่อ" autocomplete="off">' +
			'<label>เบอร์โทรศัพท์</label>' +
			'<input id="phone" name="phone" class="form-input form-input-phone" placeholder="เบอร์โทรศัพท์" autocomplete="off">' +
			'<label>ไอดีผู้ใช้</label>' +
			'<input id="username" name="username" class="form-input" placeholder="ไอดีผู้ใช้" autocomplete="off">' +
			'<label>รหัสผ่าน</label>' +
			'<input id="password" name="password" type="password" class="form-input" placeholder="รหัสผ่าน" autocomplete="off">' + '<span>มีบัญชีแล้ว ? <a class="sop" href="#สมัครสมาชิก" onclick="openScreenLogin()">ลงชื่อเข้าใช้</a></span>' +
			'<br><button type="submit" class="btn-success">Submit</button>' +
			'</form>',
		buttonsStyling: false,

		showCancelButton: false,
		showConfirmButton: false,
		customClass: {
			confirmButton: 'btn-success',
			cancelButton: 'btn-cancel'
		},
		buttonsStyling: false,
	})
}

function openScreenLogin() {
	Swal.fire({
		title: 'ลงชื่อเข้าใช้',
		html:
			'<form class="form-box" method="post" action="/login">' +
			'<center>' +
			'<img width="100px" style="border-radius: 50px; border: 5px solid #2a7cb7;" id="output" src="image/profile-image.png"/><br><br>' + '</center>' +
			'<label>ไอดีผู้ใช้</label>' +
			'<input id="username" name="username" class="form-input" placeholder="ไอดีผู้ใช้" autocomplete="off">' +
			'<label>รหัสผ่าน</label>' +
			'<input id="password" name="password" type="password" class="form-input" placeholder="รหัสผ่าน" autocomplete="off">' +
			'<p id="error-login"></p>' +
			'<span>ยังไม่มีบัญชีใช่ไหม ? <a class="sop" href="#สมัครสมาชิก" onclick="openScreenRegister()">สมัครสมาชิก</a></span>' + '<br><button type="submit" class="btn-success">Submit</button>' +
			'</form>',
		showCancelButton: false,
		showConfirmButton: false,
		customClass: {
			confirmButton: 'btn-success',
			cancelButton: 'btn-cancel'
		},
		buttonsStyling: false,
	})
}

function openScreenPost() {
	Swal.fire({
		title: 'Create New Post.',
		html:
			'<form class="form-box" method="post" action="/post">' +
			'<label>ชื่อเรื่อง</label>' +
			'<input id="title" name="title" class="form-input" placeholder="ไอดีผู้ใช้" autocomplete="off">' +
			'<label>รายละเอียด</label>' +
			'<textarea id="detail" name="detail" rows="3" class="form-input" placeholder="รายละเอียด" autocomplete="off"></textarea>' +
			'<p id="error-login"></p>' +
			'<br><button type="submit" class="btn-success">Submit</button>' +
			'</form>',
		showCancelButton: false,
		showConfirmButton: false,
		customClass: {
			confirmButton: 'btn-success',
			cancelButton: 'btn-cancel'
		},
		buttonsStyling: false,
	})
}

function openScreenEditUsers() {
	Swal.fire({
		title: 'Create New Post.',
		html:
			'<form class="form-box" method="post" action="/edituser" enctype="multipart/form-data">' +
			'<center>' +
			'<img width="100px" style="border-radius: 50px; border: 5px solid #2a7cb7;" id="output" src="uploads/<%= session.image%>"/><br><br>' +
			'<label class="select-image-register" for="inpFile">' +
			'<i class="fa-solid fa-image"></i> เลือกไฟล์รูปภาพ</label></center><br>' +
			'<input id="inpFile" type="file" name="image" accept="image/*" style="display: none;" multiple onchange="loadFile(event)">' +
			'<label>ชื่อ</label>' +
			'<input id="iduser" name="iduser" value="<%= post.iduser%>" type="hidden">' +
			'<input id="name" name="name" value="<%= post.name%>" class="form-input" placeholder="ชื่อ" autocomplete="off">' +
			'<label>เบอร์โทรศัพท์</label>' +
			'<input id="phone" name="phone" value="<%= session.phone%>" class="form-input form-input-phone" placeholder="เบอร์โทรศัพท์" autocomplete="off">' +
			'<br><button type="submit" class="btn-success">Submit</button>' +
			'</form>',
		showCancelButton: false,
		showConfirmButton: false,
		customClass: {
			confirmButton: 'btn-success',
			cancelButton: 'btn-cancel'
		},
		buttonsStyling: false,
	})
}