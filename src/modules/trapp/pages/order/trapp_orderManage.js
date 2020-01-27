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
class trapp_orderManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','order',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			priceprc:'',
			reservefinancetransaction:'',
			reservefinancetransactionOptions:[],
			cancelfinancetransaction:'',
			cancelfinancetransactionOptions:[],
			villa:'',
			villaOptions:[],
			orderstatus:'',
			orderstatusOptions:[],
			startdate:'',
			durationnum:'',
			user:'',
			userOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/order/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ priceprc:data.Data.priceprc,reservefinancetransaction:data.Data.reservefinancetransaction,cancelfinancetransaction:data.Data.cancelfinancetransaction,villa:data.Data.villa,orderstatus:data.Data.orderstatus,startdate:data.Data.startdate,durationnum:data.Data.durationnum,user:data.Data.user,});
            }, 
            null,'trapp.order',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/trapp/transaction',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({reservefinancetransactionOptions:Options});
            }, 
            null,'trapp.transaction',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/transaction',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({cancelfinancetransactionOptions:Options});
            }, 
            null,'trapp.transaction',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/villa',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({villaOptions:Options});
            }, 
            null,'trapp.villa',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/orderstatus',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({orderstatusOptions:Options});
            }, 
            null,'trapp.orderstatus',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'trapp.user',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف سفارش</p>
                        
                        <div className='form-group'>
                            <label htmlFor='priceprc'>قیمت</label>
                            <input
                                className='form-control'
                                id='priceprc'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.priceprc}
                                onChange={(event)=>{this.setState({priceprc:event.target.value})}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='reservefinancetransaction'>reserve__finance_transaction_fid</label>
                        <select 
                                id='reservefinancetransaction'
                                className='browser-default custom-select'
                                value={this.state.reservefinancetransaction}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({reservefinancetransaction:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.reservefinancetransactionOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='cancelfinancetransaction'>cancel__finance_transaction_fid</label>
                        <select 
                                id='cancelfinancetransaction'
                                className='browser-default custom-select'
                                value={this.state.cancelfinancetransaction}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({cancelfinancetransaction:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.cancelfinancetransactionOptions}
                            </select>
                            </div>
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
                        <label htmlFor='orderstatus'>وضعیت سفارش</label>
                        <select 
                                id='orderstatus'
                                className='browser-default custom-select'
                                value={this.state.orderstatus}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({orderstatus:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.orderstatusOptions}
                            </select>
                            </div>
                        <div className='form-group'>
                            <label htmlFor='startdate'>تاریخ شروع</label>
                                                        <InputMask
                                mask='9999/99/99'
                                className='form-control ltr_field'
                                id='startdate'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.startdate}
                                onChange={(event)=>{this.setState({startdate:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='durationnum'>مدت</label>
                            <input
                                className='form-control'
                                id='durationnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.durationnum}
                                onChange={(event)=>{this.setState({durationnum:event.target.value})}}/>
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
                                    
									data.append('priceprc', this.state.priceprc);
									data.append('reservefinancetransaction', this.state.reservefinancetransaction);
									data.append('cancelfinancetransaction', this.state.cancelfinancetransaction);
									data.append('villa', this.state.villa);
									data.append('orderstatus', this.state.orderstatus);
									data.append('startdate', this.state.startdate);
									data.append('durationnum', this.state.durationnum);
									data.append('user', this.state.user);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/trapp/order'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/trapp/orders');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'trapp.order',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/trapp/orders');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default trapp_orderManage;
