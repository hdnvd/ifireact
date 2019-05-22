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

class sas_requesttypeView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','requesttype',AccessManager.EDIT),
            
			name:'',
			priority:'',
			needssecurityacceptance:'',
			motherrequesttype:'',
			motherrequesttypeOptions:[],
			hardwareneeded:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/requesttype/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
priority:data.Data.priority,
needssecurityacceptance:data.Data.needssecurityacceptance,
hardwareneeded:data.Data.hardwareneeded,});
        
new SweetFetcher().Fetch('/sas/motherrequesttype'+'/'+data.Data.motherrequesttype,SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({motherrequesttype:data.Data.name});
            }, 
            null,'sas.motherrequesttype',AccessManager.VIEW,
            this.props.history);
            }, 
            null,'sas.requesttype',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> requesttype</p>
                        
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
                        <div className='form-group'>
                            <label>نوع درخواست مادر</label>
                            <label
                                className='valuelabel'>
                                {this.state.motherrequesttype}
                            </label>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیازمند ثبت سخت افزار</label>
                                    <Input
                                        onClick={() => this.setState({hardwareneeded : 0})}
                                        checked={this.state.hardwareneeded == 0}
                                        label='نیازمند ثبت سخت افزار ندارد'
                                        type='radio'
                                        id='radiois_hardwareneeded1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({hardwareneeded : 1})}
                                        checked={this.state.hardwareneeded == 1}
                                        label='نیازمند ثبت سخت افزار دارد'
                                        type='radio'
                                        id='radiois_hardwareneeded2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/requesttypes');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_requesttypeView;
