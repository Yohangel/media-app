import { Request, Response } from 'express';
import { UserModel } from '@/models/user.model';
import { RoleModel } from '@/models/role.model';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username }).populate('role', 'name');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const validRole = await RoleModel.findOne({ name: role });
    if (!validRole) {
      return res.status(400).json({ error: 'Invalid role in database' });
    }

    const validRoles = ['editor', 'viewer'];
    if (!validRoles.includes(validRole.name)) {
      return res.status(400).json({ error: 'Invalid role. Must be either "editor" or "viewer"' });
    }

    const user = new UserModel({ username, email, password, role: validRole._id });
    await user.save();
    res.status(201).json(user); // La contraseña está oculta debido a la transformación en el esquema
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, role } = req.body;

    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const validRole = await RoleModel.findOne({ name: role });
    if (!validRole) {
      return res.status(400).json({ error: 'Invalid role in database' });
    }

    const validRoles = ['editor', 'viewer'];
    if (!validRoles.includes(validRole.name)) {
      return res.status(400).json({ error: 'Invalid role. Must be either "editor" or "viewer"' });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { username, email, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
