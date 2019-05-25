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

class sas_deviceView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','device',AccessManager.EDIT),
            
			name:'',
			devicetype:'',
			devicetypeOptions:[],
			code:'',
			notete:'',
			ownerunit:'',
			ownerunitOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/device/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
devicetype:data.Data.devicetypeinfo.name,
code:data.Data.code,
notete:data.Data.notete,
ownerunit:data.Data.ownerunitinfo.name,});
        
            }, 
            null,'sas.device',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> device</p>
                        
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
                            <label>شماره سریال</label>
                            <label
                                className='valuelabel'>
                                {this.state.code}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>یادداشت</label>
                            <div dangerouslySetInnerHTML={{__html: this.state.notete}} />
                        </div>
                        <div className='form-group'>
                            <label>بخش مالک</label>
                            <label
                                className='valuelabel'>
                                {this.state.ownerunit}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/devices');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_deviceView;
