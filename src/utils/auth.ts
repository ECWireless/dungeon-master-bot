import { Request } from 'express';
import { verify } from 'jsonwebtoken';

import { JWT_SECRET } from '@/utils/constants';

export const verifyToken = (req: Request) => {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];

  if (!token) return false;

  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    return false;
  }
};
