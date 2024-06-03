"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            //get token without 'bearer'
            const bearerToken = headerToken.slice(7);
            //SecretKey
            const secretKey = process.env.KEY;
            //console.log(bearerToken);
            jsonwebtoken_1.default.verify(bearerToken, secretKey);
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Invalid Token'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Access denied'
        });
    }
};
exports.default = validateToken;
