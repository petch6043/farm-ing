import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {vaccineList} = this.props;
		return(
			<div>
				<div>Vaccine list:</div>
				{vaccineList.map(item => <div id={"item" + item.vac_id}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;