const ffmpeg = require("ffmpeg")
const ytdl = require("ytdl-core")
const fs = require("fs")

const sendFile = (res, ref, base, init, size) => 
    ytdl(ref)
        .pipe(fs.createWriteStream(`${base}.mp4`))
        .on("finish", () => 
            new ffmpeg(`./${base}.mp4`).then(
                (video) => {
                  console.log('starttttt video');
                  video
                    .setVideoStartTime(init)
                    .setVideoDuration(size)
                    //.setVideoSize("1920x1080", true, false)
                    .setVideoAspectRatio("9:16")
                    .save(`./${base}_cut.mp4`, (error,file) => {
                        if (!error){
                        console.log("tudo certo, baixando video e cortando.... " + file);
                        fs.createReadStream(`./${base}_cut.mp4`).pipe(res)
                        } else {
                            console.log(error)
                            res.send(error);
                        }
                    })
                },
                (err)=> {
                    console.log("Error: " + err);
                    res.send(err);
                }
            )
        );




        
    module.exports = sendFile;

