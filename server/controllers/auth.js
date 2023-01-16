const User = require('../models/User')
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken")
const {registerValidation, signinValidation} = require('../utils/validation')

const { transporter } = require('../config/email')

module.exports = 
{ 
    signup : async (req, res, next)=>{
    
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).json({status:'fail', message: error.details[0].message})

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({status:'fail', message: "Email already exists"})

    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hash})

        await newUser.save()
        const {password, ...others} = newUser._doc
        // send Verification Email
        jwt.sign({id : newUser._id}, process.env.JWT, {expiresIn: '1h'}, (err, emailToken)=>{
            const url = `${process.env.SERVER_BASE_URL}/confirmation/${emailToken}`;

            transporter.sendMail({
                from: 'yonatantesfaye30@gmail.com',
                to: newUser.email,
                subject: "Verifiy yor email",
                html:  `Please click this email to confirm your email: <a href="${url}">using this LINK</a>`
            })
        })

        return res.status(200).json({message: others})
    }catch(err){
        next(err)
    }
},
signin : async (req, res, next)=>{
        const {error} = signinValidation(req.body)
        if(error) return res.status(400).json({status:'fail', message: error.details[0].message})

        try{
            const user = await User.findOne({email: req.body.email})
            if(!user) return next(createError(400, "Wrong credentials!"))

            if(!user.verified) return next(createError(400, "Please confirm your email to login"))

            const isCorrect = await bcrypt.compare(req.body.password, user.password)

            if(!isCorrect) return next(createError(400, "Wrong credentials!"))

            // const j = 
            const token = jwt.sign({id : user._id, role: user.role}, process.env.JWT)

            const {password, ...others} = user._doc
            const final = {...others,token}
            res.header("access_token", token).status(200).json(final)
        }catch(err){
            next(err)
        }
},
confirmation : async(req, res, next)=>{
    try{
        const verfied = jwt.verify(req.params.token, process.env.JWT)
        const user = await User.findById(verfied.id)
        if(!user) return res.status(400).json({status:"fail", message:"Invalid Token"})
        await User.findByIdAndUpdate(verfied.id, {
            $set:{verified:true}
        })

        return res.redirect(`${process.env.CLIENT_BASE_URL}/signin`)
    }catch(err){
        next(err)
    }
}

}