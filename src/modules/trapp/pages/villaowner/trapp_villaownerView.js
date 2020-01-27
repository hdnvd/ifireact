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

class trapp_villaownerView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','villaowner',AccessManager.EDIT),
            
			name:'',
			user:'',
			userOptions:[],
			nationalcodebnum:'',
			address:'',
			shabacodebnum:'',
			telbnum:'',
			backuptelbnum:'',
			email:'',
			backupmobilebnum:'',
			photoigu:'',
			photoiguPreview:'',
			nationalcardigu:'',
			nationalcardiguPreview:'',
			placemanarea:'',
			placemanareaOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/villaowner/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
name:data.Data.name,
user:data.Data.userinfo.name,
nationalcodebnum:data.Data.nationalcodebnum,
address:data.Data.address,
shabacodebnum:data.Data.shabacodebnum,
telbnum:data.Data.telbnum,
backuptelbnum:data.Data.backuptelbnum,
email:data.Data.email,
backupmobilebnum:data.Data.backupmobilebnum,
photoiguPreview:Constants.SiteURL+'/'+data.Data.photoigu,
nationalcardiguPreview:Constants.SiteURL+'/'+data.Data.nationalcardigu,
placemanarea:data.Data.placemanareainfo.name,});
        
            }, 
            null,'trapp.villaowner',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> villaowner</p>
                        
                        <div className='form-group'>
                            <label>نام</label>
                            <label
                                className='valuelabel'>
                                {this.state.name}
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
                            <label>کد ملی</label>
                            <label
                                className='valuelabel'>
                                {this.state.nationalcodebnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>آدرس</label>
                            <label
                                className='valuelabel'>
                                {this.state.address}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>کد شبا</label>
                            <label
                                className='valuelabel'>
                                {this.state.shabacodebnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تلفن</label>
                            <label
                                className='valuelabel'>
                                {this.state.telbnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تلفن شماره ۲</label>
                            <label
                                className='valuelabel'>
                                {this.state.backuptelbnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>ایمیل</label>
                            <label
                                className='valuelabel'>
                                {this.state.email}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تلفن همراه شماره ۲</label>
                            <label
                                className='valuelabel'>
                                {this.state.backupmobilebnum}
                            </label>
                        </div><div className='form-group'>
                            <label htmlFor='photoigu'>تصویر</label>
                            
                        <ModalImage
                            small={this.state.photoiguPreview}
                            large={this.state.photoiguPreview}
                            className={'imageuploadpreview'} />
                        </div>
                            <div className='form-group'>
                            <label htmlFor='nationalcardigu'>تصویر کارت ملی</label>
                            
                        <ModalImage
                            small={this.state.nationalcardiguPreview}
                            large={this.state.nationalcardiguPreview}
                            className={'imageuploadpreview'} />
                        </div>
                            
                        <div className='form-group'>
                            <label>منطقه</label>
                            <label
                                className='valuelabel'>
                                {this.state.placemanarea}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/trapp/villaowners');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default trapp_villaownerView;
