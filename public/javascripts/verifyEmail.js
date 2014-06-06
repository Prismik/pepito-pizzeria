$(document).ready(function() {

    $("#inputUserEmail").change(function() {
    alert("email has been changed: "("#inputUserEmail").val());
        if($("#inputUserEmail").val() != ""){
            $.ajax({
                type: 'POST',
                url: 'verifyEmail',
                data: {emailAddress:$("#inputUserEmail").val()},
                success: function(validation){
                    alert(validation);
                    }
                });
            
        }else{
            alert('There is a problem validating the email address');
        }
    }); 
});