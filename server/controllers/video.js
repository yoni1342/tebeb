const express = require('express')
const usetube = require('usetube')
const createError = require("../error");
const PlayList = require('../models/PlayList')
const Video = require('../models/Video')
const mongoose = require('mongoose')
const {videoValidation} = require('../utils/validation');
const ytdl = require('ytdl-core');
const https = require('https')

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
        else{
            res.redirect(video.url)
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