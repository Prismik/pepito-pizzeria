function validateLenghtMin(inputId, validationValue, errormessage){
	document.getElementById(inputId).setCustomValidity(errormessage);
	document.getElementById(inputId).addEventListener("keyup", function(e) {
		if(document.getElementById(inputId).value.length >= validationValue){
			document.getElementById(inputId).setCustomValidity("");
		}else{
			document.getElementById(inputId).setCustomValidity(errormessage);
		}
	}, false);
}

function validateRegex(inputId, regex, errormessage){
	document.getElementById(inputId).setCustomValidity(errormessage);
	document.getElementById(inputId).addEventListener("keyup", function(e) {
		var expression = new RegExp(regex);
		if(expression.test(document.getElementById(inputId).value)){
			document.getElementById(inputId).setCustomValidity("");
		}else{
			document.getElementById(inputId).setCustomValidity(errormessage);
		}
	}, false);
}

function validatePassword(passwordId1, passwordId2, errormessage){
	document.getElementById(passwordId2).setCustomValidity(errormessage);
	document.getElementById(passwordId1).addEventListener("keyup", function(e) {
		if(document.getElementById(passwordId1).value == document.getElementById(passwordId2).value){
			document.getElementById(passwordId2).setCustomValidity("");
		}else{
			document.getElementById(passwordId2).setCustomValidity(errormessage);
		}
	}, false);
	
	document.getElementById(passwordId2).addEventListener("keyup", function(e) {
		if(document.getElementById(passwordId1).value == document.getElementById(passwordId2).value){
			document.getElementById(passwordId2).setCustomValidity("");
		}else{
			document.getElementById(passwordId2).setCustomValidity(errormessage);
		}
	}, false);
}

function validateEmail(inputId, errormessage){
	document.getElementById(inputId).setCustomValidity(errormessage);
	document.getElementById(inputId).addEventListener("keyup", function(e) {
		var mail=document.getElementById(inputId).value;
		var at=mail.indexOf("@");
		var dot=mail.lastIndexOf(".");
		if (at<1 || dot<at+2 || dot+2>=mail.length)
		{
    		document.getElementById(inputId).setCustomValidity(errormessage);
		}else{
    	    document.getElementById(inputId).setCustomValidity("");
		}
	}, false);
}

function addAddressInput() {
    var lastdiv = $(".addressDiv").last();
    var num = lastdiv.children("input").attr("data-num") + 1

    var newdiv = lastdiv.clone();
    newdiv.children("label").html(" ")
    newdiv.children("input").first().attr("data-num", num).attr(value="");
    newdiv.children("input").last().attr("data-num", num).attr(value="");
    newdiv.children("button").attr("onclick","delAddressInput("+num+")").html("Delete");
   
    lastdiv.after(newdiv);
}

function delAddressInput(num) {
    var div = $('input[data-num="'+num+'"]').parent();
    div.remove();
}