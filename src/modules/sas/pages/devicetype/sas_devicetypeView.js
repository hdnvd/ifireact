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

class sas_devicetypeView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','devicetype',AccessManager.EDIT),
            
			name:'',
			devicetype:'',
			devicetypeOptions:[],
			needssecurityacceptance:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/devicetype/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
devicetype:data.Data.devicetypeinfo.name,
needssecurityacceptance:data.Data.needssecurityacceptance,});
        
            }, 
            null,'sas.devicetype',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> devicetype</p>
                        
                        <div className='form-group'>
                            <label>نام</label>
                            <label
                                className='valuelabel'>
                                {this.state.name}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>نوع سخت افزار</label>
                            <label
                                className='valuelabel'>
                                {this.state.devicetype}
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
                            <div className='text-center'>
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

export default sas_devicetypeView;
