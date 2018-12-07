// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_nationalityManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
	flag_flu:'',
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/nationalitys/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
                 this.setState({ title:data.title,flag_flu:data.flag_flu,});
        
            });
        }
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_nationalityManage</p>
                        
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
                                label='flag_flu'
                                group
                                type='text'
                                validate
                                value={this.state.flag_flu}
                                onChange={(event)=>{this.setState({flag_flu:event.target.value})}}
                            />
                        </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	data.append('flag_flu', this.state.flag_flu);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/nationalitys'+id, {
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
                                            return this.props.history.push('/ifi/nationalitys');   

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

export default ifi_nationalityManage;
