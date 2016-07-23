import React from 'react';
import { render } from 'react-dom';
import Kanban from './components/Kanban';
import Cards from './json/cardsList.js';
import './style.css'

let cardsList = Cards;

render(<Kanban cards={cardsList} />, document.getElementById('app'));
