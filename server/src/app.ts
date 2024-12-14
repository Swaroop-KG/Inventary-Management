import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({ origin: ['https://inventary-management-frontend.vercel.app'] }));

// application routes
app.use('/api/v1', rootRouter);
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the MERN API' });
  });
  

app.use(globalErrorHandler);

app.use(notFound);

export default app;
