import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccineprogram: {
				vac_id: "",
				pen_id: 0,
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.vaccineprogram);
		onAdd(this.state.vaccineprogram);
		this.setState({
			vaccineprogram: {
				
				vac_id: "",
				pen_id: 0,
			}
		});
	}

	render() {
		let {vaccineprogram} = this.state;
		return(
			<div>
          		
          <input
          value={vaccineprogram.vac_id}
          onChange={e => this.setState({ vaccineprogram: { ...vaccineprogram, vac_id: e.target.value }})}
          />
          <input
          value={vaccineprogram.pen_id}
          onChange={e => this.setState({ vaccineprogram: { ...vaccineprogram, pen_id: e.target.value }})}
          />
          
          <button onClick={this.addClick}>Add vaccine program</button>
        </div>
		);
	}
}

export default Add;