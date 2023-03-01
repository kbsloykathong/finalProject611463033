var loadFile = function (event) {
	var output = document.getElementById('output');
	output.src = URL.createObjectURL(event.target.files[0]);
	output.onload = function () {
		URL.revokeObjectURL(output.src)
	}
};

function openScreenLogin() {
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
			'<input id="username" name="username" class="form-input" placeholder="อีเมล / ไอดีผู้ใช้" autocomplete="off">' +
			'<label>รหัสผ่าน</label>' +
			'<input id="password" name="password" type="password" class="form-input" placeholder="รหัสผ่าน" autocomplete="off">' +
			'<span>มีบัญชีแล้ว ? <a class="see-all" href="#สมัครสมาชิก" onclick="showUserLoginBox()">ลงชื่อเข้าใช้</a></span>' +
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

// function openScreenLogin() {
// 	Swal.fire({
// 		title: 'สมัครสมาชิกกับเรา',
// 		html:
// 			'<form class="form-box" enctype="multipart/form-data">' +
// 			// '<form class="form-box" method="post" action="/adduser" enctype="multipart/form-data">' +
// 			'<center>' +
// 			'<img width="100px" style="border-radius: 50px; border: 5px solid #2a7cb7;" id="output" src="image/profile-image.png"/><br><br>' +
// 			'<label class="select-image-register" for="inpFile">' +
// 			'<i class="fa-solid fa-image"></i> เลือกไฟล์รูปภาพ</label></center><br>' +
// 			'<input id="inpFile" type="file" name="image" accept="image/*" style="display: none;" multiple onchange="loadFile(event)">' +
// 			'<label>ชื่อ</label>' +
// 			'<input id="name" name="name" class="form-input" placeholder="ชื่อ" autocomplete="off">' +
// 			'<label>เบอร์โทรศัพท์</label>' +
// 			'<input id="phone" name="phone" class="form-input form-input-phone" placeholder="เบอร์โทรศัพท์" autocomplete="off">' +
// 			'<label>ไอดีผู้ใช้</label>' +
// 			'<input id="username" name="username" class="form-input" placeholder="อีเมล / ไอดีผู้ใช้" autocomplete="off">' +
// 			'<label>รหัสผ่าน</label>' +
// 			'<input id="password" name="password" type="password" class="form-input" placeholder="รหัสผ่าน" autocomplete="off">' +
// 			'<span>มีบัญชีแล้ว ? <a class="see-all" href="#สมัครสมาชิก" onclick="showUserLoginBox()">ลงชื่อเข้าใช้</a></span>' +
// 			// '<br><button type="submit" class="btn-success">Submit</button>' +
// 			'</form>',
// 		// showCancelButton: false,
// 		// showConfirmButton: false,
// 		// customClass: {
// 		// 	confirmButton: 'btn-success',
// 		// 	cancelButton: 'btn-cancel'
// 		// },
// 		focusConfirm: false,
// 		reverseButtons: true,
// 		confirmButtonText: 'ยืนยัน',
// 		cancelButtonText: 'กลับหน้าหลัก',
// 		showCancelButton: true,
// 		customClass: {
// 			confirmButton: 'btn-success',
// 			cancelButton: 'btn-cancel'
// 		},
// 		buttonsStyling: false,

// 		preConfirm: () => {
// 			if (document.getElementById('inpFile').files.length != 0 &&
// 				document.getElementById('name').value &&
// 				document.getElementById("username").value &&
// 				document.getElementById("phone").value &&
// 				document.getElementById("password").value) {
// 				userCreate();
// 			} else {
// 				Swal.showValidationMessage('โปรดกรอกข้อมูลและเลือกรูปภาพให้ครบถ้วน')
// 			}
// 		}
// 	})
// }

function userCreate() {
	var inpFile = document.getElementById("inpFile").files;
	var name = document.getElementById("name").value;
	var username = document.getElementById("username").value;
	var phone = document.getElementById("phone").value;
	var password = document.getElementById("password").value;

	var formData = new FormData();
	formData.append("image", inpFile[0]);
	formData.append("name", name);
	formData.append("username", username);
	formData.append("phone", phone);
	formData.append("password", password);

	Swal.fire({
		icon: 'success',
		title: 'เพิ่มข้อมูลสำเร็จ',
		showConfirmButton: false,
		timer: 1000
	});

	setTimeout(function () {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "http://localhost:3000/adduser", true);
		xhttp.send(formData);
	}, 1200);

}