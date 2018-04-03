import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccine: {
				vac_id: 0,
				vac_name: "",
				type_id: 0,
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.vaccine);
		onAdd(this.state.vaccine);
		this.setState({
			vaccine: {
				vac_id: 0,
				vac_name: "",
				type_id: 0,
			}
		});
	}

	render() {
		let {vaccine} = this.state;
		return(
			<div>
          		<input
          value={vaccine.vac_id}
          onChange={e => this.setState({ vaccine: { ...vaccine, vac_id: e.target.value }})}
          />
          <input
          value={vaccine.vac_name}
          onChange={e => this.setState({ vaccine: { ...vaccine, vac_name: e.target.value }})}
          />
          <input
          value={vaccine.type_id}
          onChange={e => this.setState({ vaccine: { ...vaccine, type_id: e.target.value }})}
          />
          
          <button onClick={this.addClick}>Add vaccine</button>
        </div>
		);
	}
}

export default Add;