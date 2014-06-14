$(document).ready(function() {
    $("#inputUserEmail").change(function() {
        var emailaddress = $("#inputUserEmail").val();
        $.ajax({
            type: 'POST',
            url: '/users/verifyEmail',
            data: {validateEmail:emailaddress},
            success: function(validation){
            	if(validation)
            		document.getElementById("inputUserEmail").setCustomValidity("");
            	else
            		document.getElementById("inputUserEmail").setCustomValidity("This email address is already used");
            }
        });
    }); 
});