"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const stateController_1 = require("../controllers/stateController");
const router = express_1.default.Router();
router.post('/', auth_1.isAuthenticated, stateController_1.createState);
router.get('/', stateController_1.getStates);
router.get('/:id', stateController_1.getState);
router.put('/:id', auth_1.isAuthenticated, stateController_1.updateState);
router.delete('/:id', auth_1.isAuthenticated, stateController_1.deleteState);
exports.default = router;
