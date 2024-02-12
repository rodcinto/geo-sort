import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.enable('trust proxy');
app.disable('x-powered-by');

export default app;
