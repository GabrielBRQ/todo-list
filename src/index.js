//libraries
import { compareAsc, format } from 'date-fns';
import _ from 'lodash';
//css
import './style.css';
//img
import arrow from './img/arrow-down-sign-to-navigate.png'
//functions
import { showdivs, addTask, closeTask, loadNotes } from './dom-control';
import { addNotes } from './task-control';
import { submitFunction, changeCurrentProject } from './project-control';
import { loadProjects } from './localStorage-control';


showdivs();
addTask();
closeTask();
addNotes();
loadNotes();
submitFunction();
loadProjects();
changeCurrentProject();
