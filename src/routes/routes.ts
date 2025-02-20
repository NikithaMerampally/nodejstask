import express from "express"
import {craeteUser, getUserInfo} from "../controller/userController"

const router = express.Router()
router.post("/create-user", craeteUser)
router.get("/get-user", getUserInfo)

export default router;