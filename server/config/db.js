import mongoose from ('mongoose')

const connect_db = async ()=>{
    const conn = mongoose.connect('mongodb://0.0.0.0:27017/tibeb2')
    console.log(`MongoDB Connected`.cyan.underline.bold);
}

module.exports = {connect_db}