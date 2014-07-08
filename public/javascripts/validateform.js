function validateLengthMin(inputId, validationValue, errormessage){
	var val = function(e) {
		if(document.getElementById(inputId).value.length >= validationValue)
			document.getElementById(inputId).setCustomValidity("");
		else
			document.getElementById(inputId).setCustomValidity(errormessage);
	};
	
	val();
	document.getElementById(inputId).addEventListener("keyup", val, false);
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
	document.getElementById(inputId).addEventListener("keyup",val, false);
}

function validatePassword(passwordId1, passwordId2, errormessage){
	var val = function(e) {
		if(document.getElementById(passwordId1).value == document.getElementById(passwordId2).value)
			document.getElementById(passwordId2).setCustomValidity("");
		else
			document.getElementById(passwordId2).setCustomValidity(errormessage);
	}

	val();
	document.getElementById(passwordId1).addEventListener("keyup", val, false);
	document.getElementById(passwordId2).addEventListener("keyup", val, false);
}

function validateEmail(inputId, errormessage){
	var val = function(e) {
		var mail=document.getElementById(inputId).value;
		var at=mail.indexOf("@");
		var dot=mail.lastIndexOf(".");
		if (at<1 || dot<at+2 || dot+2>=mail.length)
    		document.getElementById(inputId).setCustomValidity(errormessage);
		else
    	    document.getElementById(inputId).setCustomValidity("");
	};
	
	val();
	document.getElementById(inputId).addEventListener("keyup", val, false);
}

function addAddressInput() {
    var lastdiv = $(".addressDiv").last();
    var num = parseInt(lastdiv.children("input").attr("data-num")) + 1

    var newdiv = lastdiv.clone();
    newdiv.children("label").html(" ")
    newdiv.children("input").first().val("");
    newdiv.children("input").last().val("");
    newdiv.children("button").attr("onclick","delAddressInput("+num+")").html("Delete");
   
    lastdiv.after(newdiv);
}

function delAddressInput(num) {
    var div = $('input[data-num="'+num+'"]').parent();
    div.remove();
}