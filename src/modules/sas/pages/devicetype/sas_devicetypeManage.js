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
class sas_devicetypeManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','devicetype',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			name:'',
			devicetype:'',
			devicetypeOptions:[],
			needssecurityacceptance:0,
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/devicetype/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ name:data.Data.name,devicetype:data.Data.devicetype,needssecurityacceptance:data.Data.needssecurityacceptance,});
            }, 
            null,'sas.devicetype',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/sas/devicetype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({devicetypeOptions:Options});
            }, 
            null,'sas.devicetype',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف نوع سخت افزار</p>
                        
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
                        <label htmlFor='devicetype'>نوع سخت افزار</label>
                        <select 
                                id='devicetype'
                                className='browser-default custom-select'
                                value={this.state.devicetype}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({devicetype:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.devicetypeOptions}
                            </select>
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
									data.append('devicetype', this.state.devicetype);
									data.append('needssecurityacceptance', this.state.needssecurityacceptance);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/devicetype'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/sas/devicetypes');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.devicetype',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/devicetypes');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_devicetypeManage;
