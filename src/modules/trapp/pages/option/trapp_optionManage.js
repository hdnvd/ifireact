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
class trapp_optionManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','option',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),

			name:'',
			free:0,
			countable:0,
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/option/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

                 this.setState({ name:data.Data.name,free:data.Data.free,countable:data.Data.countable,});
            },
            null,'trapp.option',AccessManager.VIEW,
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
                        <p className='h5 text-center mb-4'>تعریف امکانات ویلا</p>

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
                        </div>
                         {/*<div className='form-group'>*/}
                            {/*<FormInline>*/}
                            {/**/}
                           {/*<label>is_free</label>*/}
                                    {/*<Input*/}
                                        {/*onClick={() => this.setState({free : 0})}*/}
                                        {/*checked={this.state.free == 0}*/}
                                        {/*label='is_free ندارد'*/}
                                        {/*type='radio'*/}
                                        {/*id='radiois_free1'*/}
                                {/*readOnly={!this.state.canEdit}*/}
                                    {/*/>*/}
                                    {/*<Input*/}
                                        {/*onClick={() => this.setState({free : 1})}*/}
                                        {/*checked={this.state.free == 1}*/}
                                        {/*label='is_free دارد'*/}
                                        {/*type='radio'*/}
                                        {/*id='radiois_free2'*/}
                                {/*readOnly={!this.state.canEdit}*/}
                                    {/*/>*/}
                                {/*</FormInline>*/}
                        {/*</div>*/}
                         {/*<div className='form-group'>*/}
                            {/*<FormInline>*/}
                            {/**/}
                           {/*<label>is_countable</label>*/}
                                    {/*<Input*/}
                                        {/*onClick={() => this.setState({countable : 0})}*/}
                                        {/*checked={this.state.countable == 0}*/}
                                        {/*label='is_countable ندارد'*/}
                                        {/*type='radio'*/}
                                        {/*id='radiois_countable1'*/}
                                {/*readOnly={!this.state.canEdit}*/}
                                    {/*/>*/}
                                    {/*<Input*/}
                                        {/*onClick={() => this.setState({countable : 1})}*/}
                                        {/*checked={this.state.countable == 1}*/}
                                        {/*label='is_countable دارد'*/}
                                        {/*type='radio'*/}
                                        {/*id='radiois_countable2'*/}
                                {/*readOnly={!this.state.canEdit}*/}
                                    {/*/>*/}
                                {/*</FormInline>*/}
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
									// data.append('free', this.state.free);
									// data.append('countable', this.state.countable);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/trapp/option'+Separator+id,method,data,
                                    res => {
                                                return this.props.history.push('/trapp/options');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'trapp.option',action,
                                        this.props.history);

                                }
                                }
                                />
                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/trapp/options');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default trapp_optionManage;
