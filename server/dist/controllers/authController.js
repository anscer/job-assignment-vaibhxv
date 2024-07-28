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
exports.logout = exports.login = exports.register = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = new User_1.default({ username, password });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.register = register;
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(400).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            return res.json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
};
exports.login = login;
const logout = (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
};
exports.logout = logout;
