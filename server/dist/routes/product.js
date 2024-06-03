"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Heroe_1 = require("../controllers/Heroe");
const router = (0, express_1.Router)();
router.get('/', Heroe_1.getHeroes);
exports.default = router;
