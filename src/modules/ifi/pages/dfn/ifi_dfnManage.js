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

class ifi_dfnManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canEdit:AccessManager.UserCan('cmn_dfn',AccessManager.EDIT),

            name:'',
            latinname:'',
            vlu:'',
            vlutxt:'',
            tag:'',
            readonly:'',
            guid:'',
            dfn_fid:'',
            dfn_fidOptions:[],
        };
        if(this.props.match.params.id>0){
            new SweetFetcher().Fetch('/dfn/'+this.props.match.params.id, 'get',null,
                data => {

                    this.setState({ name:data.Data.name,latinname:data.Data.latinname,vlu:data.Data.vlu,vlutxt:data.Data.vlutxt,tag:data.Data.tag,readonly:data.Data.readonly,guid:data.Data.guid,dfn_fid:data.Data.pid,});
                },
                'dfn',AccessManager.VIEW,
                this.props.history);
        }//IF
        new SweetFetcher().Fetch('/dfn','get',null,
            data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({dfn_fidOptions:Options});
            },
            'dfn',AccessManager.VIEW,
            this.props.history);

    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف فیلدها</p>

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
                            <label htmlFor='latinname'>نام لاتین</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='latinname'
                                group
                                type='text'
                                validate
                                value={this.state.latinname}
                                onChange={(event)=>{this.setState({latinname:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='vlu'>مقدار</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='vlu'
                                group
                                type='text'
                                validate
                                value={this.state.vlu}
                                onChange={(event)=>{this.setState({vlu:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='vlutxt'>متن مقدار</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='vlutxt'
                                group
                                type='text'
                                validate
                                value={this.state.vlutxt}
                                onChange={(event)=>{this.setState({vlutxt:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='tag'>تگ</label>
                            <input
                                className='form-control'

                                readOnly={!this.state.canEdit}
                                id='tag'
                                group
                                type='text'
                                validate
                                value={this.state.tag}
                                onChange={(event)=>{this.setState({tag:event.target.value})}}
                            />
                        </div>
                        <div className='form-group'>
                            <FormInline>

                                <label>وضعیت</label>
                                <Input
                                    onClick={() => this.setState({readonly : 0})}
                                    checked={this.state.readonly == 0}
                                    label='قابل تغییر'
                                    type='radio'
                                    id='radioreadonly1'
                                    readOnly={!this.state.canEdit}
                                />
                                <Input
                                    onClick={() => this.setState({readonly : 1})}
                                    checked={this.state.readonly == 1}
                                    label='غیر قابل تغییر'
                                    type='radio'
                                    id='radioreadonly2'
                                    readOnly={!this.state.canEdit}
                                />
                            </FormInline>
                        </div>
                        <div className='grey-text'>

                            <label htmlFor='dfn_fid'>فیلد مادر</label>
                            <select
                                id='dfn_fid'
                                className='browser-default custom-select'
                                value={this.state.dfn_fid}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({dfn_fid:event.target.value})}}>
                                <option>...انتخاب کنید</option>
                                {this.state.dfn_fidOptions}
                            </select>
                        </div>
                        <div className='text-center'>
                            {this.state.canEdit &&
                            <MDBBtn onClick={() => {
                                let id = '';
                                let method='post';
                                let action=AccessManager.INSERT;
                                if (this.props.match.params.id > 0)
                                    id = this.props.match.params.id;
                                const data = new URLSearchParams();

                                data.append('name', this.state.name);
                                data.append('latinname', this.state.latinname);
                                data.append('vlu', this.state.vlu);
                                data.append('vlutxt', this.state.vlutxt);
                                data.append('tag', this.state.tag);
                                data.append('readonly', this.state.readonly);
                                data.append('pid', this.state.dfn_fid);
                                if(id!==''){
                                    method='put';
                                    action=AccessManager.EDIT;
                                    data.append('id', id);
                                }
                                new SweetFetcher().Fetch('/dfn/'+id,method,data,
                                    res => {
                                        return this.props.history.push('/ifi/dfns');
                                        //console.log(res);
                                    },
                                    'cmn_dfn',action,
                                    this.props.history);

                            }
                            }>ذخیره</MDBBtn>
                            }
                            <MDBBtn onClick={() =>
                            {
                                this.props.history.push('/ifi/dfns');
                            }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default ifi_dfnManage;