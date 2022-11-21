const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth")
const playlistRouter = require('./routes/playlist')
const videoRouter = require('./routes/video');
const questionRouter = require('./routes/question');
const User = require("./models/User");
const jwt = require('jsonwebtoken')
const cors = require('cors')
const schedule = require("node-schedule")
const Video = require('./models/Video');
const {yttourl} = require('./utils/youtubeurlgenerator')

schedule.scheduleJob('0 * */1 * *', async()=>{
    const videos =  await Video.find({})
    videos.map( async (video)=>{
        await yttourl(video.yturl, video._id)
    })
})  

const app = express();

app.use(cors({origin: true, credentials: true}));

const connect = ()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/tibeb').then(()=>{
        console.log("Conneted to Mongo")
    }).catch(err=>{throw err})
}

app.get('/confirmation/:token', async(req, res)=>{
    try{
        const verfied = jwt.verify(req.params.token, process.env.JWT)
        const user = await User.findById(verfied.id)
        if(!user) return res.status(400).json({status:"fail", message:"Invalid Token"})
        await User.findByIdAndUpdate(verfied.id, {
            $set:{verified:true}
        })

        return res.redirect(`http://localhost:3000/signin`)
    }catch(err){
        res.send(err)
    }
})
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/playlist', playlistRouter)
app.use('/api/video', videoRouter)
app.use('/api/question', questionRouter)

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(process.env.PORT, ()=>{
    connect()
    console.log("server is runing")
})