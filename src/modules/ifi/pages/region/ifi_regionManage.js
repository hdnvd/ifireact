// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_regionManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/regions/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
                 this.setState({ title:data.title,});
        
            });
        }
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_regionManage</p>
                        
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
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/regions'+id, {
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
                                            return this.props.history.push('/ifi/regions');   

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

export default ifi_regionManage;
