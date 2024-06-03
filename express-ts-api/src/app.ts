import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

const app: Application = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});