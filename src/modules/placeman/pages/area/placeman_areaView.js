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

class placeman_areaView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('placeman','area',AccessManager.EDIT),
            
			title:'',
			city:'',
			cityOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/placeman/area/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
title:data.Data.title,
city:data.Data.cityinfo.name,});
        
            }, 
            null,'placeman.area',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> area</p>
                        
                        <div className='form-group'>
                            <label>عنوان</label>
                            <label
                                className='valuelabel'>
                                {this.state.title}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>شهر</label>
                            <label
                                className='valuelabel'>
                                {this.state.city}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/placeman/areas');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default placeman_areaView;
