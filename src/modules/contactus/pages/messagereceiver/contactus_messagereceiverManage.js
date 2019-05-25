// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
import InputMask from 'react-input-mask';
import Constants from '../../../../classes/Constants';
import AccessManager from '../../../../classes/AccessManager';
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';

class contactus_messagereceiverManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('messagereceiver',AccessManager.EDIT),
            
			name:'',
			userid:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/contactus/messagereceiver/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ name:data.Data.name,userid:data.Data.userid,});
            }, 
            'messagereceiver',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف messagereceiver</p>
                        
                        <div className='form-group'>
                            <label htmlFor='name'>نام</label>
                            <input
                                className='form-control'
                            
                                readOnly={!this.state.canEdit}
                                id='name'
                                group
                                type='text'
                                validate
                                value={this.state.name}
                                onChange={(event)=>{this.setState({name:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='user_id'>user_id</label>
                            <input
                                className='form-control'
                            
                                readOnly={!this.state.canEdit}
                                id='userid'
                                group
                                type='text'
                                validate
                                value={this.state.userid}
                                onChange={(event)=>{this.setState({userid:event.target.value})}}
                            />
                        </div>    
                            <div className='text-center'>
                            {this.state.canEdit && 
                                <MDBBtn onClick={() => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                    if (this.props.match.params.id > 0)
                                        id = this.props.match.params.id;
                                    const data = new FormData();
                                    
		                            data.append('name', this.state.name);
		data.append('userid', this.state.userid);
		if(id!==''){
		method=SweetFetcher.METHOD_PUT;
		Separator='/';
		action=AccessManager.EDIT;
		data.append('id', id);
	}
                                    new SweetFetcher().Fetch('/contactus/messagereceiver'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/contactus/messagereceivers');
                                                //console.log(res);
                                        },
                                        'messagereceiver',action,
                                        this.props.history);
                                    
                                }
                                }>ذخیره</MDBBtn>
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/contactus/messagereceivers');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default contactus_messagereceiverManage;
