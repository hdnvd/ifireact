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
import SweetButton from "../../../../classes/sweet-button";
import SweetAlert from "../../../../classes/SweetAlert";
import Contactusmessageinfo from "../../../../modules/contactus/pages/message/contactusmessageinfo";



class contactus_messageView extends SweetComponent {

    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('contactus','message',AccessManager.EDIT),

            messagereceiver: '',
            messagereceiverOptions: [],
            orderserial: '',
            questiontext: '',
            questionflu: '',
            questionfluPreview: '',
            sendername: '',
            sendertel: '',
            answertext: '',
            voiceflu: '',
            voicefluPreview: '',
            answerflu: '',
            answerfluPreview: '',
            unit: '',
            unitOptions: [],
            degree: '',
            degreeOptions: [],
            answervoiceflu: '',
            answervoicefluPreview: '',
            personelno: '',
            subject: '',
            subjectOptions: [],
            loaded:false,
        };
        
    }
    //4204971550340342
    render(){
        return <MDBContainer>
            <MDBRow>

                {!this.state.loaded &&
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>پیگیری پیام ها</p>

                        <div className='form-group'>
                            <label htmlFor='orderserial'>کد رهگیری</label>
                            <input
                                className='form-control'
                                id='orderserial'
                                group
                                type='text'
                                validate
                                value={this.state.orderserial}
                                onChange={(event) => {
                                    this.setState({orderserial: event.target.value})
                                }}
                            />
                        </div>

                        <div className='text-center'>

                            <SweetButton value={"جستجو"}
                                         onButtonPress={(afterFetchListener) => {
                                const data = new FormData();
                                new SweetFetcher().Fetch('/contactus/message/find/' + this.state.orderserial, SweetFetcher.METHOD_GET, data,
                                    res => {
                                    let data=res;
                                        data.Data=Common.convertNullKeysToEmpty(data.Data);
                                        this.setState({
                                            orderserial:data.Data.orderserial,
                                            questiontext:data.Data.questiontext,questionfluPreview:Constants.SiteURL+'/'+data.Data.questionflu,
                                            sendername:data.Data.sendername,
                                            sendertel:data.Data.sendertel,
                                            personelno:data.Data.personelno,
                                            answertext:data.Data.answertext,answerfluPreview:Constants.SiteURL+'/'+data.Data.answerflu,
                                            loaded:true,});
                                        console.log('DataData',data.Data);
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


                                    },(Error)=>{
                                        let status=Error.response.status;
                                        afterFetchListener();
                                        if(status.toString().trim()==="404")
                                            SweetAlert.displaySimpleAlert("پیدا نشد",'هیچ پیامی با کد رهگیری وارد شده پیدا نشد');

                                    },'message',AccessManager.VIEW,this.props.history);
                            }}/>

                        </div>
                    </form>
                </MDBCol>
                }
                {this.state.loaded &&
                <MDBCol md='6' className='messageviewbox'>
                    <form>
                        <p className='h5 text-center mb-4'>مشاهده پیام ها</p>
                        <Contactusmessageinfo data={this.state} />

                        <div className='form-group'>
                            <label>پاسخ</label>
                            <label
                                className='valuelabel'>
                                {this.state.answertext}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='answer_flu'>تصویر پاسخ</label>
                            <ModalImage
                                small={this.state.answerfluPreview}
                                large={this.state.answerfluPreview}
                                className={'imageuploadpreview'}
                            />
                        </div>
                    </form>
                </MDBCol>
                }
            </MDBRow>
        </MDBContainer>
    }
}

export default contactus_messageView;
