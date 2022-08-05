import cors from 'cors';
import express from 'express';
import morganMiddleware from './middleware/morganMiddleware';

const app = express();

//Set
app.set('PORT', '1000');
app.enable('trust proxy');

//Middleware
app.use(cors());
app.use(morganMiddleware);

export default app;
