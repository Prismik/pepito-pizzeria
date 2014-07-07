$(document).ready(function() { // ON READY

$('#updatePerms').click(function() {
    var accJson= buildAccPermsJson();
    $.ajax({
        type: 'POST',
        data: { permissions:$('#permissions').val(), accounts: accJson },
        url: 'permissions/update',
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

function initPerms(ids) {
    for (var i = 0; i != ids.length; ++i)
        $('input[value="'+ids[i]._id+'"][done="false"]').attr('checked', true);
    
    $('input[done="false"]').attr('done', 'true');
}

function buildAccPermsJson() {
    var hash = {}
    $('.account').each(function () {
        var perms = [];
        $(this).find('.accPermissions').find('input:checked').each(function() {
            perms.push($(this).val());
        });

        hash[$(this).find(">:first-child").attr('id')]= perms;
    });

    return hash;
}