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

class sas_unitView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','unit',AccessManager.EDIT),
            
			name:'',
			logoigu:'',
			logoiguPreview:'',
			unittype:'',
			unittypeOptions:[],
			needsadminapproval:'',
			useruser:'',
			useruserOptions:[],
			adminuser:'',
			adminuserOptions:[],
			securityuser:'',
			securityuserOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/unit/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
logoiguPreview:Constants.SiteURL+'/'+data.Data.logoigu,
unittype:data.Data.unittypeinfo.name,
needsadminapproval:data.Data.needsadminapproval,
useruser:data.Data.useruserinfo.name,
adminuser:data.Data.adminuserinfo.name,
securityuser:data.Data.securityuserinfo.name,});
        
            }, 
            null,'sas.unit',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> unit</p>
                        
                        <div className='form-group'>
                            <label>نام</label>
                            <label
                                className='valuelabel'>
                                {this.state.name}
                            </label>
                        </div><div className='form-group'>
                            <label htmlFor='logoigu'>لوگو</label>
                            
                        <ModalImage
                            small={this.state.logoiguPreview}
                            large={this.state.logoiguPreview}
                            className={'imageuploadpreview'} />
                        </div>
                            
                        <div className='form-group'>
                            <label>نوع بخش</label>
                            <label
                                className='valuelabel'>
                                {this.state.unittype}
                            </label>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیاز به تایید مدیر</label>
                                    <Input
                                        onClick={() => this.setState({needsadminapproval : 0})}
                                        checked={this.state.needsadminapproval == 0}
                                        label='نیاز به تایید مدیر ندارد'
                                        type='radio'
                                        id='radiois_needsadminapproval1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({needsadminapproval : 1})}
                                        checked={this.state.needsadminapproval == 1}
                                        label='نیاز به تایید مدیر دارد'
                                        type='radio'
                                        id='radiois_needsadminapproval2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                        <div className='form-group'>
                            <label>کاربر</label>
                            <label
                                className='valuelabel'>
                                {this.state.useruser}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>مدیر</label>
                            <label
                                className='valuelabel'>
                                {this.state.adminuser}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>حفاظت</label>
                            <label
                                className='valuelabel'>
                                {this.state.securityuser}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/units');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_unitView;
