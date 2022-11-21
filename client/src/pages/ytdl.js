import ytdl from "ytdl-core";
const toArray = require("stream-to-array");

export default async function handler(req, res) {
    try{
        const stream = ytdl("mzB1VGEGcSU",{
            filter: "videoandaudio",
            quality: "highestaudio"
        });
        
        const parts = await toArray(stream)
        const buffers = parts.map((part)=>
        Buffer.isBuffer(part)?part:Buffer.from(part)
        )
        const compressedBuffer = Buffer.concat(buffers);
        const total = compressedBuffer.length;

        if(stream.headers && stream.headers.range){
            const range = req.headers.range;
            const parts = range.replace(/bytes=/, "").split("-");
            const partialstart = parts[0];
            const partialend = parts[1];

            const start = parseInt(partialstart, 10);
            const end = partialend ? parseInt(partialend, 10) : total - 1;
            const chunksize = end - start + 1;

            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "audio/mpeg",
            });

            stream.pipe(res);
        }else{
            res.writeHead(200, {
                "Content-Length": total,
                "Content-Type": "video/mp4",
              });
              stream.pipe(res);
        }
    } catch (err) {
        console.log(err);
      }
}