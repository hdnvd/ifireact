// @flow
import * as React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdEye,IoMdAddCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'

class ifi_programestimationList extends React.Component {
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
            fetch('http://ifi.test/api/ifi/programestimations')
            .then(response => response.json())
            .then(data => {
                this.setState({ data:data })
            });
    };
    render(){
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/ifi/programestimations/management'}><IoMdAddCircle/></Link></div>
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
    Header: 'department_fid',
    accessor: 'department_fid'
},
{
    Header: 'طبقات برنامه سازی',
    accessor: 'class_fid'
},
{
    Header: 'programmaketype_fid',
    accessor: 'programmaketype_fid'
},
{
    Header: 'totalprogramcount',
    accessor: 'totalprogramcount'
},
{
    Header: 'timeperprogram',
    accessor: 'timeperprogram'
},
{
    Header: 'is_haslegalproblem',
    accessor: 'is_haslegalproblem'
},
{
    Header: 'approval_date',
    id: 'approval_date',
    accessor:data=> moment.unix((parseInt(data.approval_date))).format('jYYYY/jM/jD')
},
{
    Header: 'end_date',
    id: 'end_date',
    accessor:data=> moment.unix((parseInt(data.end_date))).format('jYYYY/jM/jD')
},
{
    Header: 'add_date',
    id: 'add_date',
    accessor:data=> moment.unix((parseInt(data.add_date))).format('jYYYY/jM/jD')
},
{
    Header: 'producer_employee_fid',
    accessor: 'producer_employee_fid'
},
{
    Header: 'executor_employee_fid',
    accessor: 'executor_employee_fid'
},
{
    Header: 'مرکز هزینه',
    accessor: 'paycenter_fid'
},
{
    Header: 'makergroup_paycenter_fid',
    accessor: 'makergroup_paycenter_fid'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   <Link className={'viewlink'}  to={'/ifi/programestimations/'+props.value}><IoMdEye/></Link>
                   <Link className={'editlink'}  to={'/ifi/programestimations/management/'+props.value}><FaEdit/></Link>
                   <MdDeleteForever onClick={ () =>{
                    fetch('http://ifi.test/api/ifi/programestimations/'+props.value, {
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
export default ifi_programestimationList;
