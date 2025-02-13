"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const mongoose = require('mongoose');
const multer = require('multer');
app.use(express_1.default.json());
mongoose.connect("mongodb+srv://Nikitha:nikky@cluster0.8lbm2.mongodb.net/")
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));
app.use(multer().any());
app.get("/", (req, res) => {
    return res.send("Hello Typescript");
});
app.listen(port, () => {
    console.log("app is running on port 3000");
});
