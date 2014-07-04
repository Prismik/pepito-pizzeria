$(document).ready(function() {
	var plates = [];

	function renderPlates(){
		$('table#plates tbody').html('');

		if(plates.length == 0){
			$('table#plates tbody').append("<tr><td colspan=4>There is no menu item</td></tr>");
		}else{
			$.each(plates, function(i, item) {
            $('table#plates tbody').append("<tr><td class='name'>"
                + item.name
                + "</td><td class='description'>"
                + item.description
                + "</td><td class='price'>"
                + parseFloat(item.price).toFixed(2)
                + "$</td><td>"
                + "<img src='/images/pizza_cross.png' style='cursor:pointer; width: 25px;height:25px' class='deletePlate' index="+i+">"
                + "</td></tr>");
        });
		}
	}

	$('#btnAddPlate').click(function(){
		var errors = [];
		var warnings = [];

		var name = $('#plateName').val();
		var description = $('#plateDescription').val();
		var price = $('#platePrice').val();

		if(name == ""){
			errors.push("The name is required");
		}

		if(price == ""){
			errors.push("The price is required");
		}

		if(description == ""){
			warnings.push("The description was empty, but the item was still added")
		}

		$('#messageBox').html('');

		if(errors.length == 0){
			if(warnings.length != 0){
				$('#messageBox').append("<div id='message' class='warning'>There was some warnings:<ul>");
				$.each(warnings, function(i, item) {
					$('#messageBox>div#message.warning').append("<li>"+item+"</li>");
				});
				$('#messageBox').append("</ul></div>");
			}
			plates.push({
				name: name,
				description: description,
				price: price
			});

			$('#plateName').val("");
			$('#plateDescription').val("");
			$('#platePrice').val("");
		}else{
			$('#messageBox').append("<div id='message' class='error'>There was some errors:<ul>");
			$.each(errors, function(i, item) {
				$('#messageBox>div#message.error').append("<li>"+item+"</li>");
			});
			$('#messageBox').append("</ul></div>");
		}

		console.log(plates);
		renderPlates();
	});

	$('body').on('click', '.deletePlate', function(){
		plates.splice($(this).attr('index'),1);
		renderPlates();
	});

	$('#btnAddMenu').click(function(){
		var menuName = $('#menuName').val();

		$('#messageBox').html('');
		if(menuName == ""){
			$('#messageBox').append("<div id='message' class='error'>The menu name is required<ul>");
			$('#messageBox').append("</ul></div>");
			return;
		}

		$.ajax({
            type: 'POST',
            url: 'addMenu',
            data: {name: menuName, plates:JSON.stringify(plates)},
            dataType: 'json',
            success: function(encoded_json){

            	if(encoded_json.status == "200"){
            		$('#messageBox').append("<div id='message' class='success'>"+encoded_json.message+"<ul>");
					$('#messageBox').append("</ul></div>");
					plates = [];
					renderPlates();

					$('input[type="text"]').val('');
            	}else{
            		$('#messageBox').append("<div id='message' class='error'>"+encoded_json.message+"<ul>");
					$('#messageBox').append("</ul></div>");
            	}
            }
        });
	});
});