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
exports.forgotPassword = exports.loginUser = exports.newUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
// Verifica que la clave secreta esté definida
if (!process.env.KEY) {
    throw new Error('KEY environment variable is not defined');
}
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, rol } = req.body;
    //Validate if it exists in the database
    const user = yield User_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `User ${username} exist in Database`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield User_1.User.create({
            username: username,
            password: hashedPassword,
            email: email,
            rol: rol
        });
        res.json({
            msg: `User ${username} creted susecsfull`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops something went wrong: ",
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validate if it exists in the database
    const user = yield User_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `A user named ${username} was not found in the database`
        });
    }
    //Check if the password is the same
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: "Invalid Password "
        });
    }
    //Generar token
    const secretKey = process.env.KEY;
    const token = jsonwebtoken_1.default.sign({ username: username }, secretKey, {
        expiresIn: '3600000'
    });
    res.json({ token });
});
exports.loginUser = loginUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        // Validate if it exists in the database
        const findByEmail = yield User_1.User.findOne({ where: { email: email } });
        if (!findByEmail) {
            return res.status(400).json({
                msg: `Email ${email} was not found in the database`
            });
        }
        else {
            // Return a response with true if the email is found
            return res.status(200).json({
                msg: true
            });
        }
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error finding email in the database:', error);
        return res.status(500).json({
            msg: 'An error occurred while searching for the email in the database',
            error: error.message
        });
    }
});
exports.forgotPassword = forgotPassword;
