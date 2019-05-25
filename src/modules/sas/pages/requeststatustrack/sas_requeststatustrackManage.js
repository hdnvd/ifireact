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
import ModalImage from 'react-modal-image'
import SweetButton from '../../../../classes/sweet-button';
import SweetAlert from '../../../../classes/SweetAlert';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class sas_requeststatustrackManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','requeststatustrack',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			status:'',
			statusOptions:[],
			request:'',
			requestOptions:[],
			user:'',
			userOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/requeststatustrack/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ status:data.Data.status,request:data.Data.request,user:data.Data.user,});
            }, 
            null,'sas.requeststatustrack',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/sas/status',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({statusOptions:Options});
            }, 
            null,'sas.status',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/request',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({requestOptions:Options});
            }, 
            null,'sas.request',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'sas.user',AccessManager.LIST,
            this.props.history);
    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف requeststatustrack</p>
                        
                    <div className='form-group'>
                        <label htmlFor='status'>وضعیت</label>
                        <select 
                                id='status'
                                className='browser-default custom-select'
                                value={this.state.status}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({status:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.statusOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='request'>درخواست</label>
                        <select 
                                id='request'
                                className='browser-default custom-select'
                                value={this.state.request}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({request:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.requestOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='user'>user_fid</label>
                        <select 
                                id='user'
                                className='browser-default custom-select'
                                value={this.state.user}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({user:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.userOptions}
                            </select>
                            </div>    
                            <div className='text-center'>
                            {this.state.canEdit && 
                                <SweetButton value={'ذخیره'}
                                    onButtonPress={(afterFetchListener) => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                    if (this.props.match.params.id > 0)
                                        id = this.props.match.params.id;
                                    const data = new FormData();
                                    
									data.append('status', this.state.status);
									data.append('request', this.state.request);
									data.append('user', this.state.user);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/requeststatustrack'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/sas/requeststatustracks');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.requeststatustrack',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/requeststatustracks');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_requeststatustrackManage;
