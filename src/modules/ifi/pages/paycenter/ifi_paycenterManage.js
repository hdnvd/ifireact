// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_paycenterManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
	chapter:'',
	accountingcode:'',
	paycenter_fid:'',
	paycenter_fidOptions:[],
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/paycenters/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
                 this.setState({ title:data.title,chapter:data.chapter,accountingcode:data.accountingcode,paycenter_fid:data.paycenter_fid,});
        
            });
        }
fetch('http://ifi.test/api/ifi/paycenters')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({paycenter_fidOptions:Options})
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_paycenterManage</p>
                        
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
                            <MDBInput
                                label='سرفصل'
                                group
                                type='text'
                                validate
                                value={this.state.chapter}
                                onChange={(event)=>{this.setState({chapter:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='کد حسابداری'
                                group
                                type='text'
                                validate
                                value={this.state.accountingcode}
                                onChange={(event)=>{this.setState({accountingcode:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.paycenter_fid} onChange={(event)=>{this.setState({paycenter_fid:event.target.value})}}>
                                <option>مرکز هزینه</option>
                                {this.state.paycenter_fidOptions}
                            </select>
                            </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	data.append('chapter', this.state.chapter);
	data.append('accountingcode', this.state.accountingcode);
	data.append('paycenter_fid', this.state.paycenter_fid);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/paycenters'+id, {
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
                                            return this.props.history.push('/ifi/paycenters');   

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

export default ifi_paycenterManage;
