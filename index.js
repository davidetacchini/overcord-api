import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errors.js';
import { authenticateToken } from './middlewares/auth.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(authenticateToken);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Go to /api' });
});

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
