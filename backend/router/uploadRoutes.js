import express from "express"
const router = express.Router()
import upload from "../middleware/uploadMiddleware.js"
import { uploadController } from "../controller/uploadController.js"
import showController from "../controller/showController.js"

router.post('/upload',upload.single('file'),uploadController)
router.get('/getAllUser',showController)

export default router