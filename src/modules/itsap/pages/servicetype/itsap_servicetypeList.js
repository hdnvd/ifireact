// @flow
import * as React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'

class itsap_servicetypeList extends React.Component {
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
            fetch('http://ifi.test/api/itsap/servicetypes')
            .then(response => response.json())
            .then(data => {
                this.setState({ data:data })
            });
    };
    render(){
        return <SweetTable
            filterable={true}
            className='-striped -highlight'
            defaultPageSize={10}
            data={this.state.data}
            columns={this.columns}
        />;
    }

columns = [
{
    Header: 'عنوان',
    accessor: 'title'
},
{
    Header: 'priority',
    accessor: 'priority'
},
{
    Header: 'servicetypegroup_fid',
    accessor: 'servicetypegroup_fid'
},
{
    Header: 'is_needdevice',
    accessor: 'is_needdevice'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   <Link className={'viewlink'}  to={'/itsap/servicetypes/'+props.value}><IoMdEye/></Link>
                   <Link className={'editlink'}  to={'/itsap/servicetypes/management/'+props.value}><FaEdit/></Link>
                   <MdDeleteForever onClick={ () =>{
                    fetch('http://ifi.test/api/itsap/servicetypes/'+props.value, {
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
export default itsap_servicetypeList;
