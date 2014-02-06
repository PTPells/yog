function EmailCapture (id) {
    $root = $(id);
    $input = $($root.find('input'));
    $button = $($root.find('button'));
    $message = $($root.find('.message'));

    $button.click(sendEmail);
    $input.keypress(function (event) {
        /* Act on the event */
    });

    function sendEmail () {
        var data = { email: $input.val() };
        if (!data.email) {
            showMessage("You didn't enter an email address.", 'failure');
            return false;
        }
        $.post('/email', data, function(res, textStatus, xhr) {
            if (res.success) {
                console.log(res.data);
                showMessage("Success! Please make sure to click the link in the confirmation email.", 'success');
            } else {
                console.log(res.message);
                showMessage(res.message, 'failure');
            }
        });
    }

    function showMessage (msg, type) {
        $message.addClass(type).text(msg).show();
    }
}

function init () {
    new EmailCapture("#email_capture");
}

$(document).ready(init);