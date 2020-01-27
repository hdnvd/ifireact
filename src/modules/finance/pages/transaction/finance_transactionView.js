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

class finance_transactionView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('finance','transaction',AccessManager.EDIT),
            
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
            
                 this.setState({ 
amountprc:data.Data.amountprc,
transactionid:data.Data.transactionid,
status:data.Data.status,
user:data.Data.userinfo.name,
descriptionte:data.Data.descriptionte,});
        
            }, 
            null,'finance.transaction',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> transaction</p>
                        
                        <div className='form-group'>
                            <label>مقدار</label>
                            <label
                                className='valuelabel'>
                                {this.state.amountprc}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>کد تراکنش</label>
                            <label
                                className='valuelabel'>
                                {this.state.transactionid}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>وضعیت</label>
                            <label
                                className='valuelabel'>
                                {this.state.status}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>کاربر</label>
                            <label
                                className='valuelabel'>
                                {this.state.user}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>توضیحات</label>
                            <div dangerouslySetInnerHTML={{__html: this.state.descriptionte}} />
                        </div>    
                            <div className='text-center'>
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

export default finance_transactionView;
