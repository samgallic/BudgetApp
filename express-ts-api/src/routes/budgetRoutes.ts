import { Router, Request, Response } from 'express';
import Budget, { IBudget } from '../models/Budget';

const router = Router();

// Get all budgets
router.get('/', async (req: Request, res: Response) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error })
    }
});

export default router;
