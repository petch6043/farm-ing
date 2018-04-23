import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {vaccinepenList} = this.props;
		return(
			<div>
				<div>Vaccinepen list:</div>
				{vaccinepenList.map(item => <div id={"item" + item.vac_id}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;