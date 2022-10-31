const { default: mongoose } = require('mongoose')
const PlayList = require('../models/PlayList')
const Video = require('../models/Video')
const {createPlayistValidation, chapterValidation} = require('../utils/validation')
module.exports= {
    createPlayList: async(req, res, next)=>{
        // Validate Request data
        const {error} = createPlayistValidation(req.body)
        if(error) return res.status(400).json({status:'fail', message: error.details[0].message})

        // Check Playlist name existes
        const nameExist = await PlayList.findOne({name: req.body.name})
        if(nameExist) return res.status(400).json({status:'fail', message: "Playlist name already exists"})


        try{
            const newPlayList = await PlayList.create(req.body)
            res.status(200).json({
                status: 'Successfull',
                result: {
                    playlist: newPlayList,
                },
            })
        }catch(err){
            next(err)
        }
    },
    getAllPlaylist: async(req,res,next)=>{
        try{
            const playlist = await PlayList.find({})
            res.status(200).json({
                status: 'Successfull',
                result: {
                    playlist
                }, 
            })
        }catch(err){
            next(err)
        }
    },
    getOnePlaylist: async(req,res,next)=>{
        try{
            console.log(req.params.playlistId)
            const playlist = await PlayList.findById(req.params.playlistId)
            .populate({
                path: 'chapters',
                populate:{
                    path: 'videos',
                    model: 'Video' 
                }
            });
            if(!playlist) return res.status(404).json({status:'fail', message:"play list not found!"})


            res.status(200).json({
                status: 'Successfull',
                result: {
                    playlist
                }, 
            })
        }catch(err){
            next(err)
        }
    },

    deletePlaylist: async(req, res, next)=>{
        try{
            const playlist = await PlayList.find({_id:req.params.playlistId})
            if(!playlist) return res.status(404).json({status:'fail', message:"play list not found!"})
            
            playlist[0].chapters.map((chapter)=>{
                chapter.videos.map( async (video)=>{
                    await Video.findByIdAndDelete(video)
                })
            })

            await PlayList.findByIdAndDelete(req.params.playlistId)

            res.status(200).json({
                status: 'Successfull',
                message: "Playlist deleted successfuly"
            })

        }catch(err){
            next(err)
        }
    },
    addChapter: async(req, res, next)=>{
        
        const {error} = chapterValidation(req.body)
        if(error) return res.status(400).json({status:'fail', message: error.details[0].message})
        
        const playlist = await PlayList.findById(req.params.playlistId)
        if(!playlist) return res.status(404).json({status: "falil", message: "play list not found!"})
        let number = false
        let title = false
        playlist.chapters.map((chapter)=>{
            if(req.body.number == chapter.number){
                number = true
            }
            else if(req.body.title == chapter.title){
                title = true
            }
        })
        if(number){
            return res.status(400).json({status:'fail', message: "Chapter number already exists"})
        }
        if(title){
            return res.status(400).json({status:'fail', message: "Chapter title already exists"})
        }
        try{    
            // const newPlayList = playlist.chapters.push(req.body)
            const newPlayList  = await PlayList.findByIdAndUpdate(req.params.playlistId,
                {$push:{chapters: req.body}},
                {new:true}
            )
            res.status(200).json({
                status: 'Successfull',
                result:{
                    newPlayList
                }                
            })
        }catch(err){
            next(err)
        }
    }
}