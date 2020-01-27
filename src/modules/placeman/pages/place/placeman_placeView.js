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

class placeman_placeView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('placeman','place',AccessManager.EDIT),
            
			title:'',
			area:'',
			areaOptions:[],
			address:'',
			latitude:'',
			longitude:'',
			logoigu:'',
			logoiguPreview:'',
			description:'',
			active:'',
			user:'',
			userOptions:[],
			visits:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/placeman/place/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
title:data.Data.title,
area:data.Data.areainfo.name,
address:data.Data.address,
latitude:data.Data.latitude,
longitude:data.Data.longitude,
logoiguPreview:Constants.SiteURL+'/'+data.Data.logoigu,
description:data.Data.description,
active:data.Data.active,
user:data.Data.userinfo.name,
visits:data.Data.visits,});
        
            }, 
            null,'placeman.place',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> place</p>
                        
                        <div className='form-group'>
                            <label>عنوان</label>
                            <label
                                className='valuelabel'>
                                {this.state.title}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>منطقه</label>
                            <label
                                className='valuelabel'>
                                {this.state.area}
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
                            <label>عرض جغرافیایی</label>
                            <label
                                className='valuelabel'>
                                {this.state.latitude}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>طول جغرافیایی</label>
                            <label
                                className='valuelabel'>
                                {this.state.longitude}
                            </label>
                        </div><div className='form-group'>
                            <label htmlFor='logoigu'>لوگو</label>
                            
                        <ModalImage
                            small={this.state.logoiguPreview}
                            large={this.state.logoiguPreview}
                            className={'imageuploadpreview'} />
                        </div>
                            
                        <div className='form-group'>
                            <label>توضیحات</label>
                            <label
                                className='valuelabel'>
                                {this.state.description}
                            </label>
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
                            <label>کاربر</label>
                            <label
                                className='valuelabel'>
                                {this.state.user}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تعداد بازدید</label>
                            <label
                                className='valuelabel'>
                                {this.state.visits}
                            </label>
                        </div>    
                            <div className='text-center'>
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

export default placeman_placeView;
