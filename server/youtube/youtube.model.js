const fs = require('fs');
const ytdl = require('ytdl-core');
const response = require('../response');
const configApp = require('config').app;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

let getMp3Stream = function (videoId, stream) {
    let url = "https://youtube.com/watch?v=" + videoId;
    ytdl(url, { filter: "audioonly", quality: 'highestaudio' }).pipe(stream);
};

let downloadMp3 = function (videoId, cb) {
    let time = Date.now();
    let file = {
        path : path.join(configApp.tmpFolder, time + '-' + videoId + '.mp3')
    };
    let url = "https://youtube.com/watch?v=" + videoId;
    let stream = ytdl(url, { filter: "audioonly", quality: 'highestaudio' });
    ffmpeg(stream).audioBitrate(320).save(file.path).on('progress', function (p) {
        console.log(p.targetSize + " kb downloaded!");
    }).on('end', function () {
        cb(file);
    });
};

module.exports = {
    getMp3Stream: getMp3Stream,
    downloadMp3: downloadMp3
};
