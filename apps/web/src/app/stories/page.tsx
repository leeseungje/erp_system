const patterns = [
  {
    slug: 'basic-approval',
    title: '기본 결재 생성',
    level: '기본',
    summary: '가장 단순한 결재 등록 시나리오입니다.',
    steps: ['거래처 입력', '금액 입력', '결제일 지정', '결재자 선택'],
    accent: '#1f6feb'
  },
  {
    slug: 'ai-summary',
    title: 'AI 요약 생성',
    level: 'AI',
    summary: '요약 생성 버튼을 눌러 결재 내용을 정리합니다.',
    steps: ['사무용품 정보 입력', 'AI 요약 요청', '검토 문구 생성'],
    accent: '#8b5cf6'
  },
  {
    slug: 'validation',
    title: '필수값 검증',
    level: '검증',
    summary: '필수 항목이 빠지면 안내 메시지를 보여줍니다.',
    steps: ['회사명 입력', '담당자 입력', '금액 확인', '필수값 체크'],
    accent: '#f59e0b'
  },
  {
    slug: 'approver-selection',
    title: '결재자 지정',
    level: '승인',
    summary: '결재선이 연결되고 승인 대기 상태를 보여줍니다.',
    steps: ['김팀장 지정', '이과장 확인', '박차장 검토'],
    accent: '#10b981'
  },
  {
    slug: 'draft-save',
    title: '임시 저장',
    level: '저장',
    summary: 'API로 임시 저장하고 목록에 반영합니다.',
    steps: ['폼 작성', '저장 요청', '목록 갱신', '최종 상신 대기'],
    accent: '#ef4444'
  },
  {
    slug: 'final-submit',
    title: '담당자 최종 상신',
    level: '마감',
    summary: '최종 상신 단계는 사람의 확인이 필요합니다.',
    steps: ['임시 저장 완료', '담당자 검토', '최종 상신 실행'],
    accent: '#0f172a'
  }
]

export default function StoriesPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, color: '#1f6feb', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 12, fontWeight: 700 }}>
            ERP Bridge
          </p>
          <h1 style={{ margin: '8px 0 0', fontSize: 36 }}>스토리북 패턴</h1>
        </div>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            background: '#1f6feb',
            color: '#fff',
            fontWeight: 700,
            borderRadius: 10,
            padding: '12px 18px'
          }}
        >
          홈으로 돌아가기
        </a>
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20
        }}
      >
        {patterns.map((pattern) => (
          <a
            key={pattern.slug}
            href={`/stories/${pattern.slug}`}
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid #dfe8f7',
              borderRadius: 18,
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
              padding: 20,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span
                style={{
                  display: 'inline-block',
                  background: `${pattern.accent}18`,
                  color: pattern.accent,
                  borderRadius: 999,
                  padding: '6px 10px',
                  fontSize: 12,
                  fontWeight: 700
                }}
              >
                {pattern.level}
              </span>
            </div>

            <h2 style={{ margin: '0 0 10px', fontSize: 22 }}>{pattern.title}</h2>
            <p style={{ margin: '0 0 16px', color: '#475569', lineHeight: 1.6 }}>{pattern.summary}</p>

            <ol style={{ margin: 0, paddingLeft: 20, color: '#1e293b', display: 'grid', gap: 8 }}>
              {pattern.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </a>
        ))}
      </section>
    </main>
  )
}
