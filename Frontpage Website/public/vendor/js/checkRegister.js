function checkPassword()
{
    var inputPassword = document.forms["registerForm"]["inputPassword"].value;
    var confirmPassword = document.forms["registerForm"]["confirmPassword"].value;
    if(inputPassword != '' && confirmPassword != '') {
        if (inputPassword != confirmPassword) {
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').className = "alert alert-danger";
            document.getElementById('messageText').innerText = 'Mật khẩu nhập lại không trùng khớp';
            document.getElementById('commitRegister').disabled = true;
        } else {
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').className = "alert alert-success";
            document.getElementById('messageText').innerText = 'Mật khẩu hợp lệ';
            document.getElementById('commitRegister').disabled = false;
        }
    }
}
