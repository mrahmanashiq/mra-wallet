import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import { rootRouter } from './routes/rootRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(
  cors({
    origin: [process.env.CLIENT_URL ?? 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

connectDB();

app.use('/api', rootRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} on ${process.env.NODE_ENV} mode`);
});
