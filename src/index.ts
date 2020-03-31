require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import routes from './routes'
import databaseInit from './database/databaseInit';

const app = express();
try {
  async () => {
    await databaseInit();
  }
} catch (err) {
  console.log('ERRO >>>>>>>>>', err);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use(routes);

app.listen(4000);
