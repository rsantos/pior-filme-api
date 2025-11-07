import express from 'express';

import { Router, Request, Response } from 'express';

const app = express();

const router = Router();

app.use(express.json());

router.get('/', (_: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});