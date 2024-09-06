import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});