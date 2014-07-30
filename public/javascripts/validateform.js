function validateLengthMin(inputId, validationValue, errormessage){
	var val = function(e) {
		if(document.getElementById(inputId).value.length >= validationValue)
			document.getElementById(inputId).setCustomValidity("");
		else
			document.getElementById(inputId).setCustomValidity(errormessage);
	};
	
	val();
	document.getElementById(inputId).addEventListener("change", val, false);
}

function validateRegex(inputId, regex, errormessage){
	var val = function(e) {
		var expression = new RegExp(regex);
		if(expression.test(document.getElementById(inputId).value))
			document.getElementById(inputId).setCustomValidity("");
		else
			document.getElementById(inputId).setCustomValidity(errormessage);
	};

	val();
	document.getElementById(inputId).addEventListener("change",val, false);
}

function validatePassword(passwordId1, passwordId2, errormessage){
	var val = function(e) {
		if(document.getElementById(passwordId1).value == document.getElementById(passwordId2).value)
			document.getElementById(passwordId2).setCustomValidity("");
		else
			document.getElementById(passwordId2).setCustomValidity(errormessage);
	}

	val();
	document.getElementById(passwordId1).addEventListener("change", val, false);
	document.getElementById(passwordId2).addEventListener("change", val, false);
}

function validateEmail(inputId, errormessage){
	var val = function(e) {
		var mail=document.getElementById(inputId).value;
		var at=mail.indexOf("@");
		var dot=mail.lastIndexOf(".");
		document.getElementById("inputUserEmail").setCustomValidity("");
		if (at<1 || dot<at+2 || dot+2>=mail.length)
		{
			document.getElementById(inputId).setCustomValidity(errormessage);
		}

    	var emailaddress = $("#inputUserEmail").val();
    	$.ajax({
            type: 'POST',
            url: '/users/verifyEmail',
            data: {validateEmail:emailaddress},
            success: function(validation){
            	if(!validation)
            		document.getElementById("inputUserEmail").setCustomValidity("This email address is already used");
        	}
    	});
        
    }
	val();
	document.getElementById(inputId).addEventListener("change", val, false);
}

function validateAddress(addressInputId, postalCodeInputId){
	var val = function(e) {
		var addressInput = document.getElementById(addressInputId).value+", "+document.getElementById(postalCodeInputId).value;
		GMaps.geocode({
			address: addressInput,
			callback: function(results, status) {
				console.log(results);
		  		if (status == 'OK') {
		  			if (results[0]['types'][0] == "street_address") {
document.getElementById(addressInputId).setCustomValidity("");
document.getElementById(addressInputId).value=results[0]['address_components'][0]['long_name']+" "
+results[0]['address_components'][1]['long_name']+", "+results[0]['address_components'][4]['long_name']+", "
+results[0]['address_components'][2]['long_name'];
		  			}
		  			
				}else{
					document.getElementById(addressInputId).setCustomValidity("This address with this postal code is not recognized");
				}
			}
		});
	}
	
	val();
	document.getElementById(postalCodeInputId).addEventListener("change", val, false);
	document.getElementById(addressInputId).addEventListener("change", val, false);
}

function addAddressInput() {
    var lastdiv = $(".addressDiv").last();
    var num = parseInt(lastdiv.children("input").attr("data-num")) + 1;

    var newdiv = lastdiv.clone();
    newdiv.children("label").html(" ");
    newdiv.children("input").first().attr("data-num",num);
    newdiv.children("input").last().attr("data-num",num);
    newdiv.children("input").first().val("");
    newdiv.children("input").last().val("");
    newdiv.children("button").attr("onclick","delAddressInput("+num+")").html("Delete");
   
    lastdiv.after(newdiv);
}

function delAddressInput(num) {
    var div = $('input[data-num="'+num+'"]').parent();
    div.remove();
     $(this).parent().remove();
}