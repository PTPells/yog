var express = require("express"),
    path = require("path"),
    logfmt = require("logfmt"),
    MailChimpAPI = require("mailchimp").MailChimpAPI,
    mc_api,
    app = express(),
    port;

mc_api = new MailChimpAPI(process.env.MAILCHIMP_API_KEY, { version: 2.0 });

app.use(logfmt.requestLogger());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
