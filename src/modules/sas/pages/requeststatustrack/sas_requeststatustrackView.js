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

class sas_requeststatustrackView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','requeststatustrack',AccessManager.EDIT),
            
			status:'',
			statusOptions:[],
			request:'',
			requestOptions:[],
			user:'',
			userOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/requeststatustrack/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ });
        
new SweetFetcher().Fetch('/sas/status'+'/'+data.Data.status,SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({status:data.Data.name});
            }, 
            null,'sas.status',AccessManager.VIEW,
            this.props.history);
new SweetFetcher().Fetch('/sas/request'+'/'+data.Data.request,SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({request:data.Data.name});
            }, 
            null,'sas.request',AccessManager.VIEW,
            this.props.history);
new SweetFetcher().Fetch('/sas/user'+'/'+data.Data.user,SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({user:data.Data.name});
            }, 
            null,'sas.user',AccessManager.VIEW,
            this.props.history);
            }, 
            null,'sas.requeststatustrack',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> requeststatustrack</p>
                        
                        <div className='form-group'>
                            <label>وضعیت</label>
                            <label
                                className='valuelabel'>
                                {this.state.status}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>درخواست</label>
                            <label
                                className='valuelabel'>
                                {this.state.request}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>user_fid</label>
                            <label
                                className='valuelabel'>
                                {this.state.user}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/requeststatustracks');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_requeststatustrackView;
