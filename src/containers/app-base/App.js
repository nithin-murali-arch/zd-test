import React from 'react';
import styles from './App.module.css';
import Calendar from '../../components/calendar/Calendar';

function App() {
  return (
    <div className={styles.app_tab}>
		<Calendar></Calendar>
	</div>
  );
}

export default App;
