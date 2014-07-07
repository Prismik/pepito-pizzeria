$(document).ready(function() { // ON READY

$('#updateAccTypes').click(function() {
    $.ajax({
        type: 'POST',
        data: { data: buildUsers() },
        url: 'users/changeAccountType',
        dataType: 'json',
        success: function(data) {
            console.log('Success');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
});

}); // ON READY

function buildUsers() {
    users = [];
    $('.accType').each(function () {
        var acc= $(this);
        var id= acc.attr('id');
        var type= acc.find('select').val()
        users.push({id: id, type: type});;
    })

    return users;
}
