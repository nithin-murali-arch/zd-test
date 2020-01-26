import React, {Component} from 'react';

import './GenericCalendarContent.css';

export default class GenericCalendarContent extends Component{
	render(){
		return (
			<div className="generic-calendar">
				{this.props.children}
			</div>
		)
	}
}