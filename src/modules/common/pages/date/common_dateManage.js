// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import jMoment from 'moment-jalaali'
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
class common_dateManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('common','date',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),

			daydate:'',
			factordbl:'1',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/common/date/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

                 this.setState({ daydate:data.Data.daydate,factordbl:data.Data.factordbl,});
            },
            null,'common.date',AccessManager.VIEW,
            this.props.history);
        }//IF

    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف روز تعطیل</p>

                        <div className='form-group'>
                            <label htmlFor='daydate'>تاریخ روز</label>
                                                        <InputMask
                                mask='9999/99/99'
                                className='form-control ltr_field'
                                id='daydate'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.daydate}
                                onChange={(event)=>{this.setState({daydate:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='factordbl'>ضریب</label>
                            <input
                                className='form-control'
                                id='factordbl'
                                type='text'

                                readOnly={true}
                                group
                                validate
                                value={this.state.factordbl}
                                onChange={(event)=>{this.setState({factordbl:event.target.value})}}/>
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

									data.append('daydate', this.state.daydate);
									data.append('factordbl', this.state.factordbl);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/common/date'+Separator+id,method,data,
                                    res => {
                                                return this.props.history.push('/common/dates');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'common.date',action,
                                        this.props.history);

                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/common/dates');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default common_dateManage;
