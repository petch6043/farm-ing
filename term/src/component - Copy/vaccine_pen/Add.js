import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccinepen: {
				vac_id: "",
				pen_id: 0,
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.vaccinepen);
		onAdd(this.state.vaccinepen);
		this.setState({
			vaccinepen: {
				
				vac_id: "",
				pen_id: 0,
			}
		});
	}

	render() {
		let {vaccinepen} = this.state;
		return(
			<div>
          		
          <input
          value={vaccinepen.vac_id}
          onChange={e => this.setState({ vaccinepen: { ...vaccinepen, vac_id: e.target.value }})}
          />
          <input
          value={vaccinepen.pen_id}
          onChange={e => this.setState({ vaccinepen: { ...vaccinepen, pen_id: e.target.value }})}
          />
          
          <button onClick={this.addClick}>Add vaccinepen</button>
        </div>
		);
	}
}

export default Add;