import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {transferList} = this.props;
		return(
			<div>
				<div>Transfer list:</div>
				{transferList.map(item => <div id={"item" + item.tran_id}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;