import React, { Component } from 'react';
import Kanban from '../Components/Kanban';
import 'whatwg-fetch';
import update from 'react-addons-update';

//API (서버에서 고유한 사용자를 식별하기 위해서 헤더에 고유 문자열을 전송해야함)
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type':'application/json',
    Authorization: 'witinweb'
};

class KanbanContainer extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            cards:[]
        };
    }

    componentDidMount(){
        fetch(API_URL+'/cards', {header: API_HEADERS})
            .then((response) => response.json())
            .then((responsData) => {
                this.setState({cards: responsData})
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error)
            });
    }
    
    addTask(cardId, taskName){
        
    }
    
    deleteTask(cardId, taskId, taskIndex){
        // 카드 인덱스 찾기
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        // 해당 태스크를 제외한 새로운 객체를 생성
        let nextState = update(this.state.cards, {
            [cardIndex] : {
                tasks: {$splice: [[taskIndex,1]] }
            }
        });

        // 변경된 객체로 컴포넌트 상태를 설정
        this.setState({cards:nextState});

        // API를 호출해 서버에서 해당 태스크를 제거한다
        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'delete',
            headers: API_HEADERS
        });
    }
    
    toggleTask(cardId, taskId, taskIndex){
        
    }
    
    render(){
        return (
            <Kanban cards={this.state.cards} 
                    taskCallbacks={{
                         toggle: this.toggleTask.bind(this),
                         delete:this.deleteTask.bind(this),
                         add: this.addTask.bind(this) }} />
        )
    }
}

export default KanbanContainer;