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
class comments_commentManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('comments','comment',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),

			text:'',
            publishtime:"-1",
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/comments/comment/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

            console.log(data);
                 this.setState({ text:data.Data.text,publishtime:data.Data.publishtime+""});
            },
            null,'comments.comment',AccessManager.VIEW,
            this.props.history);
        }//IF
    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        let publishText='انتشار';
        let publishState='1';
        if(!this.state.publishtime.trim().includes('-1'))
        {
            publishText='عدم انتشار';
            publishState='0';
        }
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>مدیریت نظر</p>

                        <div className='form-group'>
                            <label htmlFor='text'>متن</label>
                            <input
                                className='form-control'
                                id='text'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.text}
                                onChange={(event)=>{this.setState({text:event.target.value})}}/>
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
									data.append('text', this.state.text);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/comments/comment'+Separator+id,method,data,
                                    res => {
                                                return this.props.history.push('/comments/comments');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'comments.comment',action,
                                        this.props.history);

                                }
                                }
                                />
                            }
                                <MDBBtn onClick={
                                    () =>{
                                    let method=SweetFetcher.METHOD_PUT;
                                    let action=AccessManager.EDIT;
                                    let id = this.props.match.params.id;
                                    const data = new FormData();
                                    data.append('publish', publishState);
                                    data.append('id', id);
                                    new SweetFetcher().Fetch('/comments/comment/changepublish/'+id,method,data,
                                    res => {
                                        SweetAlert.displaySimpleAlert('پیام','وضعیت انتشار با موفقیت تغییر یافت');
                                        return this.props.history.push('/comments/comments');

                                        //console.log(res);
                                },(error)=>{
                                    let status=error.response.status;
                                    SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                },
                                    'comments.comment',action,
                                    this.props.history);

                                }}>{publishText}</MDBBtn>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/comments/comments');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default comments_commentManage;
