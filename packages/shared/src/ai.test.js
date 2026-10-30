import test from 'node:test';
import assert from 'node:assert/strict';

import { buildAmaranthSummary, buildAutomationPlan } from './index.js';

test('buildAmaranthSummary creates a Korean approval summary', () => {
    const summary = buildAmaranthSummary({
        company: '테스트 회사',
        vendor: '홍길동',
        amount: 2500000,
        currency: 'KRW',
        paymentDate: '2026-10-30',
        description: '사무용품 구매'
    });

    assert.match(summary, /테스트 회사/);
    assert.match(summary, /사무용품 구매/);
    assert.match(summary, /2,500,000/);
    assert.match(summary, /결재/);
});

test('buildAutomationPlan keeps final submission manual', () => {
    const plan = buildAutomationPlan({ approver: '김팀장' });

    assert.equal(plan.steps[0], 'AI 요약 생성');
    assert.equal(plan.steps.at(-1), '담당자 최종 상신');
    assert.ok(plan.manualSubmitRequired);
});
