const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

app.get('/test.mp4', (req, res) => {
    ffmpeg(path.resolve(__dirname, 'example.mkv'))
        .audioCodec('aac')
        .videoCodec('libx264')
        .format('mp4')
        .outputOptions('-codec copy')
        .on('start', function (cmd) {
            console.log('Started: ', cmd);
        })
        .on('end', function () {
            // fs.createReadStream(path.resolve(__dirname, 'test.mp4'))
            //     .pipe(res)
            console.log('Done')
        })
        .on('error', function (err) {
            console.warn(err)
        })
        .pipe(res)
    // .save('test.mp4')
})

app.get('/index.html', (req, res) => {
    fs.createReadStream(path.resolve(__dirname, 'index.html'))
        .pipe(res)
})

app.listen(3000, () => {
    console.log('Listening')
})
