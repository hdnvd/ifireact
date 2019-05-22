// @flow
import * as React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    FormInline,
    Input,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";

import CKEditor from '@ckeditor/ckeditor5-react';

class sas_requestView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            canEdit: AccessManager.UserCan('sas', 'request', AccessManager.EDIT),

            requesttype: '',
            requesttypeOptions: [],
            device: '',
            deviceOptions: [],
            descriptionte: '',
            priority: '',
            attachmentflu: '',
            attachmentfluPreview: '',
            status: '',
            statusOptions: [],
            senderunit: '',
            senderunitOptions: [],
            currentunit: '',
            currentunitOptions: [],
            adminacceptancetime: '',
            securityacceptancetime: '',
            fullsendtime: '',
            letternumber: '',
            letterdate: '',
            senderuser: '',
            senderuserOptions: [],
            devicetype: '',
            finalcommittime:'0',

            newpriority: 0,
            newunit: 0,
            newstatus: 0,
            newmessage: '',
            userunitinfo:[],
            priorityOptions: [],
            displaySetStatusWindow: false,
            displaySendToOtherWindow: false,
            displayChangePriorityWindow: false,
            displaySendMessageWindow: false,
            messages:[],

        };


        if (this.props.match.params.id > 0) {
            new SweetFetcher().Fetch('/sas/request/' + this.props.match.params.id, SweetFetcher.METHOD_GET, null,
                data => {
                    data.Data = Common.convertNullKeysToEmpty(data.Data);

                    this.setState({
                        requesttype: data.Data.requesttypeinfo.name,
                        device: data.Data.deviceinfo,
                        descriptionte: data.Data.descriptionte,
                        priority: data.Data.priority,
                        attachmentfluPreview: Constants.SiteURL + '/' + data.Data.attachmentflu,
                        status: data.Data.statusinfo.name,
                        senderunit: data.Data.senderunitinfo,
                        currentunit: data.Data.currentunitinfo.name,
                        adminacceptancetime: data.Data.adminacceptancetime,
                        securityacceptancetime: data.Data.securityacceptancetime,
                        fullsendtime: data.Data.fullsendtime,
                        letternumber: data.Data.letternumber,
                        letterdate: data.Data.letterdate,
                        senderuser: data.Data.senderuserinfo.name,
                        finalcommittime: data.Data.finalcommittime,
                    });
                    new SweetFetcher().Fetch('/sas/devicetype' + '/' + data.Data.deviceinfo.devicetype, SweetFetcher.METHOD_GET, null,
                        data2 => {
                            this.setState({devicetype: data2.Data.name});
                        },
                        null, 'sas.devicetype', AccessManager.VIEW,
                        this.props.history);

                },
                null, 'sas.request', AccessManager.VIEW,
                this.props.history);


        }//IF
        new SweetFetcher().Fetch('/sas/status', SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <option value={item.id}>{item.name}</option>);
                this.setState({statusOptions: Options});
            },
            null, 'sas.status', AccessManager.LIST,
            this.props.history);

        new SweetFetcher().Fetch('/sas/unitsequence/userunits', SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <option value={item.destinationunit}>{item.destinationunitcontent}</option>);
                this.setState({currentunitOptions: Options});
            },
            null, 'sas.unit', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/sas/unit/userunitinfo', SweetFetcher.METHOD_GET, null,
            data => {
                this.setState({userunitinfo: data.Data});
                console.log("userunitinfo");
                console.log(this.state.userunitinfo);
            },
            null, 'sas.unit', AccessManager.LIST,
            this.props.history);new SweetFetcher().Fetch('/sas/unit/userunitinfo', SweetFetcher.METHOD_GET, null,
            data => {
                this.setState({userunitinfo: data.Data});
                console.log("userunitinfo");
                console.log(this.state.userunitinfo);
            },
            null, 'sas.unit', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/sas/request/message/'+this.props.match.params.id, SweetFetcher.METHOD_GET, null,
            data => {
                let Options = data.Data.map(item => <div className = 'sasmessagebar'>
                    <p className='sasmessagetitle'>{item.unitinfo.name}:</p>
                    <div className='sasmessage' dangerouslySetInnerHTML={{__html:item.messagete}}/>
                </div>);
                this.setState({messages: Options});
            },
            null, 'sas.requestmessage', AccessManager.LIST,
            this.props.history);


    }


    editorConfiguration = {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };

    /********SetStatusModal*****/
    toggleSetStatusWindow = () => {
        this.setState({
            displaySetStatusWindow: !this.state.displaySetStatusWindow
        });
    };
    setNewStatus = () => {
        this.toggleSetStatusWindow();
        if(this.state.newstatus!=null)
        {
            let id = this.props.match.params.id;
            const data = new FormData();
            let method = SweetFetcher.METHOD_PUT;
            let action = AccessManager.INSERT;
            data.append('id', id);
            data.append('status_fid', this.state.newstatus);

            new SweetFetcher().Fetch('/sas/request/status/' + id, method, data,
                res => {
                    SweetAlert.displaySimpleAlert('انجام شد', 'تغییر وضعیت با موفقیت انجام گردید');
                    // return this.props.history.push('/sas/requests');
                }, (error) => {
                    let status = error.response.status;
                    // afterFetchListener();
                    SweetAlert.displaySimpleAlert('خطای پیش بینی نشده', 'خطایی در ذخیره اطلاعات به وجود آمد' + status.toString().trim());

                },
                'sas.request', action,
                this.props.history);
        }
        // if(this.newstatus!=null)
        // this.LoadData(Constants.DefaultPageSize,1,null,Common.ObjectToIdValueArray(this.searchParams));
    };
    SetStatusWindow = null;

    /********SendToOtherModal*****/
    toggleSendToOtherWindow = () => {
        this.setState({
            displaySendToOtherWindow: !this.state.displaySendToOtherWindow
        });
    };
    SendToOther = () => {
        this.toggleSendToOtherWindow();
        if(this.state.newunit!=null)
        {
            // alert(this.state.newunit)
            let id = this.props.match.params.id;
            const data = new FormData();
            let method = SweetFetcher.METHOD_PUT;
            let action = AccessManager.INSERT;
            data.append('id', id);
            data.append('receiver__unit_fid', this.state.newunit);

            new SweetFetcher().Fetch('/sas/request/unit/' + id, method, data,
                res => {
                    return this.props.history.push('/sas/outbox');
                }, (error) => {
                    let status = error.response.status;
                    // afterFetchListener();
                    SweetAlert.displaySimpleAlert('خطای پیش بینی نشده', 'خطایی در ذخیره اطلاعات به وجود آمد' + status.toString().trim());

                },
                'sas.request', action,
                this.props.history);
        }
    };
    SendToOtherWindow = null;


    /********ChangePriorityModal*****/
    toggleChangePriorityWindow = () => {
        this.setState({
            displayChangePriorityWindow: !this.state.displayChangePriorityWindow
        });
    };
    ChangePriority = () => {
        this.toggleChangePriorityWindow();
        if(this.state.newpriority!=null)
        {
            let id = this.props.match.params.id;
            const data = new FormData();
            let method = SweetFetcher.METHOD_PUT;
            let action = AccessManager.INSERT;
            data.append('id', id);
            data.append('priority', this.state.newpriority);

            new SweetFetcher().Fetch('/sas/request/priority/' + id, method, data,
                res => {
                    // return this.props.history.push('/sas/requests');
                }, (error) => {
                    let status = error.response.status;
                    // afterFetchListener();
                    SweetAlert.displaySimpleAlert('خطای پیش بینی نشده', 'خطایی در ذخیره اطلاعات به وجود آمد' + status.toString().trim());

                },
                'sas.request', action,
                this.props.history);
        }
        // if(this.newstatus!=null)
        // this.LoadData(Constants.DefaultPageSize,1,null,Common.ObjectToIdValueArray(this.searchParams));
    };
    ChangePriorityWindow = null;

    /********SendMessageModal*****/
    toggleSendMessageWindow = () => {
        this.setState({
            displaySendMessageWindow: !this.state.displaySendMessageWindow
        });
    };
    SendMessage = () => {
        this.toggleSendMessageWindow();
        if(this.state.newmessage!=null)
        {
            let id = this.props.match.params.id;
            const data = new FormData();
            let method = SweetFetcher.METHOD_PUT;
            let action = AccessManager.INSERT;
            data.append('id', id);
            data.append('message', this.state.newmessage);

            new SweetFetcher().Fetch('/sas/request/message/' + id, method, data,
                res => {
                    return this.props.history.push('/sas/outbox');
                }, (error) => {
                    let status = error.response.status;
                    // afterFetchListener();
                    SweetAlert.displaySimpleAlert('خطای پیش بینی نشده', 'خطایی در ذخیره اطلاعات به وجود آمد' + status.toString().trim());

                },
                'sas.request', action,
                this.props.history);
        }

    };
    SendMessageWindow = null;


    ApproveRequest = () => {
        let id = this.props.match.params.id;
        const data = new FormData();
        let method = SweetFetcher.METHOD_PUT;
        let action = AccessManager.INSERT;
        data.append('id', id);

        new SweetFetcher().Fetch('/sas/request/approve/' + id, method, data,
            res => {
                return this.props.history.push('/sas/outbox');
            }, (error) => {
                let status = error.response.status;
                // afterFetchListener();
                SweetAlert.displaySimpleAlert('خطای پیش بینی نشده', 'خطایی در ذخیره اطلاعات به وجود آمد' + status.toString().trim());

            },
            'sas.request', action,
            this.props.history);

    };
    canApprove=()=>
    {};

    canChange=()=>
    {};

    isCommited=()=>
    {};
    render() {
        this.canApprove=()=>
        {
            if(!AccessManager.UserCan('sas','request','approve'))
                return false;
            return !this.isCommited() && ((AccessManager.getUserRoles()[0].includes("_unitadmin") && this.state.adminacceptancetime <= 0) || (AccessManager.getUserRoles()[0].includes("_unitsecurity") && this.state.securityacceptancetime <= 0));
        };

        this.canChange=()=>
        {
            // alert(this.state.senderunit.id);
            // alert(this.state.userunitinfo.id);
            // console.log("SU");
            // console.log(this.state.senderunit);
            // console.log(this.state.userunitinfo.unit);
            // return true;
            if(!AccessManager.UserCan('sas','request','change'))
                return false;
            if(this.state.userunitinfo.unit==null)
                return false;
            return !this.isCommited() &&  this.state.senderunit.id !== this.state.userunitinfo.unit.id;
        };

        this.isCommited=()=>
        {
            // console.log("Committime:"+this.state.finalcommittime);
            return this.state.finalcommittime !== '0';
        };
        // alert(AccessManager.getUserRoles()[0]);
        this.SetStatusWindow = <MDBModal isOpen={this.state.displaySetStatusWindow} toggle={this.toggleSetStatusWindow}>
            <MDBModalHeader toggle={this.toggleSetStatusWindow}>ثبت وضعیت جدید</MDBModalHeader>
            <MDBModalBody>
                <div className='form-group'>
                    <label htmlFor='status'>وضعیت جدید</label>
                    <select
                        id='status'
                        className='browser-default custom-select'
                        onChange={(event) => {
                            this.setState({newstatus :event.target.value});
                        }}>

                        <option value={0}>انتخاب کنید</option>
                        {this.state.statusOptions}
                    </select>
                </div>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='secondary' onClick={this.toggleSetStatusWindow}>بستن</MDBBtn>
                <MDBBtn color='primary' onClick={this.setNewStatus}>ثبت</MDBBtn>
            </MDBModalFooter>
        </MDBModal>;

        this.SendToOtherWindow =
            <MDBModal isOpen={this.state.displaySendToOtherWindow} toggle={this.toggleSendToOtherWindow}>
                <MDBModalHeader toggle={this.toggleSendToOtherWindow}>ارسال درخواست به بخش های دیگر</MDBModalHeader>
                <MDBModalBody>
                    <div className='form-group'>
                        <label htmlFor='status'>بخش دریافت کننده</label>
                        <select
                            id='status'
                            className='browser-default custom-select'
                            onChange={(event) => {
                                // alert(event.target.value);
                                this.setState({newunit : event.target.value});
                            }}>

                            <option value={0}>انتخاب کنید</option>
                            {this.state.currentunitOptions}
                        </select>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={this.toggleSendToOtherWindow}>بستن</MDBBtn>
                    <MDBBtn color='primary' onClick={this.SendToOther}>ارسال</MDBBtn>
                </MDBModalFooter>
            </MDBModal>;
        this.ChangePriorityWindow =
            <MDBModal isOpen={this.state.displayChangePriorityWindow} toggle={this.toggleChangePriorityWindow}>
                <MDBModalHeader toggle={this.toggleChangePriorityWindow}>تغییر اولویت درخواست</MDBModalHeader>
                <MDBModalBody>
                    <div className='form-group'>
                        <label htmlFor='status'>اولویت جدید</label>
                        <select
                            id='status'
                            className='browser-default custom-select'
                            onChange={(event) => {
                                    this.setState({newpriority : event.target.value});
                            }}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={this.toggleChangePriorityWindow}>بستن</MDBBtn>
                    <MDBBtn color='primary' onClick={this.ChangePriority}>ثبت</MDBBtn>
                </MDBModalFooter>
            </MDBModal>;
        this.SendMessageWindow =
            <MDBModal isOpen={this.state.displaySendMessageWindow} toggle={this.toggleSendMessageWindow}>
                <MDBModalHeader toggle={this.toggleSendMessageWindow}>ثبت پیام/گزارش جدید بر روی
                    درخواست</MDBModalHeader>
                <MDBModalBody>
                    <div className='form-group'>
                        <label htmlFor='status'>متن پیام</label>
                        <CKEditor
                            className='form-control'
                            id='content'
                            group
                            editor={ClassicEditor}
                            config={this.editorConfiguration}
                            data={this.state.newmessage}
                            onChange={(event, editor) => {
                                this.setState({newmessage: editor.getData()});
                            }}
                        />
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={this.toggleSendMessageWindow}>بستن</MDBBtn>
                    <MDBBtn color='primary' onClick={this.SendMessage}>ثبت</MDBBtn>
                </MDBModalFooter>
            </MDBModal>;
        return <MDBContainer>

            <MDBRow className='bigoperationsrow'>

                <MDBCol md='12'>
                    <div className='text-center'>


                        <p className='h5 text-center mb-4'> اطلاعات خدمات</p>
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow className='bigoperationsrow'>

                <MDBCol md='12'>
                    <div className='text-center'>

                        {this.SetStatusWindow}
                        {this.SendToOtherWindow}
                        {this.ChangePriorityWindow}
                        {this.SendMessageWindow}
                        {this.canChange() &&
                            <MDBBtn onClick={this.toggleSetStatusWindow}>ثبت وضعیت</MDBBtn>}
                        {this.canChange() &&
                            <MDBBtn onClick={this.toggleSendToOtherWindow}>ارسال به بخش های دیگر</MDBBtn>
                        }
                        {this.canChange() &&
                            <MDBBtn onClick={this.toggleChangePriorityWindow}>تغییر اولویت</MDBBtn>
                        }
                        {!this.isCommited() &&
                            <MDBBtn onClick={this.toggleSendMessageWindow}>ثبت پیام</MDBBtn>
                        }
                        {this.canApprove() &&
                        <MDBBtn onClick={this.ApproveRequest}>تایید ارسال</MDBBtn>
                        }
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md='6'>
                    <form>

                        <div className='form-group smallform-group'>
                            <label>نوع درخواست</label>
                            <label
                                className='valuelabel'>
                                {this.state.requesttype}
                            </label>
                        </div>
                        <div className='form-group smallform-group'>
                            <label>تجهیز</label>
                            <label
                                className='valuelabel'>
                                {this.state.devicetype + " با شماره سریال " + this.state.device.code}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>توضیحات</label>
                            <div dangerouslySetInnerHTML={{__html: this.state.descriptionte}}/>
                        </div>
                        <div className='form-group'>
                            <label>اولویت</label>
                            <div>
                                <label
                                    className='valuelabel'>
                                    {this.state.priority}
                                </label>
                            </div>

                        </div>
                        <div className='form-group'>
                            <label htmlFor='attachmentflu'>ضمیمه</label>

                            <ModalImage
                                small={this.state.attachmentfluPreview}
                                large={this.state.attachmentfluPreview}
                                className={'imageuploadpreview'}/>
                        </div>

                        <div className='form-group'>
                            <label>وضعیت</label>
                            <label
                                className='valuelabel'>
                                {this.state.status}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>بخش ارسال کننده</label>
                            <label
                                className='valuelabel'>
                                {this.state.senderunit.name}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>بخش فعلی</label>
                            <label
                                className='valuelabel'>
                                {this.state.currentunit}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>شماره نامه</label>
                            <label
                                className='valuelabel'>
                                {this.state.letternumber}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تاریخ نامه</label>
                            <label
                                className='valuelabel'>
                                {this.state.letterdate}
                            </label>
                        </div>
                        <div className='text-center'>
                            <MDBBtn onClick={() => {
                                this.props.history.push('/sas/outbox');
                            }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>


                    <MDBCol md='6'>
                        <div className='text-center'>
                            <p className='h5 text-center mb-4'>پیام های ثبت شده</p>
                        </div>
                        {this.state.messages}
                    </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_requestView;
