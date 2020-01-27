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
class placeman_placephotoManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('placeman','placephoto',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),
            
			name:'',
			photoigu:'',
			photoiguPreview:'',
			phototype:'',
			phototypeOptions:[],
			place:'',
			placeOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/placeman/placephoto/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ name:data.Data.name,photoiguPreview:Constants.SiteURL+'/'+data.Data.photoigu,photoigu:data.Data.photoigu,phototype:data.Data.phototype,place:data.Data.place,});
            }, 
            null,'placeman.placephoto',AccessManager.VIEW,
            this.props.history);
        }//IF
        
new SweetFetcher().Fetch('/placeman/phototype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({phototypeOptions:Options});
            }, 
            null,'placeman.phototype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/placeman/place',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({placeOptions:Options});
            }, 
            null,'placeman.place',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تصاویر ویلا</p>
                        
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
                            
                    {/*<div className='form-group'>*/}
                        {/*<label htmlFor='phototype'>phototype_fid</label>*/}
                        {/*<select */}
                                {/*id='phototype'*/}
                                {/*className='browser-default custom-select'*/}
                                {/*value={this.state.phototype}*/}
                                {/*disabled={!this.state.canEdit}*/}
                                {/*onChange={(event)=>{this.setState({phototype:event.target.value})}}>*/}
                                {/*<option value={''}>انتخاب کنید</option>*/}
                                {/*{this.state.phototypeOptions}*/}
                            {/*</select>*/}
                            {/*</div>*/}
                    {/*<div className='form-group'>*/}
                        {/*<label htmlFor='place'>place_fid</label>*/}
                        {/*<select */}
                                {/*id='place'*/}
                                {/*className='browser-default custom-select'*/}
                                {/*value={this.state.place}*/}
                                {/*disabled={!this.state.canEdit}*/}
                                {/*onChange={(event)=>{this.setState({place:event.target.value})}}>*/}
                                {/*<option value={''}>انتخاب کنید</option>*/}
                                {/*{this.state.placeOptions}*/}
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
									data.append('photoigu', this.state.photoigu);
									data.append('phototype', this.state.phototype);
									data.append('place', this.state.place);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/placeman/placephoto'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/placeman/placephotos');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'placeman.placephoto',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/placeman/placephotos');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default placeman_placephotoManage;
