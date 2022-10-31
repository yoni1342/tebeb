const router = require("express").Router()
const {createPlayList, getAllPlaylist,getOnePlaylist, addChapter, deletePlaylist} = require('../controllers/playlist')
const {isAdmin, auth} = require('../utils/verifyToken')

router.post('/',isAdmin, createPlayList)
router.get('/', auth, getAllPlaylist)
router.get('/:playlistId',auth, getOnePlaylist)
router.post('/chapter/:playlistId',isAdmin, addChapter)
router.delete('/:playlistId', isAdmin, deletePlaylist)
module.exports = router
