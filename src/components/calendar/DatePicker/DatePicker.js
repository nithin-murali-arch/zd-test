import React, {Component} from 'react';

import './DatePicker.css';
import ImageHolder from '../../essentials/image-holder/ImageHolder';

export default class DatePicker extends Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	static getDerivedStateFromProps(props, state){
		// eslint-disable-next-line react/no-direct-mutation-state
		return props;
	}

	getDaysInMonth(month, year){
		let oddDays = [0, 2, 4, 6, 7, 9, 11];
		// let even = [3, 5, 8, 10];
		let special = 1;
		if(month === special && year % 4 === 0){
			return 29;
		}
		else if(month === special){
			return 28;
		}
		else if(oddDays.includes(month)){
			return 31;
		}
		else{
			return 30;
		}
	}

	numberRangeToArray(start, end){
		let array = [];
		for(let i = start; i <= end; i++){
			array.push(i);
		}
		return array;
	}
	//TODO function needs cleanup
	convertToObj(opts, value){
		let dateNotation = `${opts.year}-${this.padZero(opts.month + 1)}-${this.padZero(value)}`;
		let today = this.state.today;
		today.setHours(0, 0, 0, 0);
		let dateObj = new Date(dateNotation);
		dateObj.setHours(0, 0, 0, 0);
		let chosenDateNotation = `${this.state.chosenYear}-${this.padZero(this.state.chosenMonth + 1)}-${this.padZero(this.state.chosenDate)}`;
		let chosenDate = new Date(chosenDateNotation);
		chosenDate.setHours(0, 0, 0, 0);
		return {
			type: opts.type,
			month: opts.month,
			year: opts.year,
			isToday: dateObj.getTime() === today.getTime(),
			isSelected: dateObj.getTime() === chosenDate.getTime(),
			dateNotation,
			value
		};
	}

	dateMouseoverHandler(event){
		if(event.target.classList.contains('date-item') && !event.target.classList.contains('disabled') && this.state.targetElement !== event.target){
			this.setState({targetElement: event.target});
		}
	}

	dateMouseoutHandler(event){
		if(event.target.classList.contains('date-item')){
			this.setState({targetElement: null});
		}
	}

	padZero(month){
		return `0${month}`.slice(-2);
	}

	shouldDisableDate(dateNotation){
		let date = new Date(dateNotation);
		date.setHours(0,0,0,0);
		return date > this.props.today ? 'disabled' : '';
	}

	clickHandler(event){
		if(event.target.classList.contains('date-item') && !event.target.classList.contains('disabled')){
			let chosenDate = new Date(event.target.getAttribute('value'));
			this.state.updateParentState({'chosenDate': chosenDate.getDate(), chosenMonth: chosenDate.getMonth(), chosenYear: chosenDate.getFullYear()});
		}
	}

	render(){
		const daysOftheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let daysInMonth = this.getDaysInMonth(this.state.calendarMonth, this.state.calendarYear);
		let chosenDate = new Date(`${this.state.calendarYear}-${this.props.formatMonth(this.state.calendarMonth)}-01`)
		let firstDay = chosenDate.getDay();
		chosenDate.setDate(daysInMonth);
		let lastDay = chosenDate.getDay();
		let prevMonthDays;
		let dates = [];
		if(firstDay !== 0){
			let {chosenYear:prevYear, chosenMonth: prevMonth} = this.props.getPrevMonth(this.state.calendarMonth, this.state.calendarYear);
			let year = prevYear ? prevYear : this.state.calendarYear;
			prevMonthDays = this.getDaysInMonth(prevMonth, year);
			dates = dates.concat(this.numberRangeToArray(prevMonthDays - firstDay + 1, prevMonthDays).map(this.convertToObj.bind(this, {type: 'passive', month: prevMonth, year})));
		}
		dates = dates.concat(this.numberRangeToArray(1, daysInMonth).map(this.convertToObj.bind(this, {type: 'active', month: this.state.calendarMonth, year: this.state.calendarYear})));
		if(lastDay !== 6){
			let {chosenYear:nextYear, chosenMonth: nextMonth} = this.props.getNextMonth(this.state.chosenMonth, this.state.chosenYear);
			let year = nextYear ? nextYear : this.state.chosenYear;
			prevMonthDays = this.getDaysInMonth(nextMonth, year);
			dates = dates.concat(this.numberRangeToArray(1, 6 - lastDay).map(this.convertToObj.bind(this, {type: 'passive', month: nextMonth, year})));
		}

		let targetElement = this.state.targetElement ? <ImageHolder imagesCache={this.state.imagesCache} targetElement={this.state.targetElement}/> : null;

		return (
			<div className="datepicker pR flex--column" onClick={(evt) => this.clickHandler(evt)} onMouseOver={(evt) =>this.dateMouseoverHandler(evt)} onMouseOut={(evt) =>this.dateMouseoutHandler(evt)}>
				<div className="header flex--row">
					{daysOftheWeek.map((day) => <div key={day} className="day-item flex--row-acall">{day}</div>)}
				</div>
				<div className="dates pR flex--column">
					{dates.map((item)=> <div key={item.dateNotation} value={item.dateNotation} className={[item.type, this.shouldDisableDate(item.dateNotation), item.isToday ? 'today' : '', item.isSelected ? 'selected' : '', 'flex--row-acall', 'cp', 'date-item'].join(' ')}>{item.value}</div>)}
					{targetElement}
				</div>
			</div>
		)
	}
}