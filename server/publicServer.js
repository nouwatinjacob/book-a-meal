import express from 'express';
import path from 'path';
import http from 'http';
import logger from 'morgan';
import parser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';


const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8080;


app.set('port', port);

routes(router);

app.use(logger('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(express.static('production'));

app.use('/api/v1/', router);

app.get('/api/v1/*', (req, res) => res.status(404).json({
  message: 'Invalid Api Url',
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../production/index.html'));
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Port running at ${port}`));

export default app;
