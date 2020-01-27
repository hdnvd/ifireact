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
class placeman_areaManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('placeman','area',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),

			title:'',
			city:'',
			cityOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/placeman/area/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

                 this.setState({ title:data.Data.title,city:data.Data.cityid,});
            },
            null,'placeman.area',AccessManager.VIEW,
            this.props.history);
        }//IF

new SweetFetcher().Fetch('/placeman/city',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({cityOptions:Options});
            },
            null,'placeman.city',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف منطقه</p>

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
                        <label htmlFor='city'>شهر</label>
                        <select
                                id='city'
                                className='browser-default custom-select'
                                value={this.state.city}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({city:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.cityOptions}
                            </select>
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
									data.append('city', this.state.city);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/placeman/area'+Separator+id,method,data,
                                    res => {
                                                return this.props.history.push('/placeman/areas');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'placeman.area',action,
                                        this.props.history);

                                }
                                }
                                />
                            }
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

export default placeman_areaManage;
