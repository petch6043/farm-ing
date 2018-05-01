import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class myForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMove: false
		}
		this.handleChange = this.handleChange.bind(this);
	}

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

	handleChange(value) {
	  if(value=='ย้ายไปเล้าอื่น'){
	  	this.setState({ selectedMove: true})
	  }else{
	  	this.setState({ selectedMove: false	})
	  }
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    	var show = this.state.selectedMove
    var allBarn = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					<div className="myInput">
          			{
          				getFieldDecorator('type', {
            				rules: [{required: true, message: 'กรุณาใส่ประเภท!' }]
            			})
            			(
            				<Select placeholder="เลือกประเภท" className="myBigFont" onChange={this.handleChange} >
            					<Option value='ขาย'><div className="myBigFont">ขาย</div></Option>
			   					<Option value='ตาย'><div className="myBigFont">ตาย</div></Option>
			   					<Option value='ป่วย'><div className="myBigFont">ป่วย</div></Option>
			   					<Option value='แกร็น'><div className="myBigFont">แกร็น</div></Option>
			   					<Option value='พิการ'><div className="myBigFont">พิการ</div></Option>
			   					<Option value='ย้ายไปเล้าอื่น'><div className="myBigFont">ย้ายไปเล้าอื่น</div></Option>
			   				</Select>
			   			)

            		}
            		</div>
        		</FormItem>
        		{ show &&
	        		<FormItem className="myFormItem">
						<div className="myInput">
						{
							getFieldDecorator('from_barn_name', {
	            				rules: [{required: true, message: 'กรุณาเลือกเล้า' }]
	          			})
							(
	            				<Select placeholder="เลือกเล้า" className="myBigFont">
	            				{  
	            					allBarn.map((x) =>
	            						<Option value={x} key={x}><div className="myBigFont">เล้า {x}</div></Option>
	            					)
	            				}
	            				</Select>
	          				)
						}
						</div>
	        		</FormItem>
        		}
        		
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