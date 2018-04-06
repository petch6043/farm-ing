import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {reportList} = this.props;
		return(
			<div>
				<div>Daily Report:</div>
				{reportList.map(item => <div id={"item" + item.report_id}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;