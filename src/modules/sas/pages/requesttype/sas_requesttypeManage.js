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
class sas_requesttypeManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','requesttype',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			name:'',
			priority:'',
			needssecurityacceptance:0,
			motherrequesttype:'',
			motherrequesttypeOptions:[],
			hardwareneeded:0,
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/requesttype/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ name:data.Data.name,priority:data.Data.priority,needssecurityacceptance:data.Data.needssecurityacceptance,motherrequesttype:data.Data.motherrequesttype,hardwareneeded:data.Data.hardwareneeded,});
            }, 
            null,'sas.requesttype',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/sas/requesttype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({motherrequesttypeOptions:Options});
            }, 
            null,'sas.requesttype',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف نوع درخواست</p>
                        
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
                            
                           <label>نیاز به تایید حفاظت اطلاعات</label>
                                    <Input
                                        onClick={() => this.setState({needssecurityacceptance : 0})}
                                        checked={this.state.needssecurityacceptance == 0}
                                        label='نیاز به تایید حفاظت اطلاعات ندارد'
                                        type='radio'
                                        id='radiois_needssecurityacceptance1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({needssecurityacceptance : 1})}
                                        checked={this.state.needssecurityacceptance == 1}
                                        label='نیاز به تایید حفاظت اطلاعات دارد'
                                        type='radio'
                                        id='radiois_needssecurityacceptance2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='motherrequesttype'>نوع درخواست مادر</label>
                        <select 
                                id='motherrequesttype'
                                className='browser-default custom-select'
                                value={this.state.motherrequesttype}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({motherrequesttype:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.motherrequesttypeOptions}
                            </select>
                            </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیازمند ثبت سخت افزار</label>
                                    <Input
                                        onClick={() => this.setState({hardwareneeded : 0})}
                                        checked={this.state.hardwareneeded == 0}
                                        label='نیازمند ثبت سخت افزار ندارد'
                                        type='radio'
                                        id='radiois_hardwareneeded1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({hardwareneeded : 1})}
                                        checked={this.state.hardwareneeded == 1}
                                        label='نیازمند ثبت سخت افزار دارد'
                                        type='radio'
                                        id='radiois_hardwareneeded2'
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
									data.append('needssecurityacceptance', this.state.needssecurityacceptance);
									data.append('motherrequesttype', this.state.motherrequesttype);
									data.append('hardwareneeded', this.state.hardwareneeded);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/requesttype'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/sas/requesttypes');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.requesttype',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/requesttypes');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_requesttypeManage;
