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

class trapp_optionView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','option',AccessManager.EDIT),
            
			name:'',
			free:'',
			countable:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/option/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
free:data.Data.free,
countable:data.Data.countable,});
        
            }, 
            null,'trapp.option',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> option</p>
                        
                        <div className='form-group'>
                            <label>نام</label>
                            <label
                                className='valuelabel'>
                                {this.state.name}
                            </label>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>is_free</label>
                                    <Input
                                        onClick={() => this.setState({free : 0})}
                                        checked={this.state.free == 0}
                                        label='is_free ندارد'
                                        type='radio'
                                        id='radiois_free1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({free : 1})}
                                        checked={this.state.free == 1}
                                        label='is_free دارد'
                                        type='radio'
                                        id='radiois_free2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>is_countable</label>
                                    <Input
                                        onClick={() => this.setState({countable : 0})}
                                        checked={this.state.countable == 0}
                                        label='is_countable ندارد'
                                        type='radio'
                                        id='radiois_countable1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({countable : 1})}
                                        checked={this.state.countable == 1}
                                        label='is_countable دارد'
                                        type='radio'
                                        id='radiois_countable2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/trapp/options');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default trapp_optionView;
