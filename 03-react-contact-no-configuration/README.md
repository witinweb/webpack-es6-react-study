## 컴포넌트

- 상태를 관리하는 컴포넌트
- 데이터를 표시하는 순수 컴포넌트
- 컴포넌트는 대부분 순수 컴포넌트로 만드는게 좋다. 상태를 다수의 컴포넌트로 분산하면 관리가 힘들고 작동방식을 확인하기 어렵다. 


## 컴포넌트 계층

- ContactsApp : 주 컴포넌트 (상태관리 컴포넌트)
    - SearchBar : 사용자 연락처를 필터링할 수 있게 입력 필드를 표시(순수 컴포넌트)
    - ContactList : 데이터를 반복해서 여러 ContactItem 을 생성(순수 컴포넌트)
        - ContactItem : 연락처 데이터를 표시(순수 컴포넌트)


## 컴포넌트 생명주기 ((참고)[http://devpools.kr/2016/07/10/react-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%83%9D%EB%AA%85-%EC%A3%BC%EA%B8%B0/]) 

### 마운팅

- `componentWillMount` : 초기 렌더링을 수행하기 직전 한번 호출, 상태를 설정하더라도 렌더링이 다시 트리거되지 않는다
- `componentDidMount` : 초기 렌더링을 수행한 직후 한번 호출, 데이터 가져오기 등의 작업에 이용할 수 있다

### 언마운팅

- `componentWillUnMount` : 컴포넌트가 DOM에서 언마운팅 되기 직전 호출, 정리 작업을 해야할 때 유용

### 속성변경

- `componentWillReceiveProps` : 컴포넌트가 새 속성을 받을 때 호출, `this.setState()`를 호출해도 렌더링이 트리거 되지 않는다
- `shouldComponentUpdate` : render 함수보다 먼저 호출되는 특수한 함수, 해당 컴포넌트의 렌더링을 생략할 수 있는 기회를 제공, 성능최적화에 이용
- `componentWillUpdate` : 새로운 속성이나 상태를 수신하고 렌더링 하기 직전에 호출, 예정된 업데이트를 준비하는데만 이용해야함, 역시 상태변경 불가
- `render`
- `componentDidUpdate` : 컴포넌트 업데이트가 DOM으로 플러시된 직후 호출

### 상태변경

- 속성변경과 거의 동일한 생명주기, `componentWillReceiveProps`에 해당하는 메서드는 없다. 들어오는 속성 전환은 상태변경을 유발할 수 있지만 그 반대는 안됨, 상태 변경에 반응해 작업을 수행하려면 `componentWillUpdate`를 이용


## 컴포넌트 생명주기 활용

- 데이터를 json 파일로 분리 (`contacts.json`)
- `window.fetch` 함수를 이용 (polyfill 설치 : `npm install --save whatwg-fetch`)
- `ContactsAppContainer`라는 컴포넌트를 만들고 데이터를 가져오는 로직 추가
