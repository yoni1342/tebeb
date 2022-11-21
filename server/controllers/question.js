const mongoonse = require('mongoose')
const PlayList = require('../models/PlayList')
const Question = require('../models/Question')
const Video = require('../models/Video')
const {questionValidation} = require('../utils/validation')
module.exports = {
    creatQuestion: async (req,res,next)=>{
         // Validate Request data
         const {error} = questionValidation(req.body)
         if(error) return res.status(400).json({status:'fail', message: error.details[0].message})
         try{
             
              if(req.body.playlist_id){
                 const playlist = await PlayList.findById(req.body.playlist_id)
                 if(!playlist) return res.status(400).json({status:'fail',message: "Playlist not founded"})
              }
              if(req.body.video_id){
                 const video = await Video.findById(req.body.video_id)
                 if(!video) return res.status(400).json({status:'fail',message: "Playlist not founded"})
              }
            const newQuestion = await Question.create(req.body)
            res.status(200).json({
                status: 'Successfull',
                result: {
                    question: newQuestion,
                },
            })
         }catch(err){
            next(err)
         }
    },
    getAllQuestions: async(req, res, next)=>{
        try{
            const question = await Question.find({})
            res.status(200).json({
                status: 'Successfull',
                result: {
                    questions: question
                }, 
            })
        }catch(err){
            next(err)
        }
    },
    getOneQuestion: async(req, res, next)=>{
        try{
            const id = req.params.id
            const question = await Question.findById(id)
            if(!question) return res.status(404).json({status:'fail', message:"question not found!"})
            
            res.status(200).json({
                status: 'Successfull',
                result: {
                    question
                }, 
            })
        }catch(err){
            next(err)
        }
    },
    deletQuestion: async(req,res,next)=>{
        try{
            const id = req.params.id
            const question = await Question.findById(id)
            if(!question) return res.status(404).json({status:'fail', message:"question not found!"})
            
            question.delete()
            res.status(200).json({
                status: 'Successfull',
                result: {
                    message:"Question has been deleted"
                }, 
            })
            
        }catch(err){
            next(err)
        }
    },
    validateAnswer: async (req, res, next)=>{
        try{
            const question = await Question.findById(req.body.question_id)
            if(!question) return res.status(404).json({status:'fail', message:"question not found!"})
            const answer = req.body.answer
            if(question.answer !== answer){
                return res.status(402).json({status: "Wrong Answer", correct: question.answer})
            }
            return res.status(200).json({status:"Correct Answer"})
        }catch(err){
            next(err)
        }
    },
    getQuestionForVideo: async(req, res, next)=>{
        const video_id = req.params.video_id
        try{
            const questions = await Question.find({video_id})
            res.status(200).json({
                status: 'Successfull',
                result: {
                    questions
                }, 
            })
        }catch(err){
            next(err)
        }
    },
    getQuestionForPlaylist: async(req,res,next)=>{
        const playlist_id = req.params.playlist_id
        try{
            const questions = await Question.find({playlist_id})
            res.status(200).json({
                status: 'Successfull',
                result: {
                    questions
                }, 
            })
        }catch(err){
            next(err)
        }
    }
}