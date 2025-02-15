"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByEmail = exports.createUser = void 0;
const userschema_1 = __importDefault(require("../schemas/userschema"));
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userdata = body;
        let createUser = yield userschema_1.default.create(userdata);
        if (createUser)
            return createUser;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.createUser = createUser;
const getUsersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getallusers = yield userschema_1.default.find({ email: email });
        return getallusers;
    }
    catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
});
exports.getUsersByEmail = getUsersByEmail;
