function verifyRestaurantAddress() {
    $(document).ready(function() {
        $("#restaurantAddress").change(function() {
            var address = $("#restaurantAddress").val();
            $.ajax({
                type: 'POST',
                url: '/restaurants/verifyAddress',
                data: {validateAddress:address},
                success: function(validation) {
                    if (validation)
                        document.getElementById("restaurantAddress").setCustomValidity("");
                    else
                        document.getElementById("restaurantAddress").setCustomValidity("This address is already used");
                }
            });
        }); 
    });
}

var manageActivated = false;
function initManageRestaurants() {
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