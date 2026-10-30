const patterns = {
  'basic-approval': {
    title: '기본 결재 생성',
    level: '기본',
    accent: '#1f6feb',
    summary: '거래처와 금액을 입력해 결재를 시작하는 기본 흐름입니다.',
    panels: ['거래처 입력', '결제일 선택', '결재자 지정', '기본 검증']
  },
  'ai-summary': {
    title: 'AI 요약 생성',
    level: 'AI',
    accent: '#8b5cf6',
    summary: '결재 내용을 정리하고 핵심 정보를 요약해 보여주는 시나리오입니다.',
    panels: ['AI 요약 요청', '핵심 키워드 추출', '검토 메모 생성', '요약 완료']
  },
  validation: {
    title: '필수값 검증',
    level: '검증',
    accent: '#f59e0b',
    summary: '필수 입력값이 비어 있을 때 안내가 표시되는 예시입니다.',
    panels: ['회사명 필요', '결제일 필요', '금액 필요', '검증 통과']
  },
  'approver-selection': {
    title: '결재자 지정',
    level: '승인',
    accent: '#10b981',
    summary: '승인 대기 결재선을 지정하는 단계입니다.',
    panels: ['김팀장 담당', '이과장 검토', '박차장 확인', '결재선 확정']
  },
  'draft-save': {
    title: '임시 저장',
    level: '저장',
    accent: '#ef4444',
    summary: '임시 저장 후 목록에 데이터가 반영되는 흐름을 보여줍니다.',
    panels: ['폼 작성', '임시 저장', '목록 반영', '결재 보류']
  },
  'final-submit': {
    title: '담당자 최종 상신',
    level: '마감',
    accent: '#0f172a',
    summary: '최종 상신은 담당자가 직접 확인하고 실행해야 합니다.',
    panels: ['검토 완료', '담당자 확인', '최종 상신', '업무 종료']
  }
} as const

export function generateStaticParams() {
  return Object.keys(patterns).map((slug) => ({ slug }))
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const pattern = patterns[params.slug as keyof typeof patterns]

  if (!pattern) {
    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
        <h1>존재하지 않는 패턴입니다.</h1>
        <a href="/stories" style={{ color: '#1f6feb' }}>
          목록으로 돌아가기
        </a>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 64px' }}>
      <div style={{ marginBottom: 20 }}>
        <a href="/stories" style={{ color: '#1f6feb', textDecoration: 'none', fontWeight: 700 }}>
          ← 스토리 목록
        </a>
      </div>

      <section
        style={{
          background: '#fff',
          border: '1px solid #dfe8f7',
          borderRadius: 18,
          padding: 24,
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)'
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}
        >
          <span
            style={{
              background: `${pattern.accent}18`,
              color: pattern.accent,
              borderRadius: 999,
              padding: '6px 10px',
              fontWeight: 700,
              fontSize: 12
            }}
          >
            {pattern.level}
          </span>
        </div>

        <h1 style={{ margin: '0 0 12px', fontSize: 32 }}>{pattern.title}</h1>
        <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{pattern.summary}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 28 }}>
          {pattern.panels.map((panel, index) => (
            <div
              key={panel}
              style={{ border: '1px solid #dfe8f7', borderRadius: 12, padding: 16, background: index % 2 === 0 ? '#f8fafc' : '#fff' }}
            >
              <div style={{ fontSize: 12, color: pattern.accent, fontWeight: 700, marginBottom: 8 }}>STEP {index + 1}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{panel}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
