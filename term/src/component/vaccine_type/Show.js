import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {vaccinetypeList} = this.props;
		return(
			<div>
				<div>Vaccinetype list:</div>
				{vaccinetypeList.map(item => <div id={"item" + item.type_id}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;