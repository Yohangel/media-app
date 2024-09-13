import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@/models/user.model';
import { RoleModel } from '@/models/role.model';

export const authorize = (requiredroles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      const user = await UserModel.findById(req.user._id).populate('role');
      if (!user) return res.status(404).json({ error: 'User not found' });

      const role = await RoleModel.findById(user.role);
      if (!role) return res.status(404).json({ error: 'Role not found' });

      const hasPermission = requiredroles.includes(role.name);

      if (!hasPermission) return res.status(403).json({ error: 'Forbidden' });

      next();
    } catch (error) {
      console.error('Error in authorization middleware:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
};
