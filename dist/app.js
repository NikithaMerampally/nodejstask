"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb+srv://Nikitha:nikky@cluster0.8lbm2.mongodb.net/")
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));
app.use("/user", routes_1.default);
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
