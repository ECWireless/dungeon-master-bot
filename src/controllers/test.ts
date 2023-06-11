import { Request, Response, Router } from 'express';

const router = Router();

class HttpError extends Error {
  status = 500;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

router.get('/', async (_: Request, res: Response) => {
  try {
    res.json({ response: `It's working!` });
  } catch (error) {
    console.error('An error occurred:', error);
    const status = (error as HttpError).status ?? 500;
    res.status(status).json({
      response: 'Error: test failed',
      error:
        status === 500
          ? 'Internal Server Error'
          : (error as Error)?.message ?? error
    });
  }
});

export default router;
