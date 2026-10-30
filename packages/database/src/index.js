export const voucherStore = [
    {
        id: 'VP-3021',
        company: '아모레퍼시픽',
        vendor: '홍길동',
        amount: 890000,
        currency: 'KRW',
        paymentDate: '2026-10-15',
        status: 'submitted',
        approver: '김팀장',
    },
    {
        id: 'VP-3128',
        company: '한화솔루션',
        vendor: '박민수',
        amount: 1540000,
        currency: 'KRW',
        paymentDate: '2026-10-17',
        status: 'approved',
        approver: '이과장',
    },
];

export const createVoucher = (voucher) => {
    const created = {
        ...voucher,
        id: voucher.id || `VP-${Date.now()}`,
    };
    voucherStore.unshift(created);
    return created;
};
