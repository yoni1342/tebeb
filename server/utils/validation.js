// Validation
const Joi = require('@hapi/joi')

// Register validation
module.exports = {
    registerValidation : (data)=>{
        const schema =  Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().required().email(),
            grade: Joi.number().required().min(7).max(8),
            password: Joi.string().required().min(6)
        })
        return schema.validate(data)
    },
    signinValidation : (data)=>{
        const schema =  Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6)
        })
        return schema.validate(data)
    },
    createPlayistValidation: (data)=>{
        const schema = Joi.object({
            name: Joi.string().required(),
            grade: Joi.number().min(7).max(8).required(),
            chapters: Joi.array()
        })
        return schema.validate(data)
    },
    chapterValidation: (data)=>{
        const schema = Joi.object({
          number: Joi.number().min(1).required(),
          title: Joi.string().required(),
          videos: Joi.array()
        })
        return schema.validate(data)
    },
    videoValidation:(data)=>{
        const schema = Joi.object({
            url: Joi.string().required(),
            playlist_id: Joi.string().required(),
            grade: Joi.number().required().min(7).max(8),
            title: Joi.string().required(),
            chapter_number: Joi.number().required().min(1),
            thumbnail: Joi.string()
        })
        return schema.validate(data)
    },
    questionValidation:(data)=>{
        const schema = Joi.object({
            question: Joi.string().required(),
            answer: Joi.string().required(),
            options: Joi.array().min(2),
            video_id:Joi.string(),
            playlist_id: Joi.string().required()
        })
        return schema.validate(data)
    }
}