const express = require("express");
const color = require("colors")
require("dotenv").config()
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
const {connect_db} = require('./config/db')

schedule.scheduleJob('0 * */1 * *', async()=>{
    const videos =  await Video.find({})
    videos.map( async (video)=>{
        await yttourl(video.yturl, video._id)
    })
})  

const app = express();

app.use(cors({origin: true, credentials: true}));



app.use('/confirmation', authRouter)
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
    connect_db()
    console.log("server is runing")
})