import { z } from 'zod';

export const voucherSchema = z.object({
    id: z.string().min(1),
    company: z.string().min(1),
    vendor: z.string().min(1),
    amount: z.number().positive(),
    currency: z.enum(['KRW', 'USD', 'JPY']),
    paymentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(['draft', 'submitted', 'approved', 'rejected']),
    approver: z.string().min(1),
});

export const approvalSchema = z.object({
    approver: z.string().min(1),
    role: z.string().min(1),
    note: z.string().max(200).optional(),
});
