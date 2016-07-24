let cardsList = [
  {
    "id": 1,
    "title": "React Study",
    "description": "리엑트를 마스터 하자",
    "color" : "#3A7E28",
    "status": "in-progress",
    "tasks": []
  },
  {
    "id": 2,
    "title": "Redux Study",
    "description": "Redux 뽀개기",
    "color" : "blue",
    "status": "todo",
    "tasks": []
  },
  {
    "id": 3,
    "title": "Webpack Study",
    "description": "Webpack 환경설정 및 기능 학습",
    "color": "#BD8D31",
    "status": "done",
    "tasks": [
      {
        "id": 1,
        "name": "Webpack 설치하기",
        "done": true
      },
      {
        "id": 2,
        "name": "ES6, Reack loader 추가",
        "done": true
      },
      {
        "id": 3,
        "name": "개발, 빌드 환경 분리",
        "done": true
      },
      {
        "id": 4,
        "name": "CSS loader 추가",
        "done": false
      }
    ]
  },

];

export default cardsList