import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import logger from './middlewares/logger';
import errorHandler from './middlewares/error';
import user from './routes/user';
import connectDB from './config/db';

dotenv.config({ path: './config/config.env' });
connectDB();

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//! read/parse json data
app.use(bodyParser.json());

// use our logger
app.use(logger);

app.use('/api/v1/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

// process our error and close off our server
process.on('unhandledRejection', (err: Error, promise: Promise<any>) => {
  console.log(`Error ${err.message}`);

  // kill server
  server.close(() => process.exit(1));
});
