# 실행 가이드

아래 방법으로 프로젝트를 실행할 수 있습니다.

## 1. 전체 실행

```bash
cd D:\erp_system
pnpm dev
```

- 웹 화면: http://localhost:3000
- API 서버: http://localhost:4000
- 스토리북 패턴 페이지: http://localhost:3000/stories

## 2. 웹만 실행

```bash
cd D:\erp_system
pnpm --dir apps/web dev
```

## 3. API만 실행

```bash
cd D:\erp_system
pnpm --dir apps/api dev
```

## 4. 자동화 검증 실행

```bash
cd D:\erp_system
$env:ERP_WEB_URL='http://localhost:3000'
pnpm --dir apps/automation smoke
```

## 5. 브라우저에서 패턴 확인

브라우저에서 아래 주소로 접속하면 여러 시나리오 패턴을 볼 수 있습니다.

- http://localhost:3000/stories

## 6.문제 해결

만약 전표 목록이 비어 있다면, 먼저 API 서버를 실행해 주세요.

```bash
cd D:\erp_system
pnpm --dir apps/api dev
```

그다음 웹 화면을 열어 저장 동작을 다시 확인하면 됩니다.
