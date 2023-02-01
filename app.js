const express = require('express');
const ytdl = require('ytdl-core')
const app = express();

app.get('/', function(req, res) {
    const { url } = req.query;
    res.header("Content-Disposition", 'attachmentt; filename="video.mp3"')
    return ytdl(url).pipe(res);
    //node app.js -- starta a aplicacao
    //http://localhost:3000/?url=https://www.youtube.com/watch?v=R_4Clufmtq8 -- exemplo

})

app.listen(3000);


