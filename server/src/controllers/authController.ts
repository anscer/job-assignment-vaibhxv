import { Request, Response } from 'express';
import passport from 'passport';
import User from '../models/User';


//auth controller.
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = (req: Request, res: Response, next: Function) => {
  passport.authenticate('local', (err: Error, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
};