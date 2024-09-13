import { Request, Response } from 'express';
import { RoleModel } from '@/models/role.model';

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = new RoleModel(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create role' });
  }
};

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};