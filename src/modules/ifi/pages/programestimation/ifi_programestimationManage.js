// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_programestimationManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
	department_fid:'',
	department_fidOptions:[],
	class_fid:'',
	class_fidOptions:[],
	programmaketype_fid:'',
	programmaketype_fidOptions:[],
	totalprogramcount:'',
	timeperprogram:'',
	is_haslegalproblem:'',
	approval_date:moment().format('X'),
	end_date:moment().format('X'),
	add_date:moment().format('X'),
	producer_employee_fid:'',
	producer_employee_fidOptions:[],
	executor_employee_fid:'',
	executor_employee_fidOptions:[],
	paycenter_fid:'',
	paycenter_fidOptions:[],
	makergroup_paycenter_fid:'',
	makergroup_paycenter_fidOptions:[],
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/programestimations/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
		if(data.approval_date<=0)
                    data.approval_date=moment().format('X');
		if(data.end_date<=0)
                    data.end_date=moment().format('X');
		if(data.add_date<=0)
                    data.add_date=moment().format('X');
                 this.setState({ title:data.title,department_fid:data.department_fid,class_fid:data.class_fid,programmaketype_fid:data.programmaketype_fid,totalprogramcount:data.totalprogramcount,timeperprogram:data.timeperprogram,is_haslegalproblem:data.is_haslegalproblem,approval_date:data.approval_date,end_date:data.end_date,add_date:data.add_date,producer_employee_fid:data.producer_employee_fid,executor_employee_fid:data.executor_employee_fid,paycenter_fid:data.paycenter_fid,makergroup_paycenter_fid:data.makergroup_paycenter_fid,});
        
            });
        }
fetch('http://ifi.test/api/ifi/departments')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({department_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/classs')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({class_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/programmaketypes')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({programmaketype_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/producer_employees')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({producer_employee_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/executor_employees')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({executor_employee_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/paycenters')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({paycenter_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/makergroup_paycenters')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({makergroup_paycenter_fidOptions:Options})
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_programestimationManage</p>
                        
                        <div className='grey-text'>
                            <MDBInput
                                label='عنوان'
                                group
                                type='text'
                                validate
                                value={this.state.title}
                                onChange={(event)=>{this.setState({title:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.department_fid} onChange={(event)=>{this.setState({department_fid:event.target.value})}}>
                                <option>department_fid</option>
                                {this.state.department_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.class_fid} onChange={(event)=>{this.setState({class_fid:event.target.value})}}>
                                <option>طبقات برنامه سازی</option>
                                {this.state.class_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.programmaketype_fid} onChange={(event)=>{this.setState({programmaketype_fid:event.target.value})}}>
                                <option>programmaketype_fid</option>
                                {this.state.programmaketype_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='totalprogramcount'
                                group
                                type='text'
                                validate
                                value={this.state.totalprogramcount}
                                onChange={(event)=>{this.setState({totalprogramcount:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='timeperprogram'
                                group
                                type='text'
                                validate
                                value={this.state.timeperprogram}
                                onChange={(event)=>{this.setState({timeperprogram:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                    <Input
                                        onClick={() => this.setState({is_haslegalproblem : 0})}
                                        checked={this.state.is_haslegalproblem === 0}
                                        label='is_haslegalproblem ندارد'
                                        type='radio'
                                        id='radiois_haslegalproblem1'
                                    />
                                    <Input
                                        onClick={() => this.setState({is_haslegalproblem : 1})}
                                        checked={this.state.is_haslegalproblem === 1}
                                        label='is_haslegalproblem دارد'
                                        type='radio'
                                        id='radiois_haslegalproblem2'
                                    />
                                </FormInline>
                        </div>
                        <div className='grey-text'>
                            <DatePicker
                                label='approval_date'
                                group
                                value={moment.unix(parseInt(this.state.approval_date))}
                                onChange={(value)=>{
                                let date=moment(value).format('X');
                                if(date!=this.state.approval_date)
                                        this.setState({approval_date:date})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <DatePicker
                                label='end_date'
                                group
                                value={moment.unix(parseInt(this.state.end_date))}
                                onChange={(value)=>{
                                let date=moment(value).format('X');
                                if(date!=this.state.end_date)
                                        this.setState({end_date:date})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <DatePicker
                                label='add_date'
                                group
                                value={moment.unix(parseInt(this.state.add_date))}
                                onChange={(value)=>{
                                let date=moment(value).format('X');
                                if(date!=this.state.add_date)
                                        this.setState({add_date:date})
                                }}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.producer_employee_fid} onChange={(event)=>{this.setState({producer_employee_fid:event.target.value})}}>
                                <option>producer_employee_fid</option>
                                {this.state.producer_employee_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.executor_employee_fid} onChange={(event)=>{this.setState({executor_employee_fid:event.target.value})}}>
                                <option>executor_employee_fid</option>
                                {this.state.executor_employee_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.paycenter_fid} onChange={(event)=>{this.setState({paycenter_fid:event.target.value})}}>
                                <option>مرکز هزینه</option>
                                {this.state.paycenter_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.makergroup_paycenter_fid} onChange={(event)=>{this.setState({makergroup_paycenter_fid:event.target.value})}}>
                                <option>makergroup_paycenter_fid</option>
                                {this.state.makergroup_paycenter_fidOptions}
                            </select>
                            </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	data.append('department_fid', this.state.department_fid);
	data.append('class_fid', this.state.class_fid);
	data.append('programmaketype_fid', this.state.programmaketype_fid);
	data.append('totalprogramcount', this.state.totalprogramcount);
	data.append('timeperprogram', this.state.timeperprogram);
	data.append('is_haslegalproblem', this.state.is_haslegalproblem);
	data.append('approval_date', this.state.approval_date);
	data.append('end_date', this.state.end_date);
	data.append('add_date', this.state.add_date);
	data.append('producer_employee_fid', this.state.producer_employee_fid);
	data.append('executor_employee_fid', this.state.executor_employee_fid);
	data.append('paycenter_fid', this.state.paycenter_fid);
	data.append('makergroup_paycenter_fid', this.state.makergroup_paycenter_fid);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/programestimations'+id, {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                    mode: 'cors',
                                    crossDomain:true,
                                    body: data
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.hasOwnProperty('errors')) {
                                            alert('خطا','خطایی در ثبت اطلاعات بوجود آمد');
                                        }
                                        else {
                                            return this.props.history.push('/ifi/programestimations');   

                                            //alert('پیام',res.message);
                                        }
                                        // console.log(res);
                                    }).catch(function (error) {
                                    alert('خطا','خطایی در ثبت اطلاعات بوجود آمد');
                                    throw error;
                                });
                            }
                            }>ذخیره</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default ifi_programestimationManage;
