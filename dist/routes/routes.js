"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post("/create-user", userController_1.craeteUser);
router.get("/get-user", userController_1.getUserInfo);
router.post("/send-email", userController_1.sendEmailSes);
exports.default = router;
