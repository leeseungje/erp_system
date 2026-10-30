import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { voucherStore, createVoucher } from '@erp/database';
import { voucherSchema } from '@erp/validation';

const app = express();
const port = Number(process.env.PORT || 4000);

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ERP API',
            version: '1.0.0',
            description: 'Mock ERP voucher and approval APIs for demo workflow testing.'
        },
        servers: [
            { url: `http://localhost:${port}`, description: 'Local development server' }
        ],
        tags: [
            { name: 'Health', description: 'Health check endpoints' },
            { name: 'Vouchers', description: 'Voucher list and creation APIs' }
        ],
        paths: {
            '/health': {
                get: {
                    tags: ['Health'],
                    summary: 'Check API status',
                    responses: {
                        200: {
                            description: 'API is running',
                            content: {
                                'application/json': {
                                    example: {
                                        status: 'ok',
                                        service: 'erp-api',
                                        timestamp: '2026-10-30T00:00:00.000Z'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/vouchers': {
                get: {
                    tags: ['Vouchers'],
                    summary: 'List all vouchers',
                    responses: {
                        200: {
                            description: 'Voucher list returned successfully',
                            content: {
                                'application/json': {
                                    example: []
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Vouchers'],
                    summary: 'Create a voucher',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['company', 'vendor', 'amount', 'paymentDate'],
                                    properties: {
                                        company: { type: 'string', example: '아모레퍼시픽' },
                                        vendor: { type: 'string', example: '홍길동' },
                                        amount: { type: 'number', example: 2500000 },
                                        currency: { type: 'string', example: 'KRW' },
                                        paymentDate: { type: 'string', format: 'date', example: '2026-10-30' },
                                        approver: { type: 'string', example: '김팀장' },
                                        description: { type: 'string', example: '사무용품 구매' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Voucher created successfully'
                        },
                        400: {
                            description: 'Validation failed'
                        }
                    }
                }
            }
        }
    },
    apis: []
});

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true, customSiteTitle: 'ERP API Docs' }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true, customSiteTitle: 'ERP API Docs' }));

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
