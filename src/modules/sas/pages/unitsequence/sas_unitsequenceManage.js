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
class sas_unitsequenceManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('sas','unitsequence',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),

			sourceunit:'',
			sourceunitOptions:[],
			destinationunit:'',
			destinationunitOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/sas/unitsequence/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

                 this.setState({ sourceunit:data.Data.sourceunit,destinationunit:data.Data.destinationunit,});
            },
            null,'sas.unitsequence',AccessManager.VIEW,
            this.props.history);
        }//IF

new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({sourceunitOptions:Options});
            },
            null,'sas.unit',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({destinationunitOptions:Options});
            },
            null,'sas.unit',AccessManager.LIST,
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
                        <p className='h5 text-center mb-4'>تعریف توالی بخش ها</p>

                    <div className='form-group'>
                        <label htmlFor='sourceunit'>بخش مبدا</label>
                        <select
                                id='sourceunit'
                                className='browser-default custom-select'
                                value={this.state.sourceunit}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({sourceunit:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.sourceunitOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='destinationunit'>بخش مقصد(بعدی)</label>
                        <select
                                id='destinationunit'
                                className='browser-default custom-select'
                                value={this.state.destinationunit}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({destinationunit:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.destinationunitOptions}
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

									data.append('sourceunit', this.state.sourceunit);
									data.append('destinationunit', this.state.destinationunit);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/sas/unitsequence'+Separator+id,method,data,
                                    res => {
                                                return this.props.history.push('/sas/unitsequences');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'sas.unitsequence',action,
                                        this.props.history);

                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/sas/unitsequences');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default sas_unitsequenceManage;
