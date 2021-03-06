import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import baseRoute from './route/index';
import enVariable from './envConfig';

const { dbConnection } = enVariable;

mongoose.connect(
  dbConnection,
  { useNewUrlParser: true }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./web/public/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', baseRoute);

app.use('*', (req, res) => res.status(200).sendFile(path.join(__dirname, '../web/public/index.html')));

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log('Server Started on port', port); //eslint-disable-line
});

export default app;
