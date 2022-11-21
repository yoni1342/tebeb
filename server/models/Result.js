const mongoonse = require('mongoose')

const ResultSchema = mongoonse.Schema({
    user_id: {
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    result:{
        type: [{
            question_id:{
                type: mongoonse.Schema.Types.ObjectId,
                ref: "Question",
                required: true
            },
            user_ans:{
                type: String,
                default: "No_answer"
            }
        }
        ]
    },
    total: {
        type: Number,
        default: 0
    }
})

module.exports = mongoonse.model("Result", ResultSchema)