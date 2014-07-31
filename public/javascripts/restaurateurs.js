
var manageActivated = false;
function initManageRestaurateurs() {
    $(document).ready(function() {
        $('[id="manageOption"]').hide();
    });
}

function activateManageOption() {
    if (manageActivated == false) {
        $('[id="manageOption"]').show();
        manageActivated = true;
    } else {
        $('[id="manageOption"]').hide();
        manageActivated = false;
    }
}

function checkRestaurateur(){
    var restaurateur = document.getElementById('restaurateur').value;
    if (restaurateur == "Without restaurateur")
        return (confirm("Are you sure you want to create a restaurant without restaurateur?"));
    else
        return true;
}