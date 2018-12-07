// @flow
import * as React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdEye,IoMdAddCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'

class ifi_employeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    };
    componentDidMount() {
        this.LoadData();
    }
    LoadData()
    {
            fetch('http://ifi.test/api/ifi/employees')
            .then(response => response.json())
            .then(data => {
                this.setState({ data:data })
            });
    };
    render(){
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/ifi/employees/management'}><IoMdAddCircle/></Link></div>
        <SweetTable
            filterable={true}
            className='-striped -highlight'
            defaultPageSize={10}
            data={this.state.data}
            columns={this.columns}
        />
        </div>;
    }

columns = [
{
    Header: 'نام',
    accessor: 'name'
},
{
    Header: 'نام خانوادگی',
    accessor: 'family'
},
{
    Header: 'نام پدر',
    accessor: 'fathername'
},
{
    Header: 'جنسیت',
    accessor: 'ismale'
},
{
    Header: 'کد ملی',
    accessor: 'mellicode'
},
{
    Header: 'شماره شناسنامه',
    accessor: 'shsh'
},
{
    Header: 'سریال شناسنامه',
    accessor: 'shshserial'
},
{
    Header: 'کد پرسنلی',
    accessor: 'personelcode'
},
{
    Header: 'کد استخدام',
    accessor: 'employmentcode'
},
{
    Header: 'سمت',
    accessor: 'role_fid'
},
{
    Header: 'ملیت',
    accessor: 'nationality_fid'
},
{
    Header: 'مرکز هزینه',
    accessor: 'paycenter_fid'
},
{
    Header: 'نوع بکارگیری',
    accessor: 'employmenttype_fid'
},
{
    Header: 'تاریخ تولد',
    id: 'born_date',
    accessor:data=> moment.unix((parseInt(data.born_date))).format('jYYYY/jM/jD')
},
{
    Header: 'تعداد فرزندان',
    accessor: 'childcount'
},
{
    Header: 'وضعیت تاهل',
    accessor: 'ismarried'
},
{
    Header: 'موبایل',
    accessor: 'mobile'
},
{
    Header: 'تلفن',
    accessor: 'tel'
},
{
    Header: 'آدرس',
    accessor: 'address'
},
{
    Header: 'کدپستی',
    accessor: 'zipcode'
},
{
    Header: 'شهر',
    accessor: 'common_city_fid'
},
{
    Header: 'شماره حساب',
    accessor: 'accountnumber'
},
{
    Header: 'شماره کارت',
    accessor: 'cardnumber'
},
{
    Header: 'بانک',
    accessor: 'bank_fid'
},
{
    Header: 'is_neededinsurance',
    accessor: 'is_neededinsurance'
},
{
    Header: 'is_payabale',
    accessor: 'is_payabale'
},
{
    Header: 'شماره پاسپورت',
    accessor: 'passportnumber'
},
{
    Header: 'شماره سریال پاسپورت',
    accessor: 'passportserial'
},
{
    Header: 'تحصیلات',
    accessor: 'education'
},
{
    Header: 'تاریخ ورود',
    id: 'entrance_date',
    accessor:data=> moment.unix((parseInt(data.entrance_date))).format('jYYYY/jM/jD')
},
{
    Header: 'نوع ویزا',
    accessor: 'visatype_fid'
},
{
    Header: 'تاریخ انقضا ویزا',
    id: 'visaexpire_date',
    accessor:data=> moment.unix((parseInt(data.visaexpire_date))).format('jYYYY/jM/jD')
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   <Link className={'viewlink'}  to={'/ifi/employees/'+props.value}><IoMdEye/></Link>
                   <Link className={'editlink'}  to={'/ifi/employees/management/'+props.value}><FaEdit/></Link>
                   <MdDeleteForever onClick={ () =>{
                    fetch('http://ifi.test/api/ifi/employees/'+props.value, {
                        method: 'delete',
                        headers: {
                            Accept: 'application/json',
                        },
                        mode: 'cors',
                        crossDomain:true,
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.hasOwnProperty('errors')) {
                                alert('خطا','خطایی در حذف اطلاعات بوجود آمد');
                            }
                            else {
                                this.LoadData();
                            }
                            // console.log(res);
                        }).catch(function (error) {
                        alert('خطا','خطایی در حذف اطلاعات بوجود آمد');
                        throw error;
                    });
                }}/>
                </div>,
},];
        }
export default ifi_employeeList;
