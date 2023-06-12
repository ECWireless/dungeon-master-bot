import { Request, Response, Router } from 'express';

import askRouter from '@/controllers/ask';
import { verifyToken } from '@/utils/auth';

const ROUTES = Router();

ROUTES.use(
  '/ask',
  (req: Request, res: Response, next) => {
    if (verifyToken(req)) {
      return next();
    }
    return res
      .status(401)
      .json({ response: 'Error: not authorized', error: 'Unauthorized' });
  },
  askRouter
);

ROUTES.get('/', (_req: Request, res: Response) =>
  res.json('DungeonMaster Bot')
);

export { ROUTES };
