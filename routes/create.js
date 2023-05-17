const express = require('express')
const router = express.Router()
const createController = require('../controllers/create')
const upload = require('../middleware/uploadImage')
const { ensureAuth } = require('../middleware/ensureAuth')

//Get
router.get('/', ensureAuth, createController.getCreate);

//Post
router.post('/post', ensureAuth, upload.single('uploaded_file'), createController.createItem)

module.exports = router