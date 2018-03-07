const express = require("express");
const configApp = require("config").app;
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let youtubeRouter = require('./server/youtube/youtube.router');

app.use(function (req, res, next) {
    // console.log("Middleware");
    next()
});

app.use('/yt', youtubeRouter);

app.listen(configApp.port || 3000, function (err) {
    if (err) {
        console.log("Error while starting app : ", err);
    } else {
        console.log("Server started at : ", configApp.port || 3000);
    }
});