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
class finance_transactionManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('finance','transaction',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			amountprc:'',
			transactionid:'',
			status:'',
			user:'',
			userOptions:[],
			descriptionte:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/finance/transaction/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ amountprc:data.Data.amountprc,transactionid:data.Data.transactionid,status:data.Data.status,user:data.Data.user,descriptionte:data.Data.descriptionte,});
            }, 
            null,'finance.transaction',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/finance/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'finance.user',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف تراکنش</p>
                        
                        <div className='form-group'>
                            <label htmlFor='amountprc'>مقدار</label>
                            <input
                                className='form-control'
                                id='amountprc'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.amountprc}
                                onChange={(event)=>{this.setState({amountprc:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='transactionid'>کد تراکنش</label>
                            <input
                                className='form-control'
                                id='transactionid'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.transactionid}
                                onChange={(event)=>{this.setState({transactionid:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='status'>وضعیت</label>
                            <input
                                className='form-control'
                                id='status'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.status}
                                onChange={(event)=>{this.setState({status:event.target.value})}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='user'>کاربر</label>
                        <select 
                                id='user'
                                className='browser-default custom-select'
                                value={this.state.user}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({user:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.userOptions}
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
                                    
									data.append('amountprc', this.state.amountprc);
									data.append('transactionid', this.state.transactionid);
									data.append('status', this.state.status);
									data.append('user', this.state.user);
									data.append('descriptionte', this.state.descriptionte);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/finance/transaction'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/finance/transactions');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'finance.transaction',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/finance/transactions');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default finance_transactionManage;
