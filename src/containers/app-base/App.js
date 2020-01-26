import React, {Component} from 'react';
import styles from './App.module.css';
import Calendar from '../../components/calendar/Calendar';
import utils from '../../utils/utils';

export default class App extends Component{

	constructor(props){
		super(props);
		let date = new Date();
		this.state = {};
		let currentMonth = `0${date.getMonth()+1}`.slice(-2);
		let currentDate = `0${date.getDate()}`.slice(-2);
		this.state.date = `${date.getFullYear()}-${currentMonth}-${currentDate}`;
		this.state.zafClient = ZAFClient.init();// eslint-disable-line no-undef
		this.updateChosenDate(this.state.date);
	}

	async updateChosenDate(date){
		utils.loadNasaImage(date).then((res)=>{
			this.setState({imageURL: res.url, date, description: res.explanation});
		});
	}

	launchModal(){
		this.state.zafClient.invoke('instances.create', {
			location: 'modal',
			url: 'assets/image.html#' + encodeURIComponent(this.state.imageURL)
		}).then((modalContext) => {
			// The modal is on the screen now!
			let modalClient = this.state.zafClient.instance(modalContext['instances.create'][0].instanceGuid);
			modalClient.on('modal.close', function() {
			  // The modal has been closed.
			});
		  });
	}

	imageErrorHandler(){
		this.setState({imageURL: 'https://www.elegantthemes.com/blog/wp-content/uploads/2016/03/500-internal-server-error-featured-image-1.png'})
	}

	render(){
		let imageComponent = this.state.imageURL ? <img title={this.state.description} onError={(evt) => this.imageErrorHandler(evt)} onClick={(evt)=>this.launchModal(evt)} src={this.state.imageURL} className={styles.days_image} alt="NASA photography"/> : <div className="loader"></div>;
		return (
			<div className={styles.app_tab}>
				<div className={styles.image_ctr}>
					<span className={styles.date_placeholder}>NASA's Photo of the Day - {this.state.date}</span>
					{imageComponent}
				</div>
				<div className={styles.calendar_ctr}>
					<Calendar updateImage={this.updateChosenDate.bind(this)}></Calendar>
				</div>
			</div>
		);
	}
}