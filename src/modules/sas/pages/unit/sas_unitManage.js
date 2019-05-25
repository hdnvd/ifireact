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
class sas_unitManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','unit',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			name:'',
			logoigu:'',
			logoiguPreview:'',
			unittype:'',
			unittypeOptions:[],
			needsadminapproval:0,
			useruser:'',
			useruserOptions:[],
			adminuser:'',
			adminuserOptions:[],
			securityuser:'',
			securityuserOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/unit/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ name:data.Data.name,logoiguPreview:Constants.SiteURL+'/'+data.Data.logoigu,logoigu:data.Data.logoigu,unittype:data.Data.unittype,needsadminapproval:data.Data.needsadminapproval,useruser:data.Data.useruser,adminuser:data.Data.adminuser,securityuser:data.Data.securityuser,});
            }, 
            null,'sas.unit',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/sas/unittype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({unittypeOptions:Options});
            }, 
            null,'sas.unittype',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف بخش</p>
                        
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
                        </div><div className='form-group'>
                            <label htmlFor='logoigu'>لوگو</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='logoigu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        logoiguPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ logoigu : file})
                            }}
                        />
                        {this.state.logoigu!='' &&
                        <ModalImage
                            small={this.state.logoiguPreview}
                            large={this.state.logoiguPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>
                            
                    <div className='form-group'>
                        <label htmlFor='unittype'>نوع بخش</label>
                        <select 
                                id='unittype'
                                className='browser-default custom-select'
                                value={this.state.unittype}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({unittype:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.unittypeOptions}
                            </select>
                            </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیاز به تایید مدیر</label>
                                    <Input
                                        onClick={() => this.setState({needsadminapproval : 0})}
                                        checked={this.state.needsadminapproval == 0}
                                        label='نیاز به تایید مدیر ندارد'
                                        type='radio'
                                        id='radiois_needsadminapproval1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({needsadminapproval : 1})}
                                        checked={this.state.needsadminapproval == 1}
                                        label='نیاز به تایید مدیر دارد'
                                        type='radio'
                                        id='radiois_needsadminapproval2'
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
									data.append('logoigu', this.state.logoigu);
									data.append('unittype', this.state.unittype);
									data.append('needsadminapproval', this.state.needsadminapproval);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/unit'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/sas/units');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.unit',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/units');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_unitManage;
