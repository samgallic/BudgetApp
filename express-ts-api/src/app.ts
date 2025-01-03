import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import budgetRoutes from './routes/budgetRoutes';
import connectDB from './config/db';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/budget', budgetRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});