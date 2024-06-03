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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroeById = exports.addHeroes = exports.editHeroeByName = exports.getHeroeByName = exports.getAllsHeroes = void 0;
const heroes_1 = require("../models/heroes");
const getAllsHeroes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listHeroes = yield heroes_1.Heroe.findAll();
    res.json(listHeroes);
});
exports.getAllsHeroes = getAllsHeroes;
const getHeroeByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        // Buscar el héroe en la base de datos por nombre
        const heroe = yield heroes_1.Heroe.findOne({ where: { name: name } });
        if (!heroe) {
            return res.status(404).json({
                msg: `Heroe with name ${name} does not exist in Database`
            });
        }
        res.json({
            heroe
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops, something went wrong: ",
            error
        });
    }
});
exports.getHeroeByName = getHeroeByName;
const editHeroeByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const { newName, description } = req.body;
    try {
        // Buscar el héroe en la base de datos por nombre
        const heroe = yield heroes_1.Heroe.findOne({ where: { name: name } });
        if (!heroe) {
            return res.status(404).json({
                msg: `Heroe with name ${name} does not exist in Database`
            });
        }
        // Actualizar el nombre y la descripción del héroe
        yield heroe.update({ name: newName, description: description });
        res.json({
            msg: `Heroe ${name} updated successfully`,
            heroe
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops, something went wrong: ",
            error
        });
    }
});
exports.editHeroeByName = editHeroeByName;
const addHeroes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    //Validate if it exists in the database
    const heroe = yield heroes_1.Heroe.findOne({ where: { name: name } });
    if (heroe) {
        return res.status(400).json({
            msg: `User ${name} exist in Database`
        });
    }
    try {
        yield heroes_1.Heroe.create({
            name: name,
            description: description
        });
        res.json({
            msg: `User ${name} creted susecsfull`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops something went wrong: ",
            error
        });
    }
});
exports.addHeroes = addHeroes;
const deleteHeroeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Eliminar el héroe por su ID
        const deletedRows = yield heroes_1.Heroe.destroy({
            where: {
                id: id
            }
        });
        if (deletedRows === 0) {
            return res.status(404).json({
                msg: `Heroe with ID ${id} does not exist in Database`
            });
        }
        res.json({
            msg: `Heroe with ID ${id} deleted successfully`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops, something went wrong:",
            error
        });
    }
});
exports.deleteHeroeById = deleteHeroeById;
