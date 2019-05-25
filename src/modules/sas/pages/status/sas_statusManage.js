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
class sas_statusManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','status',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			name:'',
			priority:'',
			commited:0,
			successful:0,
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/status/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ name:data.Data.name,priority:data.Data.priority,commited:data.Data.commited,successful:data.Data.successful,});
            }, 
            null,'sas.status',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف وضعیت</p>
                        
                        <div className='form-group'>
                            <label htmlFor='name'>نام</label>
                            <input
                                className='form-control'
                                id='name'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.name}
                                onChange={(event)=>{this.setState({name:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='priority'>اولویت</label>
                            <input
                                className='form-control'
                                id='priority'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.priority}
                                onChange={(event)=>{this.setState({priority:event.target.value})}}/>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>به اتمام رسیده</label>
                                    <Input
                                        onClick={() => this.setState({commited : 0})}
                                        checked={this.state.commited == 0}
                                        label='به اتمام رسیده ندارد'
                                        type='radio'
                                        id='radiois_commited1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({commited : 1})}
                                        checked={this.state.commited == 1}
                                        label='به اتمام رسیده دارد'
                                        type='radio'
                                        id='radiois_commited2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>اتمام موفق</label>
                                    <Input
                                        onClick={() => this.setState({successful : 0})}
                                        checked={this.state.successful == 0}
                                        label='اتمام موفق ندارد'
                                        type='radio'
                                        id='radiois_successful1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({successful : 1})}
                                        checked={this.state.successful == 1}
                                        label='اتمام موفق دارد'
                                        type='radio'
                                        id='radiois_successful2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
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
                                    
									data.append('name', this.state.name);
									data.append('priority', this.state.priority);
									data.append('commited', this.state.commited);
									data.append('successful', this.state.successful);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/status'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/sas/statuss');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.status',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/statuss');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_statusManage;
