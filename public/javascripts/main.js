function EmailCapture (id) {
    $root = $(id);
    $input = $($root.find('input'));
    $button = $($root.find('button'));
    $message = $($root.find('.message'));

    $button.click(function () {
        sendEmail();
        _gaq.push('trackEvent', 'Email Form', 'Submit', 'Button Press');
    });
    $input.focus(function (event) {
        _gaq.push('trackEvent', 'Email Form', 'Input Focus');
    });
    $input.keypress(function (event) {
        if (event.keycode===13) {
            sendEmail();
            _gaq.push('trackEvent', 'Email Form', 'Submit', 'Return Key Press');
        }
    });

    function sendEmail () {
        var data = { email: $input.val() };
        if (!data.email) {
            showMessage("You didn't enter an email address.", 'failure');
            _gaq.push('trackEvent', 'Email Form', 'Failure', 'No Input');
            return false;
        }
        $.post('/email', data, function(res, textStatus, xhr) {
            if (res.success) {
                showMessage("Success! Please make sure to click the link in the confirmation email.", 'success');
                _gaq.push('trackEvent', 'Email Form', 'Success', data.email);
            } else {
                showMessage(res.message, 'failure');
                _gaq.push('trackEvent', 'Email Form', 'Failure', data.email);
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
