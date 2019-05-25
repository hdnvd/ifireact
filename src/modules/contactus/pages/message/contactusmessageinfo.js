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
import ProgressSoundPlayer from "../../../../classes/ProgressSoundPlayer";
import { Icons } from 'react-soundplayer/components';
import '../../../../scss/musicstyles.css';
const {
    SoundCloudLogoSVG,
    PlayIconSVG,
    PauseIconSVG,
    NextIconSVG,
    PrevIconSVG
} = Icons;

class contactusmessageinfo extends SweetComponent {

    render(){
        return <div>
                        <div className='form-group'>
                            <label>کد رهگیری</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.orderserial}
                            </label>
                        </div>
                        <div className='form-group'>

                            <label htmlFor='subject'>موضوع</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.subject}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>متن پیام</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.questiontext}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='question_flu'>تصویر ارسالی</label>
                            <ModalImage
                                small={this.props.data.questionfluPreview}
                                large={this.props.data.questionfluPreview}
                                className={'imageuploadpreview'}
                            />
                        </div>
            <div className='form-group'>
                <label htmlFor='voice_flu'>پیام صوتی</label>
                <ProgressSoundPlayer streamUrl={"https://sample-videos.com/audio/mp3/crowd-cheering.mp3"} />
            </div>
                        <div className='form-group'>
                            <label>نام و نشان ارسال کننده</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.sendername}
                            </label>
                        </div>
            <div className='form-group'>
                <label>کد پرسنلی</label>
                <label
                    className='valuelabel'>
                    {this.props.data.personelno}
                </label>
            </div>
                        <div className='form-group'>

                            <label htmlFor='subject'>درجه</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.degree}
                            </label>
                        </div>
                        <div className='form-group'>

                            <label htmlFor='subject'>یگان</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.unit}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تلفن تماس</label>
                            <label
                                className='valuelabel'>
                                {this.props.data.sendertel}
                            </label>
                        </div>
</div>
    }
}

export default contactusmessageinfo;
