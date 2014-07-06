$(document).ready(function() { // ON READY

$('#updatePerms').click(function() {
    $.ajax({
        type: 'POST',
        data: {permissions:$('#permissions').val()},
        url: 'permissions/update',
        dataType: 'json',
        success: function(data) {
            console.log('Success');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});


}); // ON READY

function initPerms(ids) {
    for (var i = 0; i != ids.length; ++i) {
        $('input[name="'+ids[i]+'" done="false"]').prop('checked', 'checked');
    }
}