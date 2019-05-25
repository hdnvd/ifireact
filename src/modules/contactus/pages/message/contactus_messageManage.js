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

import Contactusmessageinfo from "../../../../modules/contactus/pages/message/contactusmessageinfo";
class contactus_messageManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('contactus','message',AccessManager.EDIT),
            
			messagereceiver:'',
			messagereceiverOptions:[],
			orderserial:'',
			questiontext:'',
			questionflu:'',
			questionfluPreview:'',
			sendername:'',
			sendertel:'',
			answertext:'',
			voiceflu:'',
			voicefluPreview:'',
			answerflu:'',
			answerfluPreview:'',
			unit:'',
			unitOptions:[],
			answervoiceflu:'',
			answervoicefluPreview:'',
			personelno:'',
			subject:'',
			subjectOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/contactus/message/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ messagereceiver:data.Data.messagereceiver,orderserial:data.Data.orderserial,questiontext:data.Data.questiontext,questionfluPreview:Constants.SiteURL+'/'+data.Data.questionflu,questionflu:data.Data.questionflu,sendername:data.Data.sendername,sendertel:data.Data.sendertel,answertext:data.Data.answertext,voicefluPreview:Constants.SiteURL+'/'+data.Data.voiceflu,voiceflu:data.Data.voiceflu,answerfluPreview:Constants.SiteURL+'/'+data.Data.answerflu,answerflu:data.Data.answerflu,unit:data.Data.unit,answervoicefluPreview:Constants.SiteURL+'/'+data.Data.answervoiceflu,answervoiceflu:data.Data.answervoiceflu,personelno:data.Data.personelno,subject:data.Data.subject,});
            new SweetFetcher().Fetch('/contactus/subject/'+data.Data.subject, SweetFetcher.METHOD_GET, null,
                subdata => {
                    this.setState({subject: subdata.Data.name});
                },
                null, 'contactus.subject', AccessManager.LIST,
                this.props.history);
            new SweetFetcher().Fetch('/contactus/unit/'+data.Data.unit, SweetFetcher.METHOD_GET, null,
                subdata => {
                    this.setState({unit: subdata.Data.name});
                },
                null, 'contactus.unit', AccessManager.LIST,
                this.props.history);
            new SweetFetcher().Fetch('/contactus/degree/'+data.Data.degree, SweetFetcher.METHOD_GET, null,
                subdata => {
                    this.setState({degree: subdata.Data.name});
                },
                null, 'contactus.degree', AccessManager.LIST,
                this.props.history);
                 },
            null,'contactus.message',AccessManager.VIEW,
            this.props.history);
        }//IF

        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>رسیدگی به پیام ها</p>

                        <Contactusmessageinfo data={this.state}/>
                        <div className='form-group'>
                            <label htmlFor='answertext'>متن پاسخ</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='answertext'
                                group
                                type='text'
                                validate
                                value={this.state.answertext}
                                onChange={(event)=>{this.setState({answertext:event.target.value})}}
                            />
                        </div>
                            <div className='form-group'>
                            <label htmlFor='answerflu'>تصویر پاسخ</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='answerflu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        answerfluPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ answerflu : file})
                            }}
                        />
                        {this.state.answerflu!='' &&
                        <ModalImage
                            small={this.state.answerfluPreview}
                            large={this.state.answerfluPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='answervoiceflu'>فایل صوتی پاسخ</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='answervoiceflu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                this.setState({ answervoiceflu : file})
                            }}
                        />
                        </div>
                            <div className='text-center'>
                            {this.state.canEdit && 
                                <SweetButton value={'ثبت'}
                                    onButtonPress={(afterFetchListener) => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                    if (this.props.match.params.id > 0)
                                        id = this.props.match.params.id;
                                    const data = new FormData();
									data.append('answertext', this.state.answertext);
									data.append('answerflu', this.state.answerflu);
									data.append('answervoiceflu', this.state.answervoiceflu);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/contactus/message'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/contactus/messages');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'contactus.message',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/contactus/messages');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default contactus_messageManage;
