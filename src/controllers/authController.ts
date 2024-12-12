import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwt';
import { User } from '../models/userModel';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(newUser.id.toString());
    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating user.', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred.', error: String(error) });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user.id.toString());
    res.status(200).json({ message: 'Login successful', token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error logging in.', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred.', error: String(error) });
    }
  }
};
