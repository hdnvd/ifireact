// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
class ifi_employeeManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	name:'',
	family:'',
	fathername:'',
	ismale:'',
	mellicode:'',
	shsh:'',
	shshserial:'',
	personelcode:'',
	employmentcode:'',
	role_fid:'',
	role_fidOptions:[],
	nationality_fid:'',
	nationality_fidOptions:[],
	paycenter_fid:'',
	paycenter_fidOptions:[],
	employmenttype_fid:'',
	employmenttype_fidOptions:[],
	born_date:moment().format('X'),
	childcount:'',
	ismarried:'',
	mobile:'',
	tel:'',
	address:'',
	zipcode:'',
	common_city_fid:'',
	common_city_fidOptions:[],
	accountnumber:'',
	cardnumber:'',
	bank_fid:'',
	bank_fidOptions:[],
	is_neededinsurance:'',
	is_payabale:'',
	passportnumber:'',
	passportserial:'',
	education:'',
	entrance_date:moment().format('X'),
	visatype_fid:'',
	visatype_fidOptions:[],
	visaexpire_date:moment().format('X'),
        };
        if(this.props.match.params.id>0){
        fetch('http://ifi.test/api/ifi/employees/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
            
		if(data.born_date<=0)
                    data.born_date=moment().format('X');
		if(data.entrance_date<=0)
                    data.entrance_date=moment().format('X');
		if(data.visaexpire_date<=0)
                    data.visaexpire_date=moment().format('X');
                 this.setState({ name:data.name,family:data.family,fathername:data.fathername,ismale:data.ismale,mellicode:data.mellicode,shsh:data.shsh,shshserial:data.shshserial,personelcode:data.personelcode,employmentcode:data.employmentcode,role_fid:data.role_fid,nationality_fid:data.nationality_fid,paycenter_fid:data.paycenter_fid,employmenttype_fid:data.employmenttype_fid,born_date:data.born_date,childcount:data.childcount,ismarried:data.ismarried,mobile:data.mobile,tel:data.tel,address:data.address,zipcode:data.zipcode,common_city_fid:data.common_city_fid,accountnumber:data.accountnumber,cardnumber:data.cardnumber,bank_fid:data.bank_fid,is_neededinsurance:data.is_neededinsurance,is_payabale:data.is_payabale,passportnumber:data.passportnumber,passportserial:data.passportserial,education:data.education,entrance_date:data.entrance_date,visatype_fid:data.visatype_fid,visaexpire_date:data.visaexpire_date,});
        
            });
        }
fetch('http://ifi.test/api/ifi/roles')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({role_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/nationalitys')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({nationality_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/paycenters')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({paycenter_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/employmenttypes')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({employmenttype_fidOptions:Options})
            });
fetch('http://ifi.test/api/placeman/provinces')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({common_city_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/banks')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({bank_fidOptions:Options})
            });
fetch('http://ifi.test/api/ifi/visatypes')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({visatype_fidOptions:Options})
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>ifi_employeeManage</p>
                        
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
                            <FormInline>
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
                                label='کد ملی'
                                group
                                type='text'
                                validate
                                value={this.state.mellicode}
                                onChange={(event)=>{this.setState({mellicode:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره شناسنامه'
                                group
                                type='text'
                                validate
                                value={this.state.shsh}
                                onChange={(event)=>{this.setState({shsh:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='سریال شناسنامه'
                                group
                                type='text'
                                validate
                                value={this.state.shshserial}
                                onChange={(event)=>{this.setState({shshserial:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='کد پرسنلی'
                                group
                                type='text'
                                validate
                                value={this.state.personelcode}
                                onChange={(event)=>{this.setState({personelcode:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='کد استخدام'
                                group
                                type='text'
                                validate
                                value={this.state.employmentcode}
                                onChange={(event)=>{this.setState({employmentcode:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.role_fid} onChange={(event)=>{this.setState({role_fid:event.target.value})}}>
                                <option>سمت</option>
                                {this.state.role_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.nationality_fid} onChange={(event)=>{this.setState({nationality_fid:event.target.value})}}>
                                <option>ملیت</option>
                                {this.state.nationality_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.paycenter_fid} onChange={(event)=>{this.setState({paycenter_fid:event.target.value})}}>
                                <option>مرکز هزینه</option>
                                {this.state.paycenter_fidOptions}
                            </select>
                            </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.employmenttype_fid} onChange={(event)=>{this.setState({employmenttype_fid:event.target.value})}}>
                                <option>نوع بکارگیری</option>
                                {this.state.employmenttype_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <DatePicker
                                label='تاریخ تولد'
                                group
                                value={moment.unix(parseInt(this.state.born_date))}
                                onChange={(value)=>{
                                let date=moment(value).format('X');
                                if(date!=this.state.born_date)
                                        this.setState({born_date:date})
                                }}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='تعداد فرزندان'
                                group
                                type='text'
                                validate
                                value={this.state.childcount}
                                onChange={(event)=>{this.setState({childcount:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                    <Input
                                        onClick={() => this.setState({ismarried : 0})}
                                        checked={this.state.ismarried === 0}
                                        label='مجرد'
                                        type='radio'
                                        id='radioismarried1'
                                    />
                                    <Input
                                        onClick={() => this.setState({ismarried : 1})}
                                        checked={this.state.ismarried === 1}
                                        label='متاهل'
                                        type='radio'
                                        id='radioismarried2'
                                    />
                                </FormInline>
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='موبایل'
                                group
                                type='text'
                                validate
                                value={this.state.mobile}
                                onChange={(event)=>{this.setState({mobile:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='تلفن'
                                group
                                type='text'
                                validate
                                value={this.state.tel}
                                onChange={(event)=>{this.setState({tel:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='آدرس'
                                group
                                type='text'
                                validate
                                value={this.state.address}
                                onChange={(event)=>{this.setState({address:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='کدپستی'
                                group
                                type='text'
                                validate
                                value={this.state.zipcode}
                                onChange={(event)=>{this.setState({zipcode:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.common_city_fid} onChange={(event)=>{this.setState({common_city_fid:event.target.value})}}>
                                <option>شهر</option>
                                {this.state.common_city_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره حساب'
                                group
                                type='text'
                                validate
                                value={this.state.accountnumber}
                                onChange={(event)=>{this.setState({accountnumber:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره کارت'
                                group
                                type='text'
                                validate
                                value={this.state.cardnumber}
                                onChange={(event)=>{this.setState({cardnumber:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.bank_fid} onChange={(event)=>{this.setState({bank_fid:event.target.value})}}>
                                <option>بانک</option>
                                {this.state.bank_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <FormInline>
                                    <Input
                                        onClick={() => this.setState({is_neededinsurance : 0})}
                                        checked={this.state.is_neededinsurance === 0}
                                        label='is_neededinsurance ندارد'
                                        type='radio'
                                        id='radiois_neededinsurance1'
                                    />
                                    <Input
                                        onClick={() => this.setState({is_neededinsurance : 1})}
                                        checked={this.state.is_neededinsurance === 1}
                                        label='is_neededinsurance دارد'
                                        type='radio'
                                        id='radiois_neededinsurance2'
                                    />
                                </FormInline>
                        </div>
                        <div className='grey-text'>
                            <FormInline>
                                    <Input
                                        onClick={() => this.setState({is_payabale : 0})}
                                        checked={this.state.is_payabale === 0}
                                        label='is_payabale ندارد'
                                        type='radio'
                                        id='radiois_payabale1'
                                    />
                                    <Input
                                        onClick={() => this.setState({is_payabale : 1})}
                                        checked={this.state.is_payabale === 1}
                                        label='is_payabale دارد'
                                        type='radio'
                                        id='radiois_payabale2'
                                    />
                                </FormInline>
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره پاسپورت'
                                group
                                type='text'
                                validate
                                value={this.state.passportnumber}
                                onChange={(event)=>{this.setState({passportnumber:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='شماره سریال پاسپورت'
                                group
                                type='text'
                                validate
                                value={this.state.passportserial}
                                onChange={(event)=>{this.setState({passportserial:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <MDBInput
                                label='تحصیلات'
                                group
                                type='text'
                                validate
                                value={this.state.education}
                                onChange={(event)=>{this.setState({education:event.target.value})}}
                            />
                        </div>
                        <div className='grey-text'>
                            <DatePicker
                                label='تاریخ ورود'
                                group
                                value={moment.unix(parseInt(this.state.entrance_date))}
                                onChange={(value)=>{
                                let date=moment(value).format('X');
                                if(date!=this.state.entrance_date)
                                        this.setState({entrance_date:date})
                                }}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.visatype_fid} onChange={(event)=>{this.setState({visatype_fid:event.target.value})}}>
                                <option>نوع ویزا</option>
                                {this.state.visatype_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <DatePicker
                                label='تاریخ انقضا ویزا'
                                group
                                value={moment.unix(parseInt(this.state.visaexpire_date))}
                                onChange={(value)=>{
                                let date=moment(value).format('X');
                                if(date!=this.state.visaexpire_date)
                                        this.setState({visaexpire_date:date})
                                }}
                            />
                        </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={()=> {
                            let id = '';
                                if (this.props.match.params.id > 0)
                                    id = '/' + this.props.match.params.id;
                                const data = new FormData();
                                
	data.append('name', this.state.name);
	data.append('family', this.state.family);
	data.append('fathername', this.state.fathername);
	data.append('ismale', this.state.ismale);
	data.append('mellicode', this.state.mellicode);
	data.append('shsh', this.state.shsh);
	data.append('shshserial', this.state.shshserial);
	data.append('personelcode', this.state.personelcode);
	data.append('employmentcode', this.state.employmentcode);
	data.append('role_fid', this.state.role_fid);
	data.append('nationality_fid', this.state.nationality_fid);
	data.append('paycenter_fid', this.state.paycenter_fid);
	data.append('employmenttype_fid', this.state.employmenttype_fid);
	data.append('born_date', this.state.born_date);
	data.append('childcount', this.state.childcount);
	data.append('ismarried', this.state.ismarried);
	data.append('mobile', this.state.mobile);
	data.append('tel', this.state.tel);
	data.append('address', this.state.address);
	data.append('zipcode', this.state.zipcode);
	data.append('common_city_fid', this.state.common_city_fid);
	data.append('accountnumber', this.state.accountnumber);
	data.append('cardnumber', this.state.cardnumber);
	data.append('bank_fid', this.state.bank_fid);
	data.append('is_neededinsurance', this.state.is_neededinsurance);
	data.append('is_payabale', this.state.is_payabale);
	data.append('passportnumber', this.state.passportnumber);
	data.append('passportserial', this.state.passportserial);
	data.append('education', this.state.education);
	data.append('entrance_date', this.state.entrance_date);
	data.append('visatype_fid', this.state.visatype_fid);
	data.append('visaexpire_date', this.state.visaexpire_date);
	if(id!=='')
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/ifi/employees'+id, {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                    mode: 'cors',
                                    crossDomain:true,
                                    body: data
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.hasOwnProperty('errors')) {
                                            alert('خطا','خطایی در ثبت اطلاعات بوجود آمد');
                                        }
                                        else {
                                            return this.props.history.push('/ifi/employees');   

                                            //alert('پیام',res.message);
                                        }
                                        // console.log(res);
                                    }).catch(function (error) {
                                    alert('خطا','خطایی در ثبت اطلاعات بوجود آمد');
                                    throw error;
                                });
                            }
                            }>ذخیره</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default ifi_employeeManage;
