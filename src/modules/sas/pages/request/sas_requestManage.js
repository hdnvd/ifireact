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
class sas_requestManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','request',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			requesttype:'',
			requesttypeOptions:[],
			device:'',
			deviceOptions:[],
			descriptionte:'',
			priority:'',
			attachmentflu:'',
			attachmentfluPreview:'',
			status:'',
			statusOptions:[],
			receiverunit:'',
			receiverunitOptions:[],
			currentunit:'',
			currentunitOptions:[],
			adminacceptancetime:'',
			securityacceptancetime:'',
			fullsendtime:'',
			letternumber:'',
			letterdate:'',
			senderuser:'',
			senderuserOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/request/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ requesttype:data.Data.requesttype,device:data.Data.device,descriptionte:data.Data.descriptionte,priority:data.Data.priority,attachmentfluPreview:Constants.SiteURL+'/'+data.Data.attachmentflu,attachmentflu:data.Data.attachmentflu,status:data.Data.status,receiverunit:data.Data.receiverunit,currentunit:data.Data.currentunit,adminacceptancetime:data.Data.adminacceptancetime,securityacceptancetime:data.Data.securityacceptancetime,fullsendtime:data.Data.fullsendtime,letternumber:data.Data.letternumber,letterdate:data.Data.letterdate,senderuser:data.Data.senderuser,});
            }, 
            null,'sas.request',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/sas/requesttype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({requesttypeOptions:Options});
            }, 
            null,'sas.requesttype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/device',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({deviceOptions:Options});
            }, 
            null,'sas.device',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/status',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({statusOptions:Options});
            }, 
            null,'sas.status',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unitsequence/userunits',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.destinationunit}>{item.destinationunitcontent}</option>);
                this.setState({receiverunitOptions:Options});
            }, 
            null,'sas.nextunit',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({currentunitOptions:Options});
            }, 
            null,'sas.unit',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({senderuserOptions:Options});
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
                        <p className='h5 text-center mb-4'>تعریف درخواست</p>
                        
                    <div className='form-group'>
                        <label htmlFor='requesttype'>نوع درخواست</label>
                        <select 
                                id='requesttype'
                                className='browser-default custom-select'
                                value={this.state.requesttype}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({requesttype:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.requesttypeOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='device'>تجهیز</label>
                        <select 
                                id='device'
                                className='browser-default custom-select'
                                value={this.state.device}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({device:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.deviceOptions}
                            </select>
                            </div><div className='form-group'>
                            <label htmlFor='descriptionte'>توضیحات</label>
                            <CKEditor
                                className='form-control'
                                id='content'
                                readOnly={!this.state.canEdit}
                                group
                                editor={ ClassicEditor }
                                config={ this.editorConfiguration }
                                data={this.state.descriptionte}
                                onChange={ ( event, editor ) => {
                                    this.setState({descriptionte:editor.getData()});
                                } }
                            />
                            </div>
                        <div className='form-group'>
                            <label htmlFor='attachmentflu'>ضمیمه</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='attachmentflu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        attachmentfluPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ attachmentflu : file})
                            }}
                        />
                        {this.state.attachmentflu!='' &&
                        <ModalImage
                            small={this.state.attachmentfluPreview}
                            large={this.state.attachmentfluPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>

                    <div className='form-group'>
                        <label htmlFor='receiverunit'>بخش دریافت کننده</label>
                        <select 
                                id='receiverunit'
                                className='browser-default custom-select'
                                value={this.state.receiverunit}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({receiverunit:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.receiverunitOptions}
                            </select>
                            </div>
                        <div className='form-group'>
                            <label htmlFor='letternumber'>شماره نامه</label>
                            <input
                                className='form-control'
                                id='letternumber'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.letternumber}
                                onChange={(event)=>{this.setState({letternumber:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='letterdate'>تاریخ نامه</label>
                                                        <InputMask
                                mask='9999/99/99'
                                className='form-control ltr_field'
                                id='letterdate'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.letterdate}
                                onChange={(event)=>{this.setState({letterdate:event.target.value})}}/>
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
                                    
									data.append('requesttype', this.state.requesttype);
									data.append('device', this.state.device);
									data.append('descriptionte', this.state.descriptionte);
									data.append('priority', this.state.priority);
									data.append('attachmentflu', this.state.attachmentflu);
									data.append('status', this.state.status);
									data.append('receiverunit', this.state.receiverunit);
									data.append('currentunit', this.state.currentunit);
									data.append('adminacceptancetime', this.state.adminacceptancetime);
									data.append('securityacceptancetime', this.state.securityacceptancetime);
									data.append('fullsendtime', this.state.fullsendtime);
									data.append('letternumber', this.state.letternumber);
									data.append('letterdate', this.state.letterdate);
									data.append('senderuser', this.state.senderuser);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/request'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/sas/outbox');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.request',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/outbox');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_requestManage;
