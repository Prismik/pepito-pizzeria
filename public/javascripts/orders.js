$(document).ready(function() {
    $('select[name="restaurant"]').on('change',function() {
        $('select[name="plate"]').html("<option value>Select a plate</option>");
        $('select[name="menu"]').html("<option value>Select a menu</option>");

        if($(this).val() != ""){
            $.ajax({
                type: 'POST',
                data: {restaurantid:$(this).val()},
                url: 'updateMenus',
                dataType: 'json',
                success: function(encoded_json){
                    $('select[name="menu"]').html("<option value>Select a menu</option>");
                    $.each(encoded_json, function(i, item) {
                        $('select[name="menu"]').append("<option value='"+encoded_json[i]._id+"'>"+encoded_json[i].name+"</option>");
                    });
                }
            }); 
        }
    });

    $('select[name="menu"]').on('change',function() {
        $('select[name="plate"]').html("<option value>Select a plate</option>");
        if($(this).val() != ""){
            $.ajax({
                type: 'POST',
                url: 'updatePlates',
                data: {menuid:$(this).val()},
                dataType: 'json',
                success: function(encoded_json){
                    $('select[name="plate"]').html("<option value>Select a plate</option>");
                    $.each(encoded_json, function(i, item) {
                        $('select[name="plate"]').append("<option value='"+encoded_json[i]._id+"'>"+encoded_json[i].name+"</option>");
                    });
                }
            }); 
        }
    });
});