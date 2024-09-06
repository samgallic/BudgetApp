import { Schema, model, Document } from 'mongoose';

export interface IBudget extends Document {
    netTotal: number;
    // monthlyIncome: number;
    // scholarships: number;
    // debt: number;
    // savings: number;
}

const BudgetSchema: Schema = new Schema(
    {
        netTotal: { type: Number, required: true },
    }
)

export default model<IBudget>('Budget', BudgetSchema);
