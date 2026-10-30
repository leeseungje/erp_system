# ERP Automation System

간단한 ERP 결재 자동화 데모 프로젝트입니다.

## 개요

이 프로젝트는 실제 ERP 시스템 연동이 불가능한 상황에서, 다음 흐름을 시연하기 위한 mock 기반 데모입니다.

- 결재 생성 폼 입력
- AI 요약 생성
- 필수값 검증
- 결재자 지정
- 임시 저장
- 최종 상신은 담당자가 직접 수행

## 핵심 기능

- Next.js 기반 웹 화면
- 로컬 mock API
- Playwright 기반 브라우저 자동화 검증
- AI 요약 생성 시나리오
- 마지막 상신 단계는 인간이 직접 처리

## 기술 스택

- Next.js
- Node.js + Express
- Playwright
- pnpm monorepo
- mock data + validation

## API 관련 제한

실제 더존 ERP API는 외부 공개 API를 제공하지 않는 구조라서, 이 프로젝트에서는 별도 실연동이 불가능합니다.

따라서 현재 구현은 다음 방식으로 동작합니다.

- 실제 ERP API 대신 로컬 mock API를 사용
- 브라우저 자동화로 UI 흐름 검증
- 최종 상신은 사용자 직접 수행

즉, 이 프로젝트는 "실제 ERP 연동"이 아니라 "ERP 자동화 데모"입니다.

## 실행 방법

```bash
cd D:\erp_system
pnpm install
pnpm dev
```

기본 실행 주소:

- 웹 화면: http://localhost:3000
- mock API: http://localhost:4000

## 자동화 검증

```bash
cd D:\erp_system
$env:ERP_WEB_URL='http://localhost:3000'
pnpm --dir apps/automation smoke
```

## 주의 사항

- 최종 상신은 담당자가 직접 눌러야 합니다.
- 이 단계는 실제 ERP API가 공개되지 않아 자동화하지 않는 구조입니다.
- 데모용으로는 mock 데이터와 브라우저 자동화를 사용합니다.
