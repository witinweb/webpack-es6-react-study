import React, { Component } from 'react';
import Kanban from '../Components/Kanban';
import 'whatwg-fetch';

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
    
    render(){
        return <Kanban cards={this.state.cards} />
    }
}

export default KanbanContainer;