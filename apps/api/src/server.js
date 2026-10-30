import express from 'express';
import cors from 'cors';
import { voucherStore, createVoucher } from '@erp/database';
import { voucherSchema } from '@erp/validation';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'erp-api', timestamp: new Date().toISOString() });
});

app.get('/vouchers', (req, res) => {
    res.json(voucherStore);
});

app.post('/vouchers', (req, res) => {
    const parsed = voucherSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: 'validation_failed',
            details: parsed.error.flatten(),
        });
    }

    const saved = createVoucher(parsed.data);
    return res.status(201).json(saved);
});

app.listen(port, () => {
    console.log(`ERP API running on http://localhost:${port}`);
});
