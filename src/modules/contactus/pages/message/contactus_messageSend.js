// @flow
import * as React from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, FormInline, Input} from 'mdbreact';
import DatePicker from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
import InputMask from 'react-input-mask';
import Constants from '../../../../classes/Constants';
import AccessManager from '../../../../classes/AccessManager';
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';
import SweetAlert from "../../../../classes/SweetAlert";
import ModalImage from 'react-modal-image'
import ReactLoading from 'react-loading';
import SweetButton from "../../../../classes/sweet-button";

class contactus_messageSend extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            canEdit: true,

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
        };
        if (this.props.match.params.id > 0) {
            new SweetFetcher().Fetch('/contactus/message/' + this.props.match.params.id, SweetFetcher.METHOD_GET, null,
                data => {
                    data.Data = Common.convertNullKeysToEmpty(data.Data);

                    this.setState({
                        messagereceiver: data.Data.messagereceiver,
                        orderserial: data.Data.orderserial,
                        questiontext: data.Data.questiontext,
                        questionfluPreview: Constants.SiteURL + '/' + data.Data.questionflu,
                        questionflu: data.Data.questionflu,
                        sendername: data.Data.sendername,
                        sendertel: data.Data.sendertel,
                        answertext: data.Data.answertext,
                        answerfluPreview: Constants.SiteURL + '/' + data.Data.answerflu,
                        answerflu: data.Data.answerflu,
                    });
                }, null,
                'message', AccessManager.VIEW,
                this.props.history);
        }//IF
        new SweetFetcher().Fetch('/contactus/messagereceiver', SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <option value={item.id}>{item.name}</option>);
                this.setState({messagereceiverOptions: Options});
            },
            null, 'contactus.messagereceiver', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/contactus/unit', SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <option value={item.id}>{item.name}</option>);
                this.setState({unitOptions: Options});
            },
            null, 'contactus.unit', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/contactus/subject', SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <option value={item.id}>{item.name}</option>);
                this.setState({subjectOptions: Options});
            },
            null, 'contactus.subject', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/contactus/degree', SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <option value={item.id}>{item.name}</option>);
                this.setState({degreeOptions: Options});
            },
            null, 'contactus.degree', AccessManager.LIST,
            this.props.history);

    }

    render() {
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ارتباط با ما</p>

                        <div className='form-group'>

                            <label htmlFor='subject'>موضوع</label>
                            <select
                                id='subject'
                                className='browser-default custom-select'
                                value={this.state.subject}
                                disabled={!this.state.canEdit}
                                onChange={(event) => {
                                    this.setState({subject: event.target.value})
                                }}>
                                <option>...انتخاب کنید</option>
                                {this.state.subjectOptions}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sendername'>نام ارسال کننده</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='sendername'
                                group
                                type='text'
                                validate
                                value={this.state.sendername}
                                onChange={(event) => {
                                    this.setState({sendername: event.target.value})
                                }}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='unit'>درجه</label>
                            <select
                                id='unit'
                                className='browser-default custom-select'
                                value={this.state.degree}
                                disabled={!this.state.canEdit}
                                onChange={(event) => {
                                    this.setState({degree: event.target.value})
                                }}>
                                <option>...انتخاب کنید</option>
                                {this.state.degreeOptions}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sendertel'>تلفن تماس</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='sendertel'
                                group
                                type='text'
                                validate
                                value={this.state.sendertel}
                                onChange={(event) => {
                                    this.setState({sendertel: event.target.value})
                                }}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='personelno'>کد پرسنلی</label>
                            <InputMask
                                mask='9999999999'
                                className='form-control ltr_field'

                                readOnly={!this.state.canEdit}
                                id='personelno'
                                group
                                type='text'
                                validate
                                value={this.state.personelno}
                                onChange={(event) => {
                                    this.setState({personelno: event.target.value})
                                }}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='unit'>یگان</label>
                            <select
                                id='unit'
                                className='browser-default custom-select'
                                value={this.state.unit}
                                disabled={!this.state.canEdit}
                                onChange={(event) => {
                                    this.setState({unit: event.target.value})
                                }}>
                                <option>...انتخاب کنید</option>
                                {this.state.unitOptions}
                            </select>
                        </div>
                        {/*<div className='form-group'>*/}

                            {/*<label htmlFor='messagereceiver'>دریافت کننده</label>*/}
                            {/*<select*/}
                                {/*id='messagereceiver'*/}
                                {/*className='browser-default custom-select'*/}
                                {/*value={this.state.messagereceiver}*/}
                                {/*disabled={!this.state.canEdit}*/}
                                {/*onChange={(event) => {*/}
                                    {/*this.setState({messagereceiver: event.target.value})*/}
                                {/*}}>*/}
                                {/*<option>...انتخاب کنید</option>*/}
                                {/*{this.state.messagereceiverOptions}*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        <div className='form-group'>
                            <label htmlFor='voiceflu'>فایل صوتی</label>
                            <input
                                className='form-control file'
                                readOnly={!this.state.canEdit}
                                id='voiceflu'
                                group
                                type='file'
                                onChange={(event) => {
                                    let file = event.target.files[0];
                                    this.setState({voiceflu: file})
                                }}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='questiontext'>متن پیام</label>
                            <textarea
                                className='form-control textarea'
                                readOnly={!this.state.canEdit}
                                id='questiontext'
                                group
                                type='text'
                                onChange={(event) => {
                                    this.setState({questiontext: event.target.value})
                                }}
                            >{this.state.questiontext}
                            </textarea>
                        </div>


                        <div className='form-group'>
                            <label htmlFor='question_flu'>اسکن فایل</label>
                            <input
                                className='form-control file'
                                readOnly={!this.state.canEdit}
                                id='questionflu'
                                group
                                type='file'
                                onChange={(event) => {
                                    let file = event.target.files[0];
                                    let reader = new FileReader();
                                    let url = reader.readAsDataURL(file);
                                    reader.onloadend = function (e) {
                                        this.setState({
                                            questionfluPreview: [reader.result]
                                        });
                                    }.bind(this);
                                    this.setState({questionflu: file})
                                }}
                            />
                            {this.state.questionflu != '' &&
                            <ModalImage
                                small={this.state.questionfluPreview}
                                large={this.state.questionfluPreview}
                                className={'imageuploadpreview'}
                            />
                            }
                        </div>
                        <div className='text-center'>
                            {this.state.canEdit &&
                            <SweetButton
                                value={"ارسال"}
                                onButtonPress={(afterFetchListener) => {
                                    let method = SweetFetcher.METHOD_POST;
                                    let action = AccessManager.INSERT;
                                    const data = new FormData();
                                    data.append('messagereceiver', this.state.messagereceiver);
                                    data.append('orderserial', this.state.orderserial);
                                    data.append('questiontext', this.state.questiontext);
                                    data.append('questionflu', this.state.questionflu);
                                    data.append('sendername', this.state.sendername);
                                    data.append('sendertel', this.state.sendertel);

                                    data.append('personelno', this.state.personelno);
                                    data.append('degree', this.state.degree);
                                    data.append('unit', this.state.unit);
                                    data.append('voiceflu', this.state.voiceflu);
                                    data.append('subject', this.state.subject);
                                    new SweetFetcher().Fetch('/contactus/message', method, data,
                                        res => {
                                            SweetAlert.displaySimpleAlert("ارسال شد", 'پیام شما با موفقیت ارسال گردید، برای پیگیری وضعیت پیام ارسال شده کد رهگیری روبرو را به خاطر بسپارید:' + '\r\n' + res.Data.orderserial);
                                            this.setState({
                                                messagereceiver: -1,
                                                orderserial: '',
                                                questiontext: '',
                                                questionflu: null,
                                                questionfluPreview: null,
                                                sendername: '',
                                                sendertel: ''
                                            });
                                            afterFetchListener();
                                        }, (Error) => {
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert("خطای پیش بینی نشده", 'خطایی در ارسال پیام به وجود آمد');

                                        },
                                        'message', action,
                                        this.props.history);

                                }
                                }/>
                            }
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default contactus_messageSend;
