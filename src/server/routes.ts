import { Request, Response, Router } from 'express';

import testRouter from '@/controllers/test';

const ROUTES = Router();

ROUTES.use('/test', testRouter);

ROUTES.get('/', (_req: Request, res: Response) =>
  res.json('DungeonMaster Bot')
);

export { ROUTES };
