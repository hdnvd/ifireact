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

class sas_unitsequenceView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','unitsequence',AccessManager.EDIT),
            
			sourceunit:'',
			sourceunitOptions:[],
			destinationunit:'',
			destinationunitOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/unitsequence/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ });
        
new SweetFetcher().Fetch('/sas/sourceunit'+'/'+data.Data.sourceunit,SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({sourceunit:data.Data.name});
            }, 
            null,'sas.sourceunit',AccessManager.VIEW,
            this.props.history);
new SweetFetcher().Fetch('/sas/destinationunit'+'/'+data.Data.destinationunit,SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({destinationunit:data.Data.name});
            }, 
            null,'sas.destinationunit',AccessManager.VIEW,
            this.props.history);
            }, 
            null,'sas.unitsequence',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> unitsequence</p>
                        
                        <div className='form-group'>
                            <label>بخش مبدا</label>
                            <label
                                className='valuelabel'>
                                {this.state.sourceunit}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>بخش مقصد(بعدی)</label>
                            <label
                                className='valuelabel'>
                                {this.state.destinationunit}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/unitsequences');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_unitsequenceView;
