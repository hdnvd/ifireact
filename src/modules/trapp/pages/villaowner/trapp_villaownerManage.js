// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
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

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class trapp_villaownerManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','villaowner',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
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
            
                 this.setState({ name:data.Data.name,user:data.Data.user,nationalcodebnum:data.Data.nationalcodebnum,address:data.Data.address,shabacodebnum:data.Data.shabacodebnum,telbnum:data.Data.telbnum,backuptelbnum:data.Data.backuptelbnum,email:data.Data.email,backupmobilebnum:data.Data.backupmobilebnum,photoiguPreview:Constants.SiteURL+'/'+data.Data.photoigu,photoigu:data.Data.photoigu,nationalcardiguPreview:Constants.SiteURL+'/'+data.Data.nationalcardigu,nationalcardigu:data.Data.nationalcardigu,placemanarea:data.Data.placemanarea,});
            }, 
            null,'trapp.villaowner',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/trapp/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'trapp.user',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/area',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({placemanareaOptions:Options});
            }, 
            null,'trapp.area',AccessManager.LIST,
            this.props.history);
    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف villaowner</p>
                        
                        <div className='form-group'>
                            <label htmlFor='name'>نام</label>
                            <input
                                className='form-control'
                                id='name'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.name}
                                onChange={(event)=>{this.setState({name:event.target.value})}}/>
                        </div>
                    {/*<div className='form-group'>*/}
                        {/*<label htmlFor='user'>کاربر</label>*/}
                        {/*<select */}
                                {/*id='user'*/}
                                {/*className='browser-default custom-select'*/}
                                {/*value={this.state.user}*/}
                                {/*disabled={!this.state.canEdit}*/}
                                {/*onChange={(event)=>{this.setState({user:event.target.value})}}>*/}
                                {/*<option value={''}>انتخاب کنید</option>*/}
                                {/*{this.state.userOptions}*/}
                            {/*</select>*/}
                            {/*</div>*/}
                        <div className='form-group'>
                            <label htmlFor='nationalcodebnum'>کد ملی</label>
                            <input
                                className='form-control'
                                id='nationalcodebnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.nationalcodebnum}
                                onChange={(event)=>{this.setState({nationalcodebnum:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='address'>آدرس</label>
                            <input
                                className='form-control'
                                id='address'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.address}
                                onChange={(event)=>{this.setState({address:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='shabacodebnum'>کد شبا</label>
                            <input
                                className='form-control'
                                id='shabacodebnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.shabacodebnum}
                                onChange={(event)=>{this.setState({shabacodebnum:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='telbnum'>تلفن</label>
                            <input
                                className='form-control'
                                id='telbnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.telbnum}
                                onChange={(event)=>{this.setState({telbnum:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='backuptelbnum'>تلفن شماره ۲</label>
                            <input
                                className='form-control'
                                id='backuptelbnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.backuptelbnum}
                                onChange={(event)=>{this.setState({backuptelbnum:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>ایمیل</label>
                            <input
                                className='form-control'
                                id='email'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.email}
                                onChange={(event)=>{this.setState({email:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='backupmobilebnum'>تلفن همراه شماره ۲</label>
                            <input
                                className='form-control'
                                id='backupmobilebnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.backupmobilebnum}
                                onChange={(event)=>{this.setState({backupmobilebnum:event.target.value})}}/>
                        </div><div className='form-group'>
                            <label htmlFor='photoigu'>تصویر</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='photoigu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        photoiguPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ photoigu : file})
                            }}
                        />
                        {this.state.photoigu!='' &&
                        <ModalImage
                            small={this.state.photoiguPreview}
                            large={this.state.photoiguPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>
                            <div className='form-group'>
                            <label htmlFor='nationalcardigu'>تصویر کارت ملی</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='nationalcardigu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        nationalcardiguPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ nationalcardigu : file})
                            }}
                        />
                        {this.state.nationalcardigu!='' &&
                        <ModalImage
                            small={this.state.nationalcardiguPreview}
                            large={this.state.nationalcardiguPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>
                            
                    {/*<div className='form-group'>*/}
                        {/*<label htmlFor='placemanarea'>منطقه</label>*/}
                        {/*<select */}
                                {/*id='placemanarea'*/}
                                {/*className='browser-default custom-select'*/}
                                {/*value={this.state.placemanarea}*/}
                                {/*disabled={!this.state.canEdit}*/}
                                {/*onChange={(event)=>{this.setState({placemanarea:event.target.value})}}>*/}
                                {/*<option value={''}>انتخاب کنید</option>*/}
                                {/*{this.state.placemanareaOptions}*/}
                            {/*</select>*/}
                            {/*</div>    */}
                            <div className='text-center'>
                            {this.state.canEdit && 
                                <SweetButton value={'ذخیره'}
                                    onButtonPress={(afterFetchListener) => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                    if (this.props.match.params.id > 0)
                                        id = this.props.match.params.id;
                                    const data = new FormData();
                                    
									data.append('name', this.state.name);
									data.append('user', this.state.user);
									data.append('nationalcodebnum', this.state.nationalcodebnum);
									data.append('address', this.state.address);
									data.append('shabacodebnum', this.state.shabacodebnum);
									data.append('telbnum', this.state.telbnum);
									data.append('backuptelbnum', this.state.backuptelbnum);
									data.append('email', this.state.email);
									data.append('backupmobilebnum', this.state.backupmobilebnum);
									data.append('photoigu', this.state.photoigu);
									data.append('nationalcardigu', this.state.nationalcardigu);
									data.append('placemanarea', this.state.placemanarea);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/trapp/villaowner'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/trapp/villaowners');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'trapp.villaowner',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
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

export default trapp_villaownerManage;
