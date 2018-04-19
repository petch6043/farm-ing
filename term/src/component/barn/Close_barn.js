import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}



class myForm extends Component {
	constructor(props) {
		super(props);
	}

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
    	const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (



      <Form onSubmit={this.handleSubmit}>
				<FormItem>
					<Button type="primary" ghost htmlType="submit" className="login-form-button">Submit</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class Close_barn extends Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}

	send(barn) {
		let {onAdd} = this.props;
		onAdd(barn);
	}


	render() {
		let {BarnList} = this.props;
		return(
			<div>
				<AddForm send={this.send} BarnList={BarnList}/>
        	</div>
		);
	}
}

export default Close_barn;