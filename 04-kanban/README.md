## API 서버를 통한 초기 데이터 가져오기

### 컨테이너 컴포넌트 생성(Kanban Container)

- window.fetch 이용, fetch polyfil 설치
- `npm install --save whatwg-fetch`
- `import 'whatwg-fetch`
- pro-react에서 제공하는 테스트 API를 이용 (http://kanbanapi.pro-react.com)

## 태스크 콜백을 속성과 연결

### addTask, deleteTask, toggleTask

### 태스크를 조작하기 위해서 리액트의 불변성 도우미를 이용

- `npm install --save react-addons-update`
- `import update from 'react-addons-update`
- 실제로 객체를 변경하는 대신 변경된 새로운 객체를 반환