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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const auth_1 = __importDefault(require("./routes/auth"));
const state_1 = __importDefault(require("./routes/state"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to MongoDB
(0, database_1.connectDB)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));
// Passport configuration
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user)
            return done(null, false, { message: 'Incorrect username' });
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            return done(null, false, { message: 'Incorrect password' });
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
// Routes
app.use('/auth', auth_1.default);
app.use('/states', state_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
