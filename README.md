# 연화 김수연 개인전

**붉은 장미의 언어** — 김수연 일곱 번째 개인전 홈페이지.

- 전시 기간: 2026년 11월 21일–12월 29일
- 전시 장소: 물빛복합문화센터 2층 물빛 1·2관
- 주소: 논산시 가야곡면 탑정로 836

## 구성

모바일 중심 단일 페이지이며 PC에서는 중앙 480px 화면과 좌우 여백을 사용합니다.
작품 확대 감상, 작가의 글, 캘린더 일정 저장, 지도 연결, 주소 복사, 공유하기, 작가 이메일 문의 기능이 포함되어 있습니다.

## 로컬 실행

별도 패키지 설치나 빌드가 필요하지 않습니다.

```sh
python3 -m http.server 8080 --directory dist
```

브라우저에서 http://localhost:8080 을 엽니다.

## 파일

- `dist/index.html`: 전시 내용
- `dist/style.css`: 모바일 및 PC 스타일
- `dist/app.js`: 작품 확대, 공유, 주소 복사
- `dist/assets/`: 웹용 작품 이미지, 포스터, 전시 일정
- `.openai/hosting.json`: Sites 배포 설정

현재 공유 링크는 https://campingmap.github.io/yeonhwa/ 를 사용합니다. 다른 주소로 배포할 경우 `dist/app.js`의 `EXHIBITION_URL`과 `dist/index.html`의 `og:image`를 갱신합니다.
카카오톡 공유는 앱 `1637962`의 사용자 정의 템플릿 `138624`를 사용합니다. Kakao JavaScript SDK 2.8.4를 불러오며, JavaScript 키에 등록된 SDK 도메인에서 동작합니다. 메시지 내용과 홈페이지·지도 버튼 링크는 카카오 템플릿 편집기에서 관리합니다.

작품 이미지의 저작권은 작가에게 있습니다.

## GitHub Pages

`gh-pages` 브랜치에서 정적 사이트를 배포합니다. `main`의 `dist/` 폴더를 갱신한 뒤 다음 명령으로 반영합니다.

```sh
git subtree split --prefix dist -b pages-release
git push github pages-release:gh-pages
git branch -D pages-release
```
