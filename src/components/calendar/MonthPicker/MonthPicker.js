import React, {Component} from 'react';
import GenericCalendarContent from '../GenericCalendarContent/GenericCalendarContent';

import './MonthPicker.css'

export default class MonthPicker extends Component{
	clickHandler(event){
		if(event.target.classList.contains('calendar-month')){
			this.props.updateParentState({'calendarMonth': parseInt(event.target.getAttribute('value')), view: 'calendar'});
		}
	}

	isCurrentMonth(month, year){
		return month === this.props.calendarMonth && this.props.calendarYear === this.props.chosenYear;
	}

	render(){
		return (
			<GenericCalendarContent>
				<div onClick={(evt) => this.clickHandler(evt)} className="calendar-container">
					{this.props.months.map((month, index) => <div className={['calendar-month cp', this.isCurrentMonth(index) ? 'selected' : ''].join(' ')} value={index} key={month}>{month}</div>)}
				</div>
			</GenericCalendarContent>
		)
	}
}