import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

let users: User[] = [];

// Get all users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// Get a single user by ID
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Create a new user
router.post('/', (req: Request, res: Response) => {
  const newUser: User = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
router.put('/:id', (req: Request, res: Response) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex >= 0) {
    users[userIndex] = req.body;
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete a user
router.delete('/:id', (req: Request, res: Response) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

export default router;
