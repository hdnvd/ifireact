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
class placeman_placeManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('placeman','place',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			title:'',
			area:'',
			areaOptions:[],
			address:'',
			latitude:'',
			longitude:'',
			logoigu:'',
			logoiguPreview:'',
			description:'',
			active:0,
			user:'',
			userOptions:[],
			visits:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/placeman/place/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ title:data.Data.title,area:data.Data.area,address:data.Data.address,latitude:data.Data.latitude,longitude:data.Data.longitude,logoiguPreview:Constants.SiteURL+'/'+data.Data.logoigu,logoigu:data.Data.logoigu,description:data.Data.description,active:data.Data.active,user:data.Data.user,visits:data.Data.visits,});
            }, 
            null,'placeman.place',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/placeman/area',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({areaOptions:Options});
            }, 
            null,'placeman.area',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/placeman/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'placeman.user',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف place</p>
                        
                        <div className='form-group'>
                            <label htmlFor='title'>عنوان</label>
                            <input
                                className='form-control'
                                id='title'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.title}
                                onChange={(event)=>{this.setState({title:event.target.value})}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='area'>منطقه</label>
                        <select 
                                id='area'
                                className='browser-default custom-select'
                                value={this.state.area}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({area:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.areaOptions}
                            </select>
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
                            <label htmlFor='latitude'>عرض جغرافیایی</label>
                            <input
                                className='form-control'
                                id='latitude'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.latitude}
                                onChange={(event)=>{this.setState({latitude:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='longitude'>طول جغرافیایی</label>
                            <input
                                className='form-control'
                                id='longitude'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.longitude}
                                onChange={(event)=>{this.setState({longitude:event.target.value})}}/>
                        </div><div className='form-group'>
                            <label htmlFor='logoigu'>لوگو</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='logoigu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        logoiguPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ logoigu : file})
                            }}
                        />
                        {this.state.logoigu!='' &&
                        <ModalImage
                            small={this.state.logoiguPreview}
                            large={this.state.logoiguPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>
                            
                        <div className='form-group'>
                            <label htmlFor='description'>توضیحات</label>
                            <input
                                className='form-control'
                                id='description'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.description}
                                onChange={(event)=>{this.setState({description:event.target.value})}}/>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>فعال/غیرفعال</label>
                                    <Input
                                        onClick={() => this.setState({active : 0})}
                                        checked={this.state.active == 0}
                                        label='غیر فعال'
                                        type='radio'
                                        id='radioisactive1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({active : 1})}
                                        checked={this.state.active == 1}
                                        label='فعال'
                                        type='radio'
                                        id='radioisactive2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='user'>کاربر</label>
                        <select 
                                id='user'
                                className='browser-default custom-select'
                                value={this.state.user}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({user:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.userOptions}
                            </select>
                            </div>
                        <div className='form-group'>
                            <label htmlFor='visits'>تعداد بازدید</label>
                            <input
                                className='form-control'
                                id='visits'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.visits}
                                onChange={(event)=>{this.setState({visits:event.target.value})}}/>
                        </div>    
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
                                    
									data.append('title', this.state.title);
									data.append('area', this.state.area);
									data.append('address', this.state.address);
									data.append('latitude', this.state.latitude);
									data.append('longitude', this.state.longitude);
									data.append('logoigu', this.state.logoigu);
									data.append('description', this.state.description);
									data.append('active', this.state.active);
									data.append('user', this.state.user);
									data.append('visits', this.state.visits);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/placeman/place'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/placeman/places');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'placeman.place',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/placeman/places');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default placeman_placeManage;
