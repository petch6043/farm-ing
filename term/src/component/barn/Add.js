import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox } from 'antd';
const FormItem = Form.Item;

class myForm extends Component {
	handleSubmit = (e) => {
		let {send} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				send(values);
				this.props.form.resetFields();
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					{getFieldDecorator('name', {
					rules: [{ required: true, message: 'Please input Barn ID!' }],
					})(<Input placeholder="Barn ID" />)}
				</FormItem>
				<FormItem className="myFormItem">
					{getFieldDecorator('user_id', {
					rules: [{ required: true, message: 'Please input User ID!' }],
					})(<Input placeholder="User ID" />)}
				</FormItem>
				
				<FormItem>
					<Button type="primary" ghost htmlType="submit" className="login-form-button">Submit</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class Add extends Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}

	send(barn) {
		let {onAdd} = this.props;
		onAdd(barn);
	}


	render() {
		return(
			<div>
				<AddForm send={this.send}/>
        	</div>
		);
	}
}

export default Add;