const express = require("express");
const fs = require('fs');
let router = express.Router();
let model = require('./youtube.model');
let configApp = require("config").app;
let path = require('path');

router.get("/", (req, res) => {
    res.send("Hello youtube!");
});

router.get("/stream/:videoId", function (req, res) {
    model.getMp3Stream(req.params.videoId, res);
});

router.get("/download/:videoId", function (req, res) {
    model.downloadMp3(req.params.videoId, function (file) {
        res.sendFile(file.path);
        fs.unlinkSync(file.path);
    });
});

module.exports = router;