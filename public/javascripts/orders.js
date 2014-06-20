$(document).ready(function() {
    var orders = [];

    $('#plateSelection').hide();

    $('select[name="restaurant"]').on('change',function() {
        $('select[name="plate"]').html("<option value>Select a plate</option>");
        $('select[name="menu"]').html("<option value>Select a menu</option>");
        
        if($(this).val() != "") {
            $.ajax({
                type: 'POST',
                data: {objId:$(this).val()},
                url: 'updateMenus',
                dataType: 'json',
                success: function(encoded_json) {
                    $('select[name="menu"]').html("<option value>Select a menu</option>");
                    $.each(encoded_json, function(i, item) {
                        $('select[name="menu"]').append(
                            ["<option value='",
                            encoded_json[i]._id ,
                            "'>",
                            ,encoded_json[i].name,
                            "</option>"].join(""));
                    });
                }
            }); 
        } 
        else
            $('#plateSelection').fadeOut("slow");
    });

    $('select[name="menu"]').on('change',function() {
        $('select[name="plate"]').html("<option value>Select a plate</option>");
        $('#plateSelection').hide();
        if($(this).val() != ""){
            $.ajax({
                type: 'POST',
                url: 'updatePlates',
                data: {objId:$(this).val()},
                dataType: 'json',
                success: function(encoded_json){
                    $('select[name="plate"]').html("<option value>Select a plate</option>");
                    $.each(encoded_json, function(i, item) {
                        $('#plateSelection').fadeIn("slow");
                        $('select[name="plate"]').append("<option value='"
                            + encoded_json[i]._id + "'>" 
                            + encoded_json[i].name + " - "
                            + encoded_json[i].description + " ("
                            + encoded_json[i].price + ")" + "</option>");
                    });
                }
            }); 
        }
    });

    $('button[name="addToOrder"]').on('click',function() {
        if($('select[name="restaurant"]').val() != "" &&
            $('select[name="menu"]').val() != "" &&
            $('select[name="plate"]').val() != "") {
            $.ajax({
                type: 'POST',
                url: 'getPlate',
                data: {objId:$('select[name="plate"]').val()},
                dataType: 'json',
                success: function(plate) {
                    orders.push({quantity:$('input[name="quantity"]').val(),plate:plate});
                    $('table#order tbody').html('');
                    $.each(orders, function(i, item) {
                        $('table#order tbody').append("<tr><td class='name'>"
                            + item.plate.name
                            + "</td><td class='quantity'>"
                            + item.quantity
                            + "</td><td class='unitprice'>"
                            + item.plate.price
                            + "$</td><td class='price'>"
                            + parseFloat(item.quantity*item.plate.price).toFixed(2)
                            + "$</td></tr>");
                    });

                    $('input[name="arrayOrder"]').val(JSON.stringify(orders));
                }
            });
        } 
        else
            alert('Missing some parameters');
    }); 

    $("#submitForm").submit(function(e) {
        if($('input[name="arrayOrder"]').val() != ""){
            return true;
        }else{
            alert("The order cannot be empty!");
            e.preventDefault();
        }
        return false; //is superfluous, but I put it here as a fallback
    });
});

