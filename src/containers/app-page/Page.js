import React from 'react';
import App from '../app-base/App';

import styles from './Page.module.css'

function Page() {
  return (
    <div className={styles.page}>
		<App></App>
	</div>
  );
}

export default Page;