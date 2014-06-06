function updateUserAddressList(){

	$.ajax({
        type: 'POST',
        url: 'getUserAddresses',
        dataType: 'text',
        success: function(data){
            $('select[name="addresses"]').html("<option value>Select an address</option>");
            $('select[name="addresses"]').append("<option value='"+data+"'>"+data+"</option>");
        }
    });
}

$(function() {
	updateUserAddressList();

    $( "#addAddress" ).click(function() {
        var address=prompt("Please enter your address","");
        
        if(address != ""){
	        $.ajax({
	            type: 'POST',
	            data: {address:address},
	            url: 'addAddressToCurrentUser',
	            dataType: 'json',
	            success: function(data){
	                alert('data')
	            }
	        }); 
    	}else{
    		alert('Address invalid');
    	}
    });
});