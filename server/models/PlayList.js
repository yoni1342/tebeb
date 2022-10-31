const mongoose = require('mongoose')

const PlayListSchama = mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },
  grade:{
    type: Number,
    required: true,
  },
  thumbnail_path: { 
    type: String,
    default: ''
  },
  desc:{
    type: String,
    default: '',
  },
  chapters:[
    {
        number:{
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        videos: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Video',
          },
        ]
    }
  ]
},{ timestamps: true })

module.exports = mongoose.model("PlayList", PlayListSchama)