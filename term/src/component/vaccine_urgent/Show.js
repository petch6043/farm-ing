import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {vaccineurgentList} = this.props;
		return(
			<div>
				<div>Vaccineurgent list:</div>
				{vaccineurgentList.map(item => <div id={"item"+item.vac_name}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;