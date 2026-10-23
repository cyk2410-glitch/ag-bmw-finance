# AG 천팀장 BMW할부 홈페이지 — Cloudflare Pages 전용

## 중요
- 이 패키지는 **Cloudflare Pages** 전용입니다. 기존 현대자동차·테슬라 홈페이지는 수정하지 않습니다.
- 블로그 자동 연동은 `functions/api/latest-posts.js` (Pages Functions)를 사용합니다.
- 정적 파일만 업로드하는 **Cloudflare 대시보드 직접 업로드(드래그앤드롭)** 방식은 `functions` 폴더를 실행하지 못할 수 있습니다. **Git 연동 배포 또는 Wrangler CLI 배포**를 사용하여 Pages Functions까지 함께 배포하세요.
- Git 연동 시 빌드 명령은 비워두고, 빌드 출력 디렉터리는 `.` 로 설정할 수 있습니다. 프로젝트 루트에 `index.html`과 `functions` 폴더가 있어야 합니다.
- 배포 후 `https://실제도메인/api/latest-posts`에 접속하여 `posts` 배열과 최신 글 6건을 확인하세요. RSS 접근 정책에 따라 실패할 수 있으므로 실배포 검증이 필수입니다.
- 배포 도메인이 확정되면 canonical, og:url, sitemap.xml 등을 실제 URL 기준으로 보완하고 검색엔진 등록을 진행하세요.
- 금융상품 적용 조건·모델별 판매 여부·실제 상담 사례 숫자와 링크를 배포 전에 재검수하세요.
- 현재는 배포 전 제작 파일이며, Cloudflare 실배포와 RSS 실시간 작동은 아직 검증하지 않았습니다.
