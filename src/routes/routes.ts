import express from "express"
import {craeteUser, getUserInfo, sendEmailSes} from "../controller/userController"

const router = express.Router()
router.post("/create-user", craeteUser)
router.get("/get-user", getUserInfo)
router.post("/send-email", sendEmailSes )

export default router;