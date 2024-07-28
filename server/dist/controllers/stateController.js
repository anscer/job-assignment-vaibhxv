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
exports.deleteState = exports.updateState = exports.getState = exports.getStates = exports.createState = void 0;
const State_1 = __importDefault(require("../models/State"));
const createState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status } = req.body;
        const user = req.user; // Cast req.user to IUser type
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const state = new State_1.default({
            name,
            description,
            status,
            createdBy: user.id.toString(), // Use _id instead of id
        });
        yield state.save();
        res.status(201).json(state);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating state', error });
    }
});
exports.createState = createState;
const getStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const states = yield State_1.default.find();
        res.json(states);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching states', error });
    }
});
exports.getStates = getStates;
const getState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = yield State_1.default.findById(req.params.id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(state);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching state', error });
    }
});
exports.getState = getState;
const updateState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status } = req.body;
        const state = yield State_1.default.findByIdAndUpdate(req.params.id, { name, description, status }, { new: true });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(state);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating state', error });
    }
});
exports.updateState = updateState;
const deleteState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = yield State_1.default.findByIdAndDelete(req.params.id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json({ message: 'State deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting state', error });
    }
});
exports.deleteState = deleteState;
