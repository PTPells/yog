var express = require("express"),
    logfmt = require("logfmt"),
    MailChimpAPI = require("mailchimp").MailChimpAPI,
    mc_api,
    app = express(),
    port;

mc_api = new MailChimpAPI(process.env.MAILCHIMP_API_KEY, { version: 2.0 });

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
