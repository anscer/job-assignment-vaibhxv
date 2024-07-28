import { Request, Response } from 'express';
import State from '../models/State';
import { IUser } from '../models/User';  // Import the IUser interface


//State(s) controller.
export const createState = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;
    const user = req.user as IUser;  // Cast req.user to IUser type

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const state = new State({
      name,
      description,
      status,
      createdBy: user.id.toString(),  // Use _id instead of id
    });

    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: 'Error creating state', error });
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching states', error });
  }
};

export const getState = async (req: Request, res: Response) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching state', error });
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;
    const state = await State.findByIdAndUpdate(
      req.params.id,
      { name, description, status },
      { new: true }
    );
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: 'Error updating state', error });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting state', error });
  }
};