import { Request, Response, Router } from 'express';

import askRouter from '@/controllers/ask';

const ROUTES = Router();

ROUTES.use('/ask', askRouter);

ROUTES.get('/', (_req: Request, res: Response) =>
  res.json('DungeonMaster Bot')
);

export { ROUTES };
