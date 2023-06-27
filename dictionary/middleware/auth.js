import jwt from 'jsonwebtoken';
import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js';

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid!');
  }

  const token = authHeader.split(' ')[1];

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, role };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid!');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route!');
    }

    next();
  };
};
