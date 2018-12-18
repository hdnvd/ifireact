// @flow
import * as React from 'react';
import {Link} from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';
import {IoMdEye, IoMdAddCircle} from 'react-icons/io';
import {MdDeleteForever} from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';

class ifi_dfnList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            subdata: [],
            pages: 1,
        };
    };

    componentDidMount() {
        this.LoadData(-1, 25, 1, null, null);
    }

    LoadData(pid, pageSize, page, sorted, filtered) {
        new SweetFetcher().Fetch('/dfn?pid=' + pid, 'get', null,
            data => {
                for (let i = 0; i < data.Data.length; i++) {
                    this.LoadData(data.Data[i].id, 5, 1, null, null);
                }
                console.log(data);
                if (pid<0)
                    this.setState({data: data.Data})
                else {
                    let joined = this.state.subdata;
                    joined[pid] = data.Data;
                    this.setState({subdata: joined});
                }
            },
            this.props.history);
    };

    render() {
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'} to={'/ifi/dfns/management'}><IoMdAddCircle/></Link>
            </div>
            <SweetTable
                filterable={false}
                className='-striped -highlight'
                defaultPageSize={25}
                data={this.state.data}
                pages={this.state.pages}
                columns={this.columns}
                manual
                onFetchData={(state, instance) => {
                    this.setState({loading: true});
                    this.LoadData(state.pageSize, state.page + 1, state.sorted, state.filtered);
                }}
                SubComponent={row => {
                    console.log(row);
                    console.log(row.row.id);
                    return (
                        <div style={{padding: "20px"}}>

                            <br/>
                            <SweetTable
                                data={this.state.subdata[row.row.id]}
                                columns={this.columns}
                                defaultPageSize={5}
                                showPagination={true}

                            />
                        </div>
                    );
                }}
            />
        </div>;
    }

    columns = [
        {
            Header: 'نام',
            accessor: 'name'
        },
        {
            Header: 'نام لاتین',
            accessor: 'latinname'
        },
        {
            Header: 'عملیات',
            accessor: 'id',
            Cell: props => <div className={'operationsrow'}>
                {/*<Link className={'viewlink'}  to={'/ifi/dfns/'+props.value}><IoMdEye/></Link>*/}
                <Link className={'editlink'} to={'/ifi/dfns/management/' + props.value}><FaEdit/></Link>
                <MdDeleteForever onClick={
                    () => {
                        new SweetFetcher().Fetch('/dfn/' + props.value, 'delete', null,
                            data => {
                                this.LoadData('', 25, 1, null, null);
                            },
                            this.props.history);
                    }
                }/>
            </div>,
        },];
}

export default ifi_dfnList;