import { Request, Response, Router } from 'express';

import { generateResponse } from '@/generate';

const router = Router();

class HttpError extends Error {
  status = 500;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      throw new HttpError(400, 'Missing prompt');
    }
    const response = await generateResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error('An error occurred:', error);
    const status = (error as HttpError).status ?? 500;
    res.status(status).json({
      response: 'Error: could not generate response',
      error:
        status === 500
          ? 'Internal Server Error'
          : (error as Error)?.message ?? error
    });
  }
});

export default router;
