"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Heroe_1 = require("../controllers/Heroe");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, Heroe_1.getAllsHeroes);
router.post('/addHeroe', Heroe_1.addHeroes);
router.get('/:name', Heroe_1.getHeroeByName);
router.put('/:id', Heroe_1.editHeroe);
router.delete('/:id', Heroe_1.deleteHeroeById);
exports.default = router;
