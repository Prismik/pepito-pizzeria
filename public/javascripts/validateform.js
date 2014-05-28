var validePassword;
var valideEmail;

function validatePassword(){
    var password = document.getElementById('password');
    var password1 = document.getElementById('password2');
    var message = document.getElementById('message');
    if (password.value == password1.value) {
        message.innerHTML = "Passwords match";
        validePassword = true;
    }else{
        message.innerHTML = "Passwords don't match";
        validePassword = false;
    }
    validateForm();
}

function validateEmail(){
    var mail=document.getElementById('inputUserEmail').value;
    var at=mail.indexOf("@");
    var dot=mail.lastIndexOf(".");
    if (at<1 || dot<at+2 || dot+2>=mail.length)
    {
        message.innerHTML = "Not a valide email address";
        valideEmail = false;
    }else{
        valideEmail = true;
        message.innerHTML = "";
    }  
    validateForm();  
}
function validateForm(){
    var btnSubmit = document.getElementById("btnSubmit");
    if (valideEmail && validePassword)
    {
        btnSubmit.disabled=false;
    }else{
        btnSubmit.disabled=true;
    }
}