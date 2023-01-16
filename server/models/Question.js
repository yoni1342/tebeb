const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true, 
        unique: true
    },
    answer:{ 
        type: String,
        require: true
    },
    options:[
        {
            type: String,
            required: true
        }
    ],
    video_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },

    playlist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayList',
        required: true  
    }
}, {timestamps: true})

module.exports = mongoose.model("Question", questionSchema);

