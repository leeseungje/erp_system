export const dashboardCards = [
    { label: '총 전표', value: '1,248', meta: '+12% vs last month' },
    { label: '결재 대기', value: '42', meta: '5개 미처리' },
    { label: '승인 완료', value: '890', meta: '94% 처리율' },
    { label: '반려 건수', value: '19', meta: '2건 신규' },
];

export const vouchers = [
    { id: 'VP-3021', company: '아모레퍼시픽', vendor: '홍길동', amount: 890000, currency: 'KRW', paymentDate: '2026-10-15', status: 'submitted', approver: '김팀장' },
    { id: 'VP-3128', company: '한화솔루션', vendor: '박민수', amount: 1540000, currency: 'KRW', paymentDate: '2026-10-17', status: 'approved', approver: '이과장' },
    { id: 'VP-3191', company: '네이버', vendor: '최지혜', amount: 2400, currency: 'USD', paymentDate: '2026-10-22', status: 'draft', approver: '정대리' },
];

export const approvers = [
    { name: '김팀장', role: '회계팀장' },
    { name: '이과장', role: '결제 담당' },
    { name: '박차장', role: '재무팀' },
];

export const formatCurrency = (value, currency = 'KRW') =>
    new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
