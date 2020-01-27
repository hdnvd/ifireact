// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
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

class trapp_orderView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','order',AccessManager.EDIT),
            
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
            
                 this.setState({ 
priceprc:data.Data.priceprc,
reservefinancetransaction:data.Data.reservefinancetransactioninfo.name,
cancelfinancetransaction:data.Data.cancelfinancetransactioninfo.name,
villa:data.Data.villainfo.name,
orderstatus:data.Data.orderstatusinfo.name,
startdate:data.Data.startdate,
durationnum:data.Data.durationnum,
user:data.Data.userinfo.name,});
        
            }, 
            null,'trapp.order',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> order</p>
                        
                        <div className='form-group'>
                            <label>قیمت</label>
                            <label
                                className='valuelabel'>
                                {this.state.priceprc}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>reserve__finance_transaction_fid</label>
                            <label
                                className='valuelabel'>
                                {this.state.reservefinancetransaction}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>cancel__finance_transaction_fid</label>
                            <label
                                className='valuelabel'>
                                {this.state.cancelfinancetransaction}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>ویلا</label>
                            <label
                                className='valuelabel'>
                                {this.state.villa}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>وضعیت سفارش</label>
                            <label
                                className='valuelabel'>
                                {this.state.orderstatus}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تاریخ شروع</label>
                            <label
                                className='valuelabel'>
                                {this.state.startdate}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>مدت</label>
                            <label
                                className='valuelabel'>
                                {this.state.durationnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>کاربر</label>
                            <label
                                className='valuelabel'>
                                {this.state.user}
                            </label>
                        </div>    
                            <div className='text-center'>
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

export default trapp_orderView;
