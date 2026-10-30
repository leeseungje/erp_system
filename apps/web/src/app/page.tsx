import { dashboardCards, formatCurrency, vouchers, approvers } from '@erp/shared'

export default function HomePage() {
  return (
    <main className="container">
      <header className="topbar">
        <div>
          <p className="eyebrow">ERP Bridge</p>
          <h1>ERP Automation System</h1>
        </div>
        <button className="primary-button">결재 요청 생성</button>
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

      <section className="panel-grid">
        <div className="panel">
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
              {vouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td>{voucher.id}</td>
                  <td>{voucher.vendor}</td>
                  <td>{formatCurrency(voucher.amount, voucher.currency)}</td>
                  <td>
                    <span className={`status ${voucher.status}`}>{voucher.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
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
    </main>
  )
}
