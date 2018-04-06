import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {vaccineprogramList} = this.props;
		return(
			<div>
				<div> Vaccine Program:</div>
				{vaccineprogramList.map(item => <div id={"item" + item.vac_name}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;