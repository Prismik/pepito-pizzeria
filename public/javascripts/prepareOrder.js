$(document).ready(function() {
	var action = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
	var actionUrl = "";
	var redirection = "";

	switch (action) {
	    case "/listOpen": 
	    	actionUrl = "prepareOrder";
	    	redirection = "/orders/listPreparation";
	    break;

	    case "/listPreparation": 
	    	actionUrl = "finishOrder";
	    	redirection = "/orders/listOpen";
	    break;

	    case "/listReady": 
	    	actionUrl = "finishOrder";
	    	redirection = "/orders/listOpen";
	    break;

	    default:
	    	alert("Error");
	    	return 0;
	    break;
	}

	$(".changeStatusButton").click(function(){
		$.ajax({
			type: 'POST',
			data: {id: $(this).attr('elem')},
			url: actionUrl,
			dataType: 'json',
			success: function(data) {
				if(data == "200"){
					window.location.replace(redirection);
				}else{
					alert('There was en error');
				}
			}
		}); 
	});
});