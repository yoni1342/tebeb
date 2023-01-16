const express =  require("express");
const {signup, signin, confirmation} = require("../controllers/auth.js");

const router = express.Router()

// create a user
router.post('/signup', signup)
// Sign in
router.post('/signin', signin)
// google auth
// router.post('/google', )
router.get('/:token', confirmation)
module.exports = router