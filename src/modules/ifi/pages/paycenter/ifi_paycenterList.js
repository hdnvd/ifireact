// @flow
import * as React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdEye,IoMdAddCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'

class ifi_paycenterList extends React.Component {
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
            fetch('http://ifi.test/api/ifi/paycenters')
            .then(response => response.json())
            .then(data => {
                this.setState({ data:data })
            });
    };
    render(){
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/ifi/paycenters/management'}><IoMdAddCircle/></Link></div>
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
    Header: 'عنوان',
    accessor: 'title'
},
{
    Header: 'سرفصل',
    accessor: 'chapter'
},
{
    Header: 'کد حسابداری',
    accessor: 'accountingcode'
},
{
    Header: 'مرکز هزینه',
    accessor: 'paycenter_fid'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   <Link className={'viewlink'}  to={'/ifi/paycenters/'+props.value}><IoMdEye/></Link>
                   <Link className={'editlink'}  to={'/ifi/paycenters/management/'+props.value}><FaEdit/></Link>
                   <MdDeleteForever onClick={ () =>{
                    fetch('http://ifi.test/api/ifi/paycenters/'+props.value, {
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
export default ifi_paycenterList;
