import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use(router);

export { app };
