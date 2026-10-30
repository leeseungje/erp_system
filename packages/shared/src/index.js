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

export const buildAmaranthSummary = (voucher = {}) => {
    const company = voucher.company ?? '거래처';
    const vendor = voucher.vendor ?? '담당자';
    const amount = Number(voucher.amount ?? 0);
    const currency = voucher.currency ?? 'KRW';
    const paymentDate = voucher.paymentDate ?? '미정';
    const description = voucher.description ?? '업무 비용';
    const formattedAmount = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(amount);

    return [
        '아마란스10 검토 결과',
        `${company}의 ${vendor} 요청 건 (${formattedAmount})이 접수되었습니다.`,
        `지급 예정일: ${paymentDate} / 업무 내용: ${description}`,
        '검토 항목: 비용 적합성, 거래처 확인, 세금계산서 및 업무 목적 점검',
        '결재 단계: 사전 검토 → 담당자 확인 → 최종 상신',
    ].join('\n');
};

export const buildAutomationPlan = ({ approver = '김팀장' } = {}) => ({
    approver,
    steps: [
        'AI 요약 생성',
        '필수 정보 검증',
        `${approver} 결재선 지정`,
        '임시 저장',
        '담당자 최종 상신',
    ],
    manualSubmitRequired: true,
});
