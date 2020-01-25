import React, {Component} from 'react';

import './DatePicker.css';

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
	
	convertToObj(opts, value){
		return {
			type: opts.type,
			month: opts.month,
			year: opts.year,
			value
		};
	}

	render(){
		const daysOftheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let daysInMonth = this.getDaysInMonth(this.state.chosenMonth, this.state.chosenYear);
		let chosenDate = new Date(`${this.state.chosenYear}-${this.props.formatMonth(this.state.chosenMonth)}-${this.state.chosenDate+1}`)
		let firstDay = chosenDate.getDay();
		chosenDate.setDate(daysInMonth);
		let lastDay = chosenDate.getDay();
		let prevMonthDays;
		let dates = [];
		if(firstDay !== 0){
			let {chosenYear:prevYear, chosenMonth: prevMonth} = this.props.getPrevMonth(this.state.chosenMonth, this.state.chosenYear);
			let year = prevYear ? prevYear : this.state.chosenYear;
			prevMonthDays = this.getDaysInMonth(prevMonth, year);
			dates = dates.concat(this.numberRangeToArray(prevMonthDays - firstDay + 1, prevMonthDays).map(this.convertToObj.bind(this, {type: 'passive', month: prevMonth, year})));
		}
		debugger
		dates = dates.concat(this.numberRangeToArray(1, daysInMonth).map(this.convertToObj.bind(this, {type: 'active', month: this.state.chosenMonth, year: this.state.chosenYear})));
		if(lastDay !== 6){
			let {chosenYear:nextYear, chosenMonth: nextMonth} = this.props.getNextMonth(this.state.chosenMonth, this.state.chosenYear);
			let year = nextYear ? nextYear : this.state.chosenYear;
			prevMonthDays = this.getDaysInMonth(nextMonth, year);
			dates = dates.concat(this.numberRangeToArray(1, 6 - lastDay).map(this.convertToObj.bind(this, {type: 'passive', month: nextMonth, year})));
		}
		return (
			<div className="datepicker flex--column">
				<div className="header flex--row">
					{daysOftheWeek.map((day) => <div key={day} className="day-item flex--row-acall">{day}</div>)}
				</div>
				<div className="dates flex--column">
					{dates.map((item)=> <div key={`${item.value}-${item.month}`} className={[item.type, 'flex--row-acall', 'cp', 'date-item'].join(' ')}>{item.value}</div>)}
				</div>
			</div>
		)
	}
}