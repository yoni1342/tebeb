const express = require('express')
const usetube = require('usetube')
const createError = require("../error");
const PlayList = require('../models/PlayList')
const Video = require('../models/Video')
const mongoose = require('mongoose')
const {videoValidation} = require('../utils/validation');
const ytdl = require('ytdl-core');
const https = require('https')
const dns = require('dns')

const {yttourl} = require('../utils/youtubeurlgenerator')
module.exports= {
    addvideo: async(req, res, next)=>{
        // Validate The Video Data
        const {error} = videoValidation(req.body)
        if(error) return res.status(400).json({status:'fail', message: error.details[0].message})
        
        const {url, playlist_id, grade, title, chapter_number} = req.body
        const playlist = await PlayList.findById(playlist_id)
        
        if(!playlist) return res.status(404).json({status: "falil", message: "Playlist not found!"})
        let urlExist = false
        let titleExist = false
        
        playlist.chapters[chapter_number-1].videos.map((video)=>{
            if(video.yturl == url){
                urlExist = true
            }
            if(video.title == title){
                titleExist = true
            }
        })

        if(titleExist){
            return res.status(400).json({status:'fail', message: "Video title already exists"})
        }
        if(urlExist){
            return res.status(400).json({status:'fail', message: "Video url already exists"})
        }
        
        try{
            if (playlist.grade != grade){
                return res.status(404).json({
                    status:"fail",
                    message:"This video is not suppose to this grade"
                })
            }
            let newvideo = await Video.create({
                title,
                grade,
                playlist_id,
                yturl:url,
                chapter_number
            })
            await PlayList.findOneAndUpdate({"chapters.number":chapter_number, _id:playlist_id},{
                $push:{
                    "chapters.$.videos":newvideo
                }
            })
            
            res.status(200).json({
                status: 'Successfull',
                result:{
                    newvideo
                }                
            })
    
        }catch(err){
            next(err)
        }
    },
    getOneVideo: async(req, res, next)=>{
        try{
            const videoId = req.params.videoId
            const video = await Video.findById(videoId)
            if(!video)return res.status(404).json({status:'fail',message:'Video not found!'})
            res.status(200).json({
                status: 'Successfull',
                result:{
                    video
                }                
            })
        }catch(err){
            next(err)
        }

    },
    getAllVideos: async(req, res, next)=>{
        try{
            const videos = await Video.find({})
            if(!videos) return res.status(404).json({status:"fail", message: "No video has found"})
            res.status(200).json({
                status: 'Successfull',
                result:{
                    videos
                }    
            })
        }catch(err){
            next(err)
        }
    }, 
    deleteVideo : async (req, res, next)=>{
        try{
            const video = await Video.findById(req.params.videoId)
            if(!video) return res.status(404).json({status:"fail", message: "No video has found"})

            await PlayList.findOneAndUpdate({"chapters.number":video.chapter_number, _id:video.playlist_id},{
                $pull:{
                    "chapters.$.videos":mongoose.Types.ObjectId(video._id)
                }
            })
            await Video.findByIdAndDelete(req.params.videoId)
            res.status(200).json({
                status: 'Successfull',
                message: "Video has been deleted successfuly"
            })
        }catch(err){
           next(err)
        }

    },
    updateVideo: async (req, res, next)=>{
        try{
            const video = await Video.findById(req.params.videoId)
            if(!video) return res.status(404).json({status:"fail", message: "No video has found"})
            const updatevideo = await Video.findByIdAndUpdate(req.params.videoId,
                {$set:req.body},
                {new:true}
            )
            return res.status(200).json({
                status: 'Successfull',
                result:{
                    updatevideo
                }    
            })
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: err
            })
        }
        
    },
    playVideo: async(req, res, next)=>{

       try{
        const video = await Video.findById(req.params.videoId)
           if(!video) return res.status(404).json({status:"fail", message: "No video has found"})
        if(!video.url){
           var quality  = "high"
            ytdl.getInfo(video.yturl)
                .then((info)=>{
                    var formats = info.formats.filter(
                        (format) => format.hasVideo && format.hasAudio
                    );
                    var video =
                    quality === "lowest" ? formats[formats.findIndex(x=>x.qualityLabel==="360p")] : formats[formats.findIndex(x=>x.qualityLabel==="720p")];
    
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.setHeader('Transfer-Encoding', 'chunked');
                 //    console.log(video.url)
                     res.redirect(video.url);
                    
                     // https.get(video.url, (stream) => {
                     //         stream.pipe(res);
                     // });
                })

        }
        if(video.url){
            dns.lookup("https://rr8---sn-xuj-5qq6.googlevideo.com/videoplayback?expire=1668702951&ei=hw52Y5GBMpr5xwKTw7XYCg&ip=196.188.180.171&id=o-AN_Har9CJf4VsLf837eJgZ7UpgqucrUDu4lJgHdcjPLw&itag=22&source=youtube&requiressl=yes&mh=dN&mm=31%2C29&mn=sn-xuj-5qq6%2Csn-hju7en7r&ms=au%2Crdu&mv=m&mvi=8&pl=24&initcwndbps=150000&vprv=1&mime=video%2Fmp4&ns=IpSfbfL5EOvNPe9NDWUR4OQJ&cnr=14&ratebypass=yes&dur=1929.090&lmt=1590069642934506&mt=1668680978&fvip=4&fexp=24001373%2C24007246&c=WEB&txp=6211222&n=OtpHpvbj5dFQRQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAOALJkG9kx43W3A2pqJgSLbtYPqV3vahWYGBCN-Xon2gAiEA95jGc4uGcF9oyPE6JW1Md9XdJuxpAbAxFw4ezzMiqYM%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAPwiJvSI5aj3v4CXfilVNrAM6iXjWsDVw17KYxc_dAq-AiEAm7Q77TiInJqGc73_UlvUVMakZT4xAgzhfCpAPiNSGWo%3D", (err,value)=>{
                if(err){
                    console.log(err)
                    var quality  = "high"
                ytdl.getInfo(video.yturl)
                    .then((info)=>{
                        var formats = info.formats.filter(
                            (format) => format.hasVideo && format.hasAudio
                        );
                        var video =
                        quality === "lowest" ? formats[formats.findIndex(x=>x.qualityLabel==="360p")] : formats[formats.findIndex(x=>x.qualityLabel==="720p")];
        
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        res.setHeader('Transfer-Encoding', 'chunked');
                     //    console.log(video.url)
                         res.redirect(video.url);
                        
                         // https.get(video.url, (stream) => {
                         //         stream.pipe(res);
                         // });
                    })
                }
                else{
                    res.redirect(video.url)
                }
            })
        }
        //    var quality  = "high"
        await yttourl(video.yturl, video._id)
       }catch(err){
            res.status(401).json({
                status: 'fail',
                message: err
            })
       }
    }
}