$(document).ready(function() {
    $("#restaurantAddress").change(function() {
        var address = $( "#restaurantAddress" ).val();
        $.ajax({
            type: 'POST',
            url: '/restaurants/verifyAddress',
            data: {validateAddress:address},
            success: function(validation){
            	if(validation){
            		document.getElementById("restaurantAddress").setCustomValidity("");
            	}else{
            		document.getElementById("restaurantAddress").setCustomValidity("This address is already used");
            	}
            }
        });
    }); 
});