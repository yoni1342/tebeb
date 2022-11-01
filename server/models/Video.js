const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    yturl:{
        type: String,
        required: true,
        unique:true
    },
    url: {
        type: String,
        unique:true,
        default: ""
    },
    grade:{
        type:Number,
        required: true
    },
    playlist_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayList',
        required: true
    },
    chapter_number:{
        type: Number,
        required: true
    },
    thumbnail_path: { 
        type: String, 
        default: ""
    }
    
},{ timestamps: true })


module.exports = mongoose.model("Video", videoSchema);