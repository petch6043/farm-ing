import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transfer: {
				pen_id: 0,
				type: "",
				value: 0,
				user_id: 0
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.transfer);
		onAdd(this.state.transfer);
		this.setState({
			transfer: {
				pen_id: 0,
				type: "",
				value: 0,
				user_id: 0
			}
		});
	}

	render() {
		let {transfer} = this.state;
		return(
			<div>
          		<input
          value={transfer.pen_id}
          onChange={e => this.setState({ transfer: { ...transfer, pen_id: e.target.value }})}
          />
          <input
          value={transfer.type}
          onChange={e => this.setState({ transfer: { ...transfer, type: e.target.value }})}
          />
          <input
          value={transfer.value}
          onChange={e => this.setState({ transfer: { ...transfer, value: e.target.value }})}
          />
          <input
          value={transfer.user_id}
          onChange={e => this.setState({ transfer: { ...transfer, user_id: e.target.value }})}
          />
          <button onClick={this.addClick}>Add product</button>
        </div>
		);
	}
}

export default Add;