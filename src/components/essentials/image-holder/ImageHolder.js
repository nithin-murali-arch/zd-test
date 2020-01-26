/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {Component} from 'react';

import Popover from '../popover/Popover';

import utils from '../../../utils/utils';

import './ImageHolder.css'

export default class ImageHolder extends Component{

	constructor(props){
		super(props);
		this.state = {};
		let date = props.targetElement.getAttribute('value');
		utils.loadNasaImage(date).then((res)=>{
			if(!this.unMounted){
				this.setState({imageURL: res.url});	
			}
		});
	}

	componentWillUnmount(){
		this.unMounted = true;
	}

	imageLoadErroHandler(){
		debugger;
		this.setState({imageURL: 'https://www.elegantthemes.com/blog/wp-content/uploads/2016/03/500-internal-server-error-featured-image-1.png'})
	}

	render(){
		let component;
		if(this.state.imageURL){
			component = (
				<div className="image-ctr">
					<img onError={(evt) => this.imageLoadErroHandler(evt)} src={this.state.imageURL} className="image-thumbnail" alt="Nasa's image of the day"/>
				</div>
			);
		}
		else{
			component = (
				<div className="loader-ctr">
					<div className="loader image-thumbnail"></div>
				</div>
			);
		}
		return (
			<Popover parentElement={this.props.targetElement}>
				{component}
			</Popover>
		);
	}
}