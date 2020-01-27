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
class trapp_villaoptionManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','villaoption',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			villa:'',
			villaOptions:[],
			option:'',
			optionOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/villaoption/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ villa:data.Data.villa,option:data.Data.option,});
            }, 
            null,'trapp.villaoption',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/trapp/villa',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({villaOptions:Options});
            }, 
            null,'trapp.villa',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/option',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({optionOptions:Options});
            }, 
            null,'trapp.option',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف villaoption</p>
                        
                    <div className='form-group'>
                        <label htmlFor='villa'>ویلا</label>
                        <select 
                                id='villa'
                                className='browser-default custom-select'
                                value={this.state.villa}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({villa:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.villaOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='option'>option_fid</label>
                        <select 
                                id='option'
                                className='browser-default custom-select'
                                value={this.state.option}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({option:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.optionOptions}
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
                                    
									data.append('villa', this.state.villa);
									data.append('option', this.state.option);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/trapp/villaoption'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/trapp/villaoptions');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'trapp.villaoption',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/trapp/villaoptions');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default trapp_villaoptionManage;
