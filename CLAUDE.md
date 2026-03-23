# Recollect — 프로젝트 가이드

LP, CD, 책 등 물리적으로 쌓이는 컬렉션을 디지털로 1:1 매핑하는 앱.
계층 구조: **Room (방)** → **Drawer (서랍)** → **Item (아이템)**

## 기술 스택
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Zustand (클라이언트 상태)
- Supabase (예정 — 현재 미연결)
- Framer Motion
- Lucide React

---

## 현재 상태 (데모 모드)
- 인증: 클라이언트 인메모리 (새로고침 시 초기화)
- 데이터: Zustand 인메모리 데모 데이터
- 이미지: `URL.createObjectURL()` (탭 닫으면 사라짐)

데모 계정: `test@test.com` / `1234`

---

## TODO — 추후 구현 예정

### 인증
- [ ] Supabase Auth 연동 (`@supabase/auth-helpers-nextjs`)
- [ ] 구글 OAuth 로그인 (버튼 UI는 이미 준비됨, `provider: 'google'` 활성화 필요)
- [ ] 세션 영속성 (현재 인메모리 → Supabase session)
- [ ] 미들웨어 레벨 라우트 보호 (`src/middleware.ts`)
- [ ] 비밀번호 재설정 플로우

### 데이터 영속성
- [ ] Supabase DB 테이블 생성
  - `rooms (id, user_id, name, description, created_at)`
  - `drawers (id, room_id, name, description, background_image_url, created_at)`
  - `items (id, drawer_id, title, subtitle, image_url, notes, created_at)`
- [ ] Zustand 스토어 → Supabase CRUD 연동
- [ ] Supabase Storage로 이미지 업로드 (현재 `createObjectURL` 임시)

### 기능
- [ ] 아이템 이미지 등록 (커버 아트, 책 표지)
- [ ] 바코드/ISBN 스캔으로 메타데이터 자동 조회
- [ ] 아이템 상세 편집 (notes, 태그 등)
- [ ] 검색 (전체 아이템 텍스트 검색)
- [ ] 서랍 내 아이템 순서 드래그 정렬
- [ ] Room/Drawer 이름 인라인 편집
- [ ] 대출/공유 추적 기능

### UI/UX
- [ ] 모바일 최적화 (현재 기본 반응형만)
- [ ] 다크/라이트 모드 토글
- [ ] 서랍 그리드 뷰에서 배경 이미지 비율 옵션
- [ ] 아이템 수 뱃지 (서랍 카드에 표시)
