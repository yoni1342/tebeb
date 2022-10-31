const router = require("express").Router()
const {addvideo, getAllVideos, getOneVideo, deleteVideo, updateVideo, playVideo} = require('../controllers/video')
const {isAdmin} = require('../utils/verifyToken')
const {upload} = require('../utils/fileUpload')
router.post('/', isAdmin, addvideo)
router.get('/', getAllVideos)
router.get('/:videoId', getOneVideo)
router.delete('/:videoId',isAdmin,deleteVideo)
router.put('/:videoId',isAdmin ,updateVideo)
router.get('/:videoId/play', playVideo)

module.exports = router 
