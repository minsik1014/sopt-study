![banner](./banner.png)

# SimMinSik

## 주차별 과제 배포

- [과제 기록 홈](https://minsik1014.github.io/sopt-study/)
- [1주차 자기소개 페이지](https://minsik1014.github.io/sopt-study/Week1/Homework/)
- [2주차 1 to 50 게임](https://minsik1014.github.io/sopt-study/Week2/Homework/one-to-fifty/)

2주차 게임은 조직 저장소의 `week2/homework` 브랜치에서 개발하고,
이 저장소에는 Vite로 빌드한 정적 파일을 배포합니다.
현재 배포 기준 커밋은 `929ff0b`입니다.

게임을 수정한 뒤에는 원본 프로젝트에서 다음 명령으로 빌드하고,
생성된 `dist/` 내용을 이 저장소의 `Week2/Homework/one-to-fifty/`에 반영합니다.

```sh
npm ci
npm run build
```

주차별 링크는 루트 `index.html`에서 관리합니다.

## 배포 전용 홈 버튼

각 과제 상단의 `← 전체 과제` 메뉴는 이 개인 저장소에만 추가합니다.
조직 저장소의 원본 과제와 PR 코드는 변경하지 않습니다.

과제 HTML을 옮기거나 React 빌드 결과를 갱신한 뒤,
이 저장소 루트에서 다음 명령을 실행하면 메뉴가 다시 추가됩니다.
여러 번 실행해도 메뉴가 중복되지 않습니다.

```sh
node scripts/add-deployment-navigation.mjs
```

공통 스타일은 `deployment-navigation.css`에서 관리합니다.
새 주차를 배포할 때는 스크립트의 `pages` 목록에도 경로와 제목을 추가합니다.
