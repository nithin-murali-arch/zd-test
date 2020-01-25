/* eslint-disable default-case */
import React, {Component} from 'react';
import DatePicker from './DatePicker/DatePicker';
import MonthPicker from './MonthPicker/MonthPicker';
import YearPicker from './YearPicker/YearPicker';
import CenturyPicker from './CenturyPicker/CenturyPicker';

import './Calendar.css'

export default class Calendar extends Component{
	constructor(props){
		super(props);
		let date = new Date();
		this.state = {
			currentMonth: date.getMonth(),
			currentDate: date.getDate(),
			currentYear: date.getFullYear(),
			todaysMonth: date.getMonth(),
			todaysDate: date.getDate(),
			todaysYear: date.getFullYear(),
			chosenYear: date.getFullYear(),
			chosenMonth: date.getMonth(),
			chosenDate: null,
			view: 'calendar',
			yearRangeStart: date.getFullYear() - 9,
			yearRangeEnd: date.getFullYear() ,
			centuryRangeStart: (date.getFullYear() - (date.getFullYear()%100)) + 1,
			centuryRangeEnd: (date.getFullYear() - (date.getFullYear()%100)) + 100
		}
	}

	updateState(key, value){

	}

	changeView(){
		let newView;
		const date = new Date();
		let extras = {};
		switch(this.state.view){
			case 'calendar': newView = 'monthPicker';break;
			case 'monthPicker': {
				newView = 'yearPicker';
				this.setState({
					yearRangeStart: date.getFullYear() - 9,
					yearRangeEnd: date.getFullYear() 
				});
				break;
			}
			default: {
				newView = 'centuryPicker';
				extras ={
					centuryRangeStart: (date.getFullYear() - (date.getFullYear()%100)) + 1,
					centuryRangeEnd: (date.getFullYear() - (date.getFullYear()%100)) + 100
				};
			}
		}
		if(this.state.view !== newView){
			this.setState({view: newView, ...extras});
		}
	}

	nextMonth(){
		if(this.state.chosenMonth === 11){
			this.setState({chosenMonth: 0, chosenYear: this.state.chosenYear + 1});
		}
		else{
			this.setState({chosenMonth: this.state.chosenMonth + 1});
		}
	}

	prevMonth(){
		if(this.state.chosenMonth === 0){
			this.setState({chosenMonth: 11, chosenYear: this.state.chosenYear - 1});
		}
		else{
			this.setState({chosenMonth: this.state.chosenMonth - 1});
		}
	}

	calendarActionsHandler(action){
		if(this.state.view === 'calendar'){
			switch(action){
				case 'right': this.nextMonth();break;
				case 'left': this.prevMonth();break;
				case 'hard-right': this.setState({chosenYear: this.state.chosenYear + 1});break;
				case 'hard-left': this.setState({chosenYear: this.state.chosenYear - 1});break;
			}
		}
		else if(this.state.view === 'monthPicker'){
			switch(action){
				case 'right': this.setState({chosenYear: this.state.chosenYear + 1});break;
				case 'left': this.setState({chosenYear: this.state.chosenYear - 1});break;
				case 'hard-right': this.setState({chosenYear: this.state.chosenYear + 10});break;
				case 'hard-left': this.setState({chosenYear: this.state.chosenYear - 10});break;
			}
		}
		else if(this.state.view === 'yearPicker'){
			switch(action){
				case 'right': {
					this.setState({
						yearRangeStart: this.state.yearRangeStart + 10,
						yearRangeEnd: this.state.yearRangeEnd + 10
					});
					break;
				}
				case 'left': {
					this.setState({
						yearRangeStart: this.state.yearRangeStart - 10,
						yearRangeEnd: this.state.yearRangeEnd - 10
					});
					break;
				}
				case 'hard-right': {
					this.setState({
						yearRangeStart: this.state.yearRangeStart + 100,
						yearRangeEnd: this.state.yearRangeEnd + 100
					});
					break;
				}
				case 'hard-left': {
					this.setState({
						yearRangeStart: this.state.yearRangeStart - 100,
						yearRangeEnd: this.state.yearRangeEnd - 100
					});break;
				}
			}
		}
		else if(this.state.view === 'centuryPicker'){
			switch(action){
				case 'right': {
					this.setState({
						centuryRangeStart: this.state.centuryRangeStart + 100,
						centuryRangeEnd: this.state.centuryRangeEnd + 100
					});
					break;
				}
				case 'left': {
					this.setState({
						centuryRangeStart: this.state.centuryRangeStart - 100,
						centuryRangeEnd: this.state.centuryRangeEnd - 100
					});
					break;
				}
			}
		}
	}

	topBarEventHandler(evt){
		if(evt.target.classList.contains('center')){
			this.changeView();
		}
		else if(evt.target.classList.contains('hard-right')){
			this.calendarActionsHandler('hard-right');
		}
		else if(evt.target.classList.contains('hard-left')){
			this.calendarActionsHandler('hard-left');
		}
		else if(evt.target.classList.contains('left')){
			this.calendarActionsHandler('left');
		}
		else if(evt.target.classList.contains('right')){
			this.calendarActionsHandler('right');
		}
	}

	formatMonth(month){
		switch(month){
			case 0: return 'January';
			case 1: return 'February';
			case 2: return 'March';
			case 3: return 'April';
			case 4: return 'May';
			case 5: return 'June';
			case 6: return 'July';
			case 7: return 'August';
			case 8: return 'September';
			case 9: return 'October';
			case 10: return 'November';
			case 11: return 'December';
			default: return ''
		}
	}

	render(){
		let renderComponent;
		let topContent;
		switch(this.state.view){
			case 'calendar': {
				renderComponent = <DatePicker {...this.state} updateParentState={this.updateState.bind(this)}></DatePicker>;
				topContent = `${this.formatMonth(this.state.chosenMonth)} ${this.state.chosenYear}`;
				break;
			}
			case 'monthPicker': {
				renderComponent = <MonthPicker {...this.state} updateParentState={this.updateState.bind(this)}></MonthPicker>;
				topContent = this.state.chosenYear;
				break;
			}
			case 'yearPicker':  {
				renderComponent = <YearPicker {...this.state} updateParentState={this.updateState.bind(this)}></YearPicker>;
				topContent = `${this.state.yearRangeStart} - ${this.state.yearRangeEnd}`;
				break;
			}
			default: {
				renderComponent = <CenturyPicker {...this.state} updateParentState={this.updateState.bind(this)}></CenturyPicker>;
				topContent = `${this.state.centuryRangeStart} - ${this.state.centuryRangeEnd}`;
				break;
			} 
		}
		return (
			<div className="calendar-ctr flex--column">
				<div className="calendar-topbar flex--row-ac" onClick={(evt) => this.topBarEventHandler(evt)}>
					<div className="left-box flex--row-ac">
						<div className={['hard-left cp flex--row-acall', this.state.view === 'centuryPicker' ? 'dn': ''].join(' ')}>&lt;&lt;</div>
						<div className="left cp flex--row-acall">&lt;</div>
					</div>
					<div className="center cp flex--one flex--row-acall">
						{topContent}
					</div>
					<div className="right-box  flex--row-ac cp">
						<div className={['hard-right cp flex--row-acall', this.state.view === 'centuryPicker' ? 'dn': ''].join(' ')}>&gt;&gt;</div>
						<div className="right flex--row-acall cp">&gt;</div>
					</div>
					
				</div>
				<div className="date-component-ctr">
					{renderComponent}
				</div>
			</div>
		);
	}
}