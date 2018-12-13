// @flow
import * as React from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, FormInline, Input} from 'mdbreact';
import DatePicker from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
import Constants from "../../../../classes/Constants";
import Cookies from "universal-cookie";
import IfiFetcher from "../../../../classes/ifi-fetcher";

class ifi_dfnManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            latinname: '',
            vlu: '',
            vlutxt: '',
            tag: '',
            is_readonly: '',
            dfn_fid: '',
            dfn_fidOptions: [],
        };
        if (this.props.match.params.id > 0) {

            new IfiFetcher().Fetch('/dfn', 'get',null, data => {
                let Options = data.map(item => <option value={item.ID}>{item.Name}</option>);
                this.setState({dfn_fidOptions: Options})
            }, this.props.history);
            new IfiFetcher().Fetch('/dfn', 'get',null, data => {
                data = data[1];
                this.setState({
                    name: data.Name,
                    latinname: data.LatinName,
                    vlu: data.Vlu,
                    vlutxt: data.VluTxt,
                    tag: data.Tag,
                    is_readonly: data.Readonly,
                    dfn_fid: data.PID,
                });

            }, this.props.history);

        }
    }

    render() {
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>مدیریت فیلدهای ثابت</p>

                        <div className='grey-text'>
                            <MDBInput
                                label='نام'
                                group
                                type='text'
                                validate
                                value={this.state.name}
                                onChange={(event) => {
                                    this.setState({name: event.target.value})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='نام لاتین'
                                group
                                type='text'
                                validate
                                value={this.state.latinname}
                                onChange={(event) => {
                                    this.setState({latinname: event.target.value})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='مقدار'
                                group
                                type='text'
                                validate
                                value={this.state.vlu}
                                onChange={(event) => {
                                    this.setState({vlu: event.target.value})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='متن مقدار'
                                group
                                type='text'
                                validate
                                value={this.state.vlutxt}
                                onChange={(event) => {
                                    this.setState({vlutxt: event.target.value})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='تگ'
                                group
                                type='text'
                                validate
                                value={this.state.tag}
                                onChange={(event) => {
                                    this.setState({tag: event.target.value})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                <Input
                                    onClick={() => this.setState({is_readonly: 0})}
                                    checked={this.state.is_readonly === 0}
                                    label='غیر قابل ویرایش'
                                    type='radio'
                                    id='radiois_readonly1'
                                />
                                <Input
                                    onClick={() => this.setState({is_readonly: 1})}
                                    checked={this.state.is_readonly === 1}
                                    label='قابل ویرایش'
                                    type='radio'
                                    id='radiois_readonly2'
                                />
                            </FormInline>
                        </div>

                        <div className='grey-text'>
                            <select className='browser-default custom-select' value={this.state.dfn_fid}
                                    onChange={(event) => {
                                        this.setState({dfn_fid: event.target.value})
                                    }}>
                                <option>فیلد مادر</option>
                                {this.state.dfn_fidOptions}
                            </select>
                        </div>
                        <div className='text-center'>
                            <MDBBtn onClick={() => {

                                let id = '';
                                let method="post";
                                if (this.props.match.params.id > 0)
                                    id =this.props.match.params.id;
                                const data = new URLSearchParams();
                                data.append('Name', this.state.name);
                                data.append('LatinName', this.state.latinname);
                                data.append('Vlu', this.state.vlu);
                                data.append('VluTxt', this.state.vlutxt);
                                data.append('Tag', this.state.tag);
                                data.append('Readonly', this.state.is_readonly);
                                data.append('guid', this.state.guid);
                                data.append('PID', this.state.dfn_fid);
                                if (id !== '')
                                    method='put';
                                new IfiFetcher().Fetch('/dfn',method,data,res => {
                                    console.log(res);
                                    alert(res.statusText);
                                    return res.json();
                                },this.props.history);
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
