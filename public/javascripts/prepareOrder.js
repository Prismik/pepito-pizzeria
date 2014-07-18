$(document).ready(function() {
	$(".changeStatusButton").click(function(){
		$.ajax({
			type: 'POST',
			data: {id: 0},
			url: 'prepareOrder',
			dataType: 'json',
			success: function(data) {
				if(data == "200"){
					//reload
				}else{
					alert('There was en error');
				}
			}
		}); 
	});
}