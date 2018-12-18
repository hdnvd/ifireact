// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
// import '../../../../scss/mbreactpersian.scss';
class ifi_personelManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	personelno:'',
	nationalcode:'',
	name:'',
	family:'',
	ismale:'',
	fathername:'',
	birth_date:moment().format('X'),
	certificationnumber:'',
	birthplace_fid:'',
	birthplace_fidOptions:[],
	nationality_fid:'',
	nationality_fidOptions:[],
	hesabno:'',
	branch_fid:'',
	branch_fidOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/personel/'+this.props.match.params.id, 'get',null,
        data => {
            
		if(data.Data.birth_date<=0)
                    data.birth_date=moment().format('X');
                 this.setState({ personelno:data.Data.personelno,nationalcode:data.Data.nationalcode,name:data.Data.name,family:data.Data.family,ismale:data.Data.ismale,fathername:data.Data.fathername,birth_date:data.Data.birth_date,certificationnumber:data.Data.certificationnumber,birthplace_fid:data.Data.birthplace_fid,nationality_fid:data.Data.nationality_fid,hesabno:data.Data.hesabno,branch_fid:data.Data.branch_fid,});
            }, 
            this.props.history);
        }//IF
// new SweetFetcher().Fetch('/dfn?PID=20','get',null,
//                 data=>{
//                 let Options=data.Data.map(item=><option value={item.id}>{item.title}</option>);
//                 this.setState({birthplace_fidOptions:Options});
//             },
//             this.props.history);
new SweetFetcher().Fetch('/dfn?PID=30','get',null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({nationality_fidOptions:Options});
            },
            this.props.history);

        new SweetFetcher().Fetch('/dfn?PID=33','get',null,
            data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({branch_fidOptions:Options});
            },
            this.props.history);
        new SweetFetcher().Fetch('/dfn?PID=34','get',null,
            data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({birthplace_fidOptions:Options});
            },
            this.props.history);
// new SweetFetcher().Fetch('/ifi/branchs','get',null,
//                 data=>{
//                 let Options=data.Data.map(item=><option value={item.id}>{item.title}</option>);
//                 this.setState({branch_fidOptions:Options});
//             },
//             this.props.history);
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>مدیریت پرسنل</p>
                        
                        <div className='grey-text'>
                            <MDBInput
                                label='کد پرسنلی'
                                group
                                type='text'
                                validate
                                value={this.state.personelno}
                                onChange={(event)=>{this.setState({personelno:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='کد ملی'
                                group
                                type='text'
                                validate
                                value={this.state.nationalcode}
                                onChange={(event)=>{this.setState({nationalcode:event.target.value})}}
                            />
                        </div>
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
                                label='نام خانوادگی'
                                group
                                type='text'
                                validate
                                value={this.state.family}
                                onChange={(event)=>{this.setState({family:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                <label>جنسیت:</label>
                                    <Input
                                        onClick={() => this.setState({ismale : 0})}
                                        checked={this.state.ismale === 0}
                                        label='زن'
                                        type='radio'
                                        id='radioismale1'
                                    />
                                    <Input
                                        onClick={() => this.setState({ismale : 1})}
                                        checked={this.state.ismale === 1}
                                        label='مرد'
                                        type='radio'
                                        id='radioismale2'
                                    />
                                </FormInline>
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='نام پدر'
                                group
                                type='text'
                                validate
                                value={this.state.fathername}
                                onChange={(event)=>{this.setState({fathername:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <label>تاریخ تولد:</label>

                            <DatePicker
                                label='birth_date'
                                group
                                // value={this.state.birth_date}
                                onChange={(value)=>{
                                if(value!=this.state.birth_date)
                                        this.setState({birth_date:value})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره شناسنامه'
                                group
                                type='text'
                                validate
                                value={this.state.certificationnumber}
                                onChange={(event)=>{this.setState({certificationnumber:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.birthplace_fid} onChange={(event)=>{this.setState({birthplace_fid:event.target.value})}}>
                                <option>محل تولد</option>
                                {this.state.birthplace_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.nationality_fid} onChange={(event)=>{this.setState({nationality_fid:event.target.value})}}>
                                <option>ملیت</option>
                                {this.state.nationality_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره حساب'
                                group
                                type='text'
                                validate
                                value={this.state.hesabno}
                                onChange={(event)=>{this.setState({hesabno:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.branch_fid} onChange={(event)=>{this.setState({branch_fid:event.target.value})}}>
                                <option>شعبه</option>
                                {this.state.branch_fidOptions}
                            </select>
                            </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={() => {
                            let id = '';
                            let method='post';
                                if (this.props.match.params.id > 0)
                                    id = this.props.match.params.id;
                                const data = new URLSearchParams();
                                
	data.append('PersonelNo', this.state.personelno);
	data.append('NationalCode', this.state.nationalcode);
	data.append('Name', this.state.name);
	data.append('Family', this.state.family);
	data.append('Gender', this.state.ismale);
	data.append('FatherName', this.state.fathername);
	data.append('BirthDate', this.state.birth_date);
	data.append('CertificationNumber', this.state.certificationnumber);
	data.append('BirthPlace', this.state.birthplace_fid);
	data.append('Nationality', this.state.nationality_fid);
	data.append('HesabNo', this.state.hesabno);
	data.append('Branch', this.state.branch_fid);
	if(id!=='')
	method='put';
                                new SweetFetcher().Fetch('/personel/'+id,method,data,
                                res => {
                                            return this.props.history.push('/ifi/personels');
                                            // console.log(res);
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

export default ifi_personelManage;
