//libraries
import { compareAsc, format } from 'date-fns';
import _ from 'lodash';
//css
import './style.css';
//img
import arrow from './img/arrow-down-sign-to-navigate.png';
import clock from './img/clock.png';
import trash from './img/trash-can.png';
import pencil from './img/pencil.png';
//functions
import { showdivs, addTask, closeTask } from './dom-control';
import { addNotes, loadNotes } from './project-creation';



showdivs();
addTask();
closeTask();
addNotes();
loadNotes();