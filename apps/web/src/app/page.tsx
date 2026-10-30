'use client'

import { useEffect, useRef, useState } from 'react'
import { approvers, buildAmaranthSummary, buildAutomationPlan, dashboardCards, formatCurrency } from '@erp/shared'

const emptyForm = {
  company: '',
  vendor: '',
  amount: '',
  currency: 'KRW',
  paymentDate: '',
  approver: approvers[0].name,
  description: ''
}

export default function HomePage() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [vouchers, setVouchers] = useState<any[]>([])
  const [form, setForm] = useState(emptyForm)
  const [summary, setSummary] = useState('')
  const [statusMessage, setStatusMessage] = useState('시스템 준비 완료')
  const [automationPlan, setAutomationPlan] = useState(buildAutomationPlan({ approver: approvers[0].name }))

  useEffect(() => {
    loadVouchers()
  }, [])

  function handleCreateApprovalRequest() {
    setForm({
      company: '아모레퍼시픽',
      vendor: '홍길동',
      amount: '2500000',
      currency: 'KRW',
      paymentDate: '2026-10-30',
      approver: '김팀장',
      description: '사무용품 구매 및 출장비'
    })
    setSummary('')
    setStatusMessage('결재 요청을 준비했습니다. 아래 폼에서 내용을 확인하고 AI 요약을 생성해 주세요.')

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const companyInput = formRef.current?.querySelector<HTMLInputElement>('input[name="company"]')
      companyInput?.focus()
    })
  }

  async function loadVouchers() {
    try {
      const res = await fetch('http://localhost:4000/vouchers')
      const data = await res.json()
      setVouchers(data)
    } catch {
      setStatusMessage('API 연결 실패: API 서버를 먼저 실행해 주세요.')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleAiSummary() {
    const nextSummary = buildAmaranthSummary({
      company: form.company || '테스트 회사',
      vendor: form.vendor || '홍길동',
      amount: Number(form.amount || 0),
      currency: form.currency,
      paymentDate: form.paymentDate || '2026-10-30',
      description: form.description || '사무용품 구매'
    })

    setSummary(nextSummary)
    setAutomationPlan(buildAutomationPlan({ approver: form.approver || approvers[0].name }))
    setStatusMessage('아마란스10이 결재 요약을 생성했습니다.')
  }

  async function handleDraftSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.company || !form.vendor || !form.amount || !form.paymentDate) {
      setStatusMessage('필수 항목을 모두 입력해 주세요.')
      return
    }

    const payload = {
      id: `VP-${Date.now()}`,
      company: form.company,
      vendor: form.vendor,
      amount: Number(form.amount),
      currency: form.currency,
      paymentDate: form.paymentDate,
      status: 'draft',
      approver: form.approver
    }

    try {
      const res = await fetch('http://localhost:4000/vouchers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const saved = await res.json()
      setVouchers((previous) => [saved, ...previous])
      setStatusMessage('임시 저장 완료. 마지막 상신은 담당자가 직접 눌러 주세요.')
    } catch {
      setStatusMessage('저장 실패: API 서버를 먼저 실행해 주세요.')
    }
  }

  return (
    <main className="container">
      <header className="topbar">
        <div>
          <p className="eyebrow">ERP Bridge</p>
          <h1>ERP Automation System</h1>
        </div>
        <button className="primary-button" type="button" onClick={handleCreateApprovalRequest}>
          결재 요청 생성
        </button>
      </header>

      <section className="stats-grid">
        {dashboardCards.map((card) => (
          <article className="stat-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.meta}</small>
          </article>
        ))}
      </section>

      <section className="workflow-shell">
        <div className="panel">
          <div className="panel-header">
            <h2>결재 생성</h2>
            <span className="tag success">아마란스10 연동</span>
          </div>

          <form ref={formRef} className="draft-form" onSubmit={handleDraftSave}>
            <div className="field-row">
              <label className="field">
                <span>거래처</span>
                <input name="company" value={form.company} onChange={handleChange} placeholder="예: 테스트 회사" />
              </label>
              <label className="field">
                <span>담당자</span>
                <input name="vendor" value={form.vendor} onChange={handleChange} placeholder="예: 홍길동" />
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>금액</span>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="2500000" />
              </label>
              <label className="field">
                <span>통화</span>
                <select name="currency" value={form.currency} onChange={handleChange}>
                  <option value="KRW">KRW</option>
                  <option value="USD">USD</option>
                  <option value="JPY">JPY</option>
                </select>
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>결제일</span>
                <input type="date" name="paymentDate" value={form.paymentDate} onChange={handleChange} />
              </label>
              <label className="field">
                <span>결재자</span>
                <select name="approver" value={form.approver} onChange={handleChange}>
                  {approvers.map((approver) => (
                    <option key={approver.name} value={approver.name}>
                      {approver.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>업무 내용</span>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="사무용품 및 출장 비용" />
            </label>

            <div className="button-row">
              <button type="button" className="secondary-button" onClick={handleAiSummary}>
                AI 요약 생성
              </button>
              <button type="submit" className="primary-button">
                임시 저장
              </button>
            </div>
          </form>

          {summary ? (
            <div className="summary-box">
              <h3>아마란스10 요약</h3>
              <pre>{summary}</pre>
            </div>
          ) : null}

          <div className="status-banner">{statusMessage}</div>

          <div className="manual-callout">
            <strong>처리 규칙</strong>
            <p>AI 요약 생성, 필수값 검증, 결재자 지정, 임시 저장까지는 자동화합니다. 최종 상신은 담당자가 직접 눌러야 합니다.</p>
            <button type="button" className="ghost-button">
              담당자 최종 상신
            </button>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>자동화 단계</h2>
            <span className="tag neutral">Playwright 시뮬레이션</span>
          </div>

          <ol className="workflow-list">
            {automationPlan.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="panel-header compact">
            <h2>결재선</h2>
            <span className="tag neutral">승인 대기</span>
          </div>
          <ul className="approver-list">
            {approvers.map((approver) => (
              <li key={approver.name}>
                <div>
                  <strong>{approver.name}</strong>
                  <small>{approver.role}</small>
                </div>
                <span className="dot" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel panel-table">
        <div className="panel-header">
          <h2>전표 목록</h2>
          <span className="tag success">실시간 반영</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>전표</th>
              <th>거래처</th>
              <th>금액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {(vouchers || []).map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.id}</td>
                <td>{voucher.company}</td>
                <td>{formatCurrency(voucher.amount, voucher.currency)}</td>
                <td>
                  <span className={`status ${voucher.status}`}>{voucher.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
