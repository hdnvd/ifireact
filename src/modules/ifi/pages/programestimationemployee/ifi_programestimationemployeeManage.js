// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_programestimationemployeeManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	employee_fid:'',
	employee_fidOptions:[],
	activity_fid:'',
	activity_fidOptions:[],
	programestimation_fid:'',
	programestimation_fidOptions:[],
	employmenttype_fid:'',
	employmenttype_fidOptions:[],
	totalwork:'',
	workunit_fid:'',
	workunit_fidOptions:[],
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/programestimationemployees/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
                 this.setState({ employee_fid:data.employee_fid,activity_fid:data.activity_fid,programestimation_fid:data.programestimation_fid,employmenttype_fid:data.employmenttype_fid,totalwork:data.totalwork,workunit_fid:data.workunit_fid,});
        
            });
        }
fetch('http://ifi.test/api/ifi/employees')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({employee_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/activitys')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({activity_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/programestimations')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({programestimation_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/employmenttypes')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({employmenttype_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/workunits')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({workunit_fidOptions:Options})
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_programestimationemployeeManage</p>
                        
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.employee_fid} onChange={(event)=>{this.setState({employee_fid:event.target.value})}}>
                                <option>کارکنان</option>
                                {this.state.employee_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.activity_fid} onChange={(event)=>{this.setState({activity_fid:event.target.value})}}>
                                <option>فعالیت</option>
                                {this.state.activity_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.programestimation_fid} onChange={(event)=>{this.setState({programestimation_fid:event.target.value})}}>
                                <option>programestimation_fid</option>
                                {this.state.programestimation_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.employmenttype_fid} onChange={(event)=>{this.setState({employmenttype_fid:event.target.value})}}>
                                <option>نوع بکارگیری</option>
                                {this.state.employmenttype_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='totalwork'
                                group
                                type='text'
                                validate
                                value={this.state.totalwork}
                                onChange={(event)=>{this.setState({totalwork:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.workunit_fid} onChange={(event)=>{this.setState({workunit_fid:event.target.value})}}>
                                <option>workunit_fid</option>
                                {this.state.workunit_fidOptions}
                            </select>
                            </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('employee_fid', this.state.employee_fid);
	data.append('activity_fid', this.state.activity_fid);
	data.append('programestimation_fid', this.state.programestimation_fid);
	data.append('employmenttype_fid', this.state.employmenttype_fid);
	data.append('totalwork', this.state.totalwork);
	data.append('workunit_fid', this.state.workunit_fid);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/programestimationemployees'+id, {
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
                                            return this.props.history.push('/ifi/programestimationemployees');   

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

export default ifi_programestimationemployeeManage;
