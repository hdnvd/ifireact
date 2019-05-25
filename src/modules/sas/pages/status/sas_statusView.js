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

class sas_statusView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','status',AccessManager.EDIT),
            
			name:'',
			priority:'',
			commited:'',
			successful:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/status/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
priority:data.Data.priority,
commited:data.Data.commited,
successful:data.Data.successful,});
        
            }, 
            null,'sas.status',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> status</p>
                        
                        <div className='form-group'>
                            <label>نام</label>
                            <label
                                className='valuelabel'>
                                {this.state.name}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>اولویت</label>
                            <label
                                className='valuelabel'>
                                {this.state.priority}
                            </label>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>به اتمام رسیده</label>
                                    <Input
                                        onClick={() => this.setState({commited : 0})}
                                        checked={this.state.commited == 0}
                                        label='به اتمام رسیده ندارد'
                                        type='radio'
                                        id='radiois_commited1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({commited : 1})}
                                        checked={this.state.commited == 1}
                                        label='به اتمام رسیده دارد'
                                        type='radio'
                                        id='radiois_commited2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>اتمام موفق</label>
                                    <Input
                                        onClick={() => this.setState({successful : 0})}
                                        checked={this.state.successful == 0}
                                        label='اتمام موفق ندارد'
                                        type='radio'
                                        id='radiois_successful1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({successful : 1})}
                                        checked={this.state.successful == 1}
                                        label='اتمام موفق دارد'
                                        type='radio'
                                        id='radiois_successful2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/statuss');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_statusView;
