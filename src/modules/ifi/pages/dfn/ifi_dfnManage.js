// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
class ifi_dfnManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            name:'',
            latinname:'',
            vlu:'',
            vlutxt:'',
            tag:'',
            is_readonly:'',
            guid:'',
            dfn_fid:'',
            dfn_fidOptions:[],
        };
        if(this.props.match.params.id>0){
            new SweetFetcher().Fetch('/dfn/'+this.props.match.params.id, 'get',null,
                data => {

                    this.setState({ name:data.Data.name,latinname:data.Data.latinname,vlu:data.Data.vlu,vlutxt:data.Data.vlutxt,tag:data.Data.tag,is_readonly:data.Data.readonly,guid:data.Data.guid,dfn_fid:data.Data.pid,});
                },
                this.props.history);

        }
        new SweetFetcher().Fetch('/dfn','get',null,
            data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({dfn_fidOptions:Options});
            },
            this.props.history);
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>مدیریت فیلد</p>

                        <div className='grey-text'>
                            <MDBInput
                                label='نام'
                                group
                                type='text'
                                validate
                                value={this.state.name}
                                onChange={(event)=>{this.setState({name:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='نام لاتین'
                                group
                                type='text'
                                validate
                                value={this.state.latinname}
                                onChange={(event)=>{this.setState({latinname:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='مقدار'
                                group
                                type='text'
                                validate
                                value={this.state.vlu}
                                onChange={(event)=>{this.setState({vlu:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='متن مقدار'
                                group
                                type='text'
                                validate
                                value={this.state.vlutxt}
                                onChange={(event)=>{this.setState({vlutxt:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='تگ'
                                group
                                type='text'
                                validate
                                value={this.state.tag}
                                onChange={(event)=>{this.setState({tag:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                <Input
                                    onClick={() => this.setState({is_readonly : 0})}
                                    checked={this.state.is_readonly === 0}
                                    label='قابل تغییر'
                                    type='radio'
                                    id='radiois_readonly1'
                                />
                                <Input
                                    onClick={() => this.setState({is_readonly : 1})}
                                    checked={this.state.is_readonly === 1}
                                    label='غیر قابل تغییر'
                                    type='radio'
                                    id='radiois_readonly2'
                                />
                            </FormInline>
                        </div>

                        <div className='grey-text'>
                            <select className='browser-default custom-select' value={this.state.dfn_fid} onChange={(event)=>{this.setState({dfn_fid:event.target.value})}}>
                                <option>فیلد مادر</option>
                                {this.state.dfn_fidOptions}
                            </select>
                        </div>
                        <div className='text-center'>
                            <MDBBtn onClick={() => {
                                let id = '';
                                let method='post';
                                if (this.props.match.params.id > 0)
                                    id = this.props.match.params.id;
                                const data = new URLSearchParams();

                                data.append('Name', this.state.name);
                                data.append('LatinName', this.state.latinname);
                                data.append('Vlu', this.state.vlu);
                                data.append('VluTxt', this.state.vlutxt);
                                data.append('Tag', this.state.tag);
                                data.append('Readonly', this.state.is_readonly);
                                data.append('PID', this.state.dfn_fid);
                                if(id!=='')
                                    method='put';
                                new SweetFetcher().Fetch('/dfn/'+id,method,data,
                                    res => {
                                    this.props.history.push('/ifi/dfns')
                                        console.log(res);
                                    },
                                    this.props.history);

                            }
                            }>ذخیره</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default ifi_dfnManage;