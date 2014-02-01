function EmailCapture (id) {
    $root = $(id);
    $input = $($root.find('input'));
    $button = $($root.find('button'));
    $message = $($root.find('.message'));

    $button.click(function () {
        var data = { email: $input.val() };
        $.post('/email', data, function(res, textStatus, xhr) {
            showMessage(res);
        });
    });

    function showMessage (res) {
        var msg;
        if (res.success) {
            console.log(res.data);
            msg = "Please make sure to click the link in the confirmation email.";
        } else {
            console.log(res.message);
            msg = res.message;
        }
        $message.text(msg).show();
    }
}

function init () {
    new EmailCapture("#email_capture");
}

$(document).ready(init);