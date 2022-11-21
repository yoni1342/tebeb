const router = require("express").Router()
const { isAdmin, auth } = require("../utils/verifyToken")
const {creatQuestion,getAllQuestions,getOneQuestion,getQuestionForVideo,getQuestionForPlaylist} =require('../controllers/question')

router.post('/', isAdmin, creatQuestion)
router.get('/', auth, getAllQuestions)
router.get('/:id',auth,getOneQuestion)
router.get('/video/:video_id',auth,getQuestionForVideo)
router.get('/playlist/:playlist_id',auth,getQuestionForPlaylist)

module.exports = router
