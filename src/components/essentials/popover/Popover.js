import React, {Component} from 'react';

import './Popover.css';

export default class Popover extends Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	static getDerivedStateFromProps(props, state) {
		state = {};
		let ele = props.parentElement;
		if(ele){
			state.left = ele.offsetLeft + (ele.clientWidth / 2) - 10;
			state.top = ele.offsetTop + (ele.clientHeight) + 10;
		}
		return state;
	}

	render(){
		return (
			<div className="popover-ctr pA" style={{left: `${this.state.left}px`, top: `${this.state.top}px`}}>
				{this.props.children}
			</div>
		)
	}
}