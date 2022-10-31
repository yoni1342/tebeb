const jwt = require('jsonwebtoken')



module.exports = {
    auth : (req, res, next)=>{
        const token = req.header("access_token")
        if(!token) return res.status(401).send('Access Denied')
    
        try{
            const verfied = jwt.verify(token, process.env.JWT)
            req.user = verfied
            next()
        } catch(err){
            res.status(400).send("Invalid Token"); 
        }
    },
    isAdmin: (req, res, next)=>{
        const token = req.header("access_token")
        if(!token) return res.status(401).send('Access Denied')
    
        try{
            const verfied = jwt.verify(token, process.env.JWT)
            // req.user = verfied
            if (verfied.role == 'Admin'){
                req.user = verfied
                next()
            }
            else{
                return res.status(400).json({status:'fail', message: 'This action is only for admins'})
            }
        } catch(err){
            res.status(400).send("Invalid Token"); 
        }
    },
    isStudent: (req, res, next)=>{
        const token = req.header("access_token")
        if(!token) return res.status(401).send('Access Denied')
    
        try{
            const verfied = jwt.verify(token, process.env.JWT)
            // req.user = verfied
            if (verfied.role == 'Student'){
                req.user = verfied
                next()
            }
            else{
                return res.status(400).json({status:'fail', message: 'This action is only for Student'})
            }
        } catch(err){
            res.status(400).send("Invalid Token"); 
        }
    },
}