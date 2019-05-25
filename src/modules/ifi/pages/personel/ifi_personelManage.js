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

class ifi_personelManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canEdit:AccessManager.UserCan('ifi','personel',AccessManager.EDIT),

            personelno:'',
            nationalcode:'',
            name:'',
            family:'',
            gender_fid:'',
            gender_fidOptions:[],
            fathername:'',
            birth_date:'',
            certificationnumber:'',
            birthplace:'',
            nationality_fid:'',
            nationality_fidOptions:[],
            hesabno:'',
            hmeli:'',
            branch:'',
        };
        if(this.props.match.params.id>0){
            new SweetFetcher().Fetch('/personel/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
                data => {
                    data.Data=Common.convertNullKeysToEmpty(data.Data);

                    this.setState({ personelno:data.Data.personelno,nationalcode:data.Data.nationalcode,name:data.Data.name,family:data.Data.family,gender_fid:data.Data.gender,fathername:data.Data.fathername,birth_date:data.Data.birthdate,certificationnumber:data.Data.certificationnumber,birthplace:data.Data.birthplace,nationality_fid:data.Data.nationality,hesabno:data.Data.hesabno,hmeli:data.Data.hmeli,branch:data.Data.branch,});
                },null,
                'personel',AccessManager.VIEW,
                this.props.history);
        }//IF
        new SweetFetcher().Fetch('/dfn?pid=20',SweetFetcher.METHOD_GET,null,
            data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({gender_fidOptions:Options});
            },null,
            'gender',AccessManager.VIEW,
            this.props.history);
        new SweetFetcher().Fetch('/dfn?pid=30',SweetFetcher.METHOD_GET,null,
            data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({nationality_fidOptions:Options});
            },null,
            'nationality',AccessManager.VIEW,
            this.props.history);

    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف پرسنل</p>

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
                                onChange={(event)=>{this.setState({personelno:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nationalcode'>کد ملی</label>
                            <InputMask
                                mask='9999999999'
                                className='form-control ltr_field'

                                readOnly={!this.state.canEdit}
                                id='nationalcode'
                                group
                                type='text'
                                validate
                                value={this.state.nationalcode}
                                onChange={(event)=>{this.setState({nationalcode:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>نام</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='name'
                                group
                                type='text'
                                validate
                                value={this.state.name}
                                onChange={(event)=>{this.setState({name:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='family'>نام خانوادگی</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='family'
                                group
                                type='text'
                                validate
                                value={this.state.family}
                                onChange={(event)=>{this.setState({family:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>

                            <label htmlFor='gender_fid'>جنسیت</label>
                            <select
                                id='gender_fid'
                                className='browser-default custom-select'
                                value={this.state.gender_fid}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({gender_fid:event.target.value})}}>
                                <option>...انتخاب کنید</option>
                                {this.state.gender_fidOptions}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='fathername'>نام پدر</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='fathername'
                                group
                                type='text'
                                validate
                                value={this.state.fathername}
                                onChange={(event)=>{this.setState({fathername:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='birth_date'>تاریخ تولد</label>
                            <InputMask
                                mask='9999/99/99'
                                className='form-control ltr_field'

                                readOnly={!this.state.canEdit}
                                id='birth_date'
                                group
                                type='text'
                                validate
                                value={this.state.birth_date}
                                onChange={(event)=>{this.setState({birth_date:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='certificationnumber'>شماره شناسنامه</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='certificationnumber'
                                group
                                type='text'
                                validate
                                value={this.state.certificationnumber}
                                onChange={(event)=>{this.setState({certificationnumber:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='birthplace'>محل تولد</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='birthplace'
                                group
                                type='text'
                                validate
                                value={this.state.birthplace}
                                onChange={(event)=>{this.setState({birthplace:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>

                            <label htmlFor='nationality_fid'>ملیت</label>
                            <select
                                id='nationality_fid'
                                className='browser-default custom-select'
                                value={this.state.nationality_fid}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({nationality_fid:event.target.value})}}>
                                <option>...انتخاب کنید</option>
                                {this.state.nationality_fidOptions}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='hesabno'>شماره حساب</label>
                            <InputMask
                                mask='9999999999'
                                className='form-control ltr_field'

                                readOnly={!this.state.canEdit}
                                id='hesabno'
                                group
                                type='text'
                                validate
                                value={this.state.hesabno}
                                onChange={(event)=>{this.setState({hesabno:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='hmeli'>شماره حساب بانک ملی</label>
                            <InputMask
                                mask='9999999999'
                                className='form-control ltr_field'

                                readOnly={!this.state.canEdit}
                                id='hmeli'
                                group
                                type='text'
                                validate
                                value={this.state.hmeli}
                                onChange={(event)=>{this.setState({hmeli:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='branch'>شعبه</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='branch'
                                group
                                type='text'
                                validate
                                value={this.state.branch}
                                onChange={(event)=>{this.setState({branch:event.target.value})}}
                            />
                        </div>
                        <div className='text-center'>
                            {this.state.canEdit &&
                            <MDBBtn onClick={() => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let action=AccessManager.INSERT;
                                if (this.props.match.params.id > 0)
                                    id = this.props.match.params.id;
                                const data = new URLSearchParams();

                                data.append('personelno', this.state.personelno);
                                data.append('nationalcode', this.state.nationalcode);
                                data.append('name', this.state.name);
                                data.append('family', this.state.family);
                                data.append('gender', this.state.gender_fid);
                                data.append('fathername', this.state.fathername);
                                data.append('birthdate', this.state.birth_date);
                                data.append('certificationnumber', this.state.certificationnumber);
                                data.append('birthplace', this.state.birthplace);
                                data.append('nationality', this.state.nationality_fid);
                                data.append('hesabno', this.state.hesabno);
                                data.append('hmeli', this.state.hmeli);
                                data.append('branch', this.state.branch);
                                if(id!==''){
                                    method=SweetFetcher.METHOD_PUT;
                                    action=AccessManager.EDIT;
                                    data.append('personelid', id);
                                }
                                new SweetFetcher().Fetch('/personel/'+id,method,data,
                                    res => {
                                        return this.props.history.push('/ifi/personels');
                                        //console.log(res);
                                    },null,
                                    'personel',action,
                                    this.props.history);

                            }
                            }>ذخیره</MDBBtn>
                            }
                            <MDBBtn onClick={() =>
                            {
                                this.props.history.push('/ifi/personels');
                            }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default ifi_personelManage;