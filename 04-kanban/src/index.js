import React from 'react';
import ReactDOM from 'react-dom';
//import KanbanContainer from './Container/KanbanContainer';
import Kanban from './Components/Kanban'
import './style.css';
import Cards from './cardsList.js';

let cardsList = Cards;

ReactDOM.render(
  <Kanban cards={cardsList} />,
  document.getElementById('root')
);
