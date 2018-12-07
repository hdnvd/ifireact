// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_activityManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
	paycenter_type:'',
	planingcode:'',
	taxtype_fid:'',
	taxtype_fidOptions:[],
	alalhesab:'',
	isactive:'',
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/activitys/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
                 this.setState({ title:data.title,paycenter_type:data.paycenter_type,planingcode:data.planingcode,taxtype_fid:data.taxtype_fid,alalhesab:data.alalhesab,isactive:data.isactive,});
        
            });
        }
fetch('http://ifi.test/api/ifi/taxtypes')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({taxtype_fidOptions:Options})
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_activityManage</p>
                        
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
                                label='paycenter_type'
                                group
                                type='text'
                                validate
                                value={this.state.paycenter_type}
                                onChange={(event)=>{this.setState({paycenter_type:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='planingcode'
                                group
                                type='text'
                                validate
                                value={this.state.planingcode}
                                onChange={(event)=>{this.setState({planingcode:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.taxtype_fid} onChange={(event)=>{this.setState({taxtype_fid:event.target.value})}}>
                                <option>taxtype_fid</option>
                                {this.state.taxtype_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='alalhesab'
                                group
                                type='text'
                                validate
                                value={this.state.alalhesab}
                                onChange={(event)=>{this.setState({alalhesab:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                    <Input
                                        onClick={() => this.setState({isactive : 0})}
                                        checked={this.state.isactive === 0}
                                        label='غیر فعال'
                                        type='radio'
                                        id='radioisactive1'
                                    />
                                    <Input
                                        onClick={() => this.setState({isactive : 1})}
                                        checked={this.state.isactive === 1}
                                        label='فعال'
                                        type='radio'
                                        id='radioisactive2'
                                    />
                                </FormInline>
                        </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	data.append('paycenter_type', this.state.paycenter_type);
	data.append('planingcode', this.state.planingcode);
	data.append('taxtype_fid', this.state.taxtype_fid);
	data.append('alalhesab', this.state.alalhesab);
	data.append('isactive', this.state.isactive);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/activitys'+id, {
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
                                            return this.props.history.push('/ifi/activitys');   

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

export default ifi_activityManage;
