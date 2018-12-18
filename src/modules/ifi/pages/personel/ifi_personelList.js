// @flow
import * as React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdEye,IoMdAddCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';

class ifi_personelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,

        };
    };
    componentDidMount() {
        this.LoadData(25,1,null,null);
    }
    LoadData(pageSize,page,sorted,filtered)
    {
        let filterString="";
        console.log(filtered);

        for(let i=0;filtered!=null && i<filtered.length;i++)
        {
            filterString+=filtered[i].id+"="+filtered[i].value;
        }
        if(filterString!="")
            filterString="&"+filterString;
        let url='/personel?pg='+page+filterString;
        console.log(url);
        new SweetFetcher().Fetch(url, 'get', null,
        data => {
            console.log(data);

            let Pages=Math.ceil(data.RecordCount/25);
            this.setState({data: data.Data,pages:Pages})
        }, 
        this.props.history);
    };
    render(){
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/ifi/personels/management'}><IoMdAddCircle/></Link></div>
        <SweetTable
            filterable={false}
            className='-striped -highlight'
            defaultPageSize={25}
            data={this.state.data}
            pages={this.state.pages}
            columns={this.columns}
            manual
            onFetchData={(state, instance) => {
                this.setState({loading: true,page:state.page});
                this.LoadData(state.pageSize,state.page+1,state.sorted,state.filtered);
            }}
        />
        </div>;
    }

columns = [
{
    Header: 'کد پرسنلی',
    accessor: 'personelno'
},
{
    Header: 'کد ملی',
    accessor: 'nationalcode',
    filterable: true,

},
    {
        Header: 'شماره شناسنامه',
        accessor: 'certificationnumber'
    },
{
    Header: 'نام',
    accessor: 'name',
    filterable: true,
},
{
    Header: 'نام خانوادگی',
    accessor: 'family',
    filterable: true,
},
{
    Header: 'عملیات',
    accessor: 'personelno',
    Cell: props => <div className={'operationsrow'}>
                   {/*<Link className={'viewlink'}  to={'/ifi/personels/'+props.value}><IoMdEye/></Link>*/}
                   <Link className={'editlink'}  to={'/ifi/personels/management/'+props.value}><FaEdit/></Link>
                   <MdDeleteForever onClick={ 
                   () =>{
                   new SweetFetcher().Fetch('/personel/' + props.value, 'delete', null,
                        data => {
                            this.LoadData(25,this.state.page+1,null,null);
                        }, 
                        this.props.history);
                    }
                 }/>
                </div>,
},];
        }
export default ifi_personelList;
