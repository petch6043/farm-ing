import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccineurgent: {
				vac_name: "",
				vac_id: 0,
				required: 0,
				age: 0
			}
		}
		this.addClick2 = this.addClick2.bind(this);
	}

	addClick2() {
		let {onAdd2} = this.props;
		console.log(this.state.vaccineurgent);
		onAdd2(this.state.vaccineurgent);
		this.setState({
			vaccineurgent: {
				
				vac_name: "",
				vac_id: 0,
				required: 0,
				age: 0
			}
		});
	}

	render() {
		let {vaccineurgent} = this.state;
		return(
			<div>
          		
          <input
          value={vaccineurgent.vac_name}
          onChange={e => this.setState({ vaccineurgent: { ...vaccineurgent, vac_name: e.target.value }})}
          />
          

          
          
          <button onClick={this.addClick2}>Add vaccine name</button>
        </div>
		);
	}
}

export default Add;