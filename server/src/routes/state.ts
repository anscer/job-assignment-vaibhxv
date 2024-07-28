import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createState, getStates, getState, updateState, deleteState } from '../controllers/stateController';


//Routes for state(s).
const router = express.Router();

router.post('/', isAuthenticated, createState);
router.get('/', getStates);
router.get('/:id', getState);
router.put('/:id', isAuthenticated, updateState);
router.delete('/:id', isAuthenticated, deleteState);

export default router;