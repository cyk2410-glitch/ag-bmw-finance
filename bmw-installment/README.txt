BMW 통합 SEO 페이지 v4 — 2026-10-26

변경 사항
1. BMW 메인 링크(상단 로고, 상단 메뉴, 하단 버튼, 푸터)를 https://ag-bmw-finance.pages.dev/ 절대주소로 변경.
2. 블로그 최신 6개 API를 https://ag-bmw-finance.pages.dev/api/latest-posts 절대주소로 변경.
3. AG 이미지와 차량 이미지 모두 폴더에 포함.

중요: 로컬(file://) 실행에서는 브라우저 CORS 정책에 따라 블로그가 표시되지 않을 수 있습니다. Cloudflare Pages의 동일 도메인에 배포하면 정상 작동을 확인할 수 있습니다.

업로드: ZIP을 풀어 bmw-installment 폴더 전체를 GitHub 저장소 루트에 추가하세요. 기존 index.html, styles.css, app.js는 덮어쓰지 마세요. 기존 사이트의 Pages Functions(/api/latest-posts)는 그대로 유지하세요.

배포 후 확인 주소: https://ag-bmw-finance.pages.dev/bmw-installment/
API 확인 주소: https://ag-bmw-finance.pages.dev/api/latest-posts

참고: API 응답 자체는 확인되었지만 CORS 헤더는 별도로 확인되지 않았습니다. Cloudflare 같은 도메인에 배포해야 합니다.
