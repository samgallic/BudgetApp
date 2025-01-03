import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { Error as MongooseError } from 'mongoose';
import bcrypt from 'bcrypt';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Get a single user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res.status(400).send({ message: error.message });
    } else if (
      error instanceof Error &&
      'code' in error &&
      (error as any).code === 11000
    ) {
      res.status(400).send({ message: 'Email already exists' });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }  
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email not recognized' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Update an existing user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

function isMongoServerError(error: any): error is { code: number } {
  return error && typeof error === 'object' && 'code' in error;
}

export default router;
