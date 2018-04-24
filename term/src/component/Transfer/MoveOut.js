import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class myForm extends Component {
	handleSubmit = (e) => {
		let {send} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {

				send(values);
				console.log(values)
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
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					<div className="myInput">
          			{
          				getFieldDecorator('type', {
            				rules: [{required: true, message: 'กรุณาใส่ประเภท!' }]
            			})
            			(
            				<Select placeholder="เลือกประเภท" className="myBigFont">
            					<Option value='ขาย'><div className="myBigFont">ขาย</div></Option>
			   					<Option value='ตาย'><div className="myBigFont">ตาย</div></Option>
			   					<Option value='ป่วย'><div className="myBigFont">ป่วย</div></Option>
			   					<Option value='แกร็น'><div className="myBigFont">แกร็น</div></Option>
			   					<Option value='พิการ'><div className="myBigFont">พิการ</div></Option>
			   				</Select>
			   			)
            		}
            		</div>
        		</FormItem>

				<FormItem className="myFormItem">
					{
						getFieldDecorator('value', {
							rules: [{ required: true, message: 'เลือกจำนวน' }]
						})
						(
							<div className="myInput">
								<Input placeholder="จำนวน" className="myBigFont"/>
							</div>
						)
					}
				</FormItem>
				
				<FormItem>
					<Button type="primary" ghost htmlType="submit" className="login-form-button mySubmitButton">ยืนยัน</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class MoveOut extends Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}

	send(transfer) {
		let {onAdd} = this.props;
		onAdd(transfer);
	}


	render() {
		return(
			<div>
				<AddForm send={this.send}/>
        	</div>
		);
	}
}

export default MoveOut;