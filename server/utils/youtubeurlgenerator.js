const ytdl = require("ytdl-core");
const Video = require("../models/Video");

module.exports = {
    yttourl: (yturl, id)=>{
        try{
           var quality  = "high"
            ytdl.getInfo(yturl)
               .then(async (info)=>{
                   var formats = info.formats.filter(
                       (format) => format.hasVideo && format.hasAudio
                   );
                   var video =
                   quality === "lowest" ? formats[formats.findIndex(x=>x.qualityLabel==="360p")] : formats[formats.findIndex(x=>x.qualityLabel==="720p")];

                   await Video.findByIdAndUpdate(id,{
                    $set: {url: video.url}
                   })
            })
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: err
            })
        }
    }
}