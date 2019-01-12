// @flow
import * as React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdEye,IoMdAddCircle } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SweetAlert from '../../../../classes/SweetAlert';
import Constants from '../../../../classes/Constants';
import AccessManager from '../../../../classes/AccessManager';
import Common from "../../../../classes/Common";
import SweetComponent from "../../../../classes/sweet-component";

class ifi_personelList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('personel',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('personel',AccessManager.DELETE),
        };
    };
    componentDidMount() {
        this.LoadData(Constants.DefaultPageSize,1,null,null);
    }
    LoadData(pageSize,page,sorted,filtered)
    {
        let filterString=this.HttpGetParamsFromArray(filtered);
        if(filterString!='') filterString='&'+filterString;
        let url='/personel?pg='+page+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null,
            data => {
                let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
                for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
                console.log(data.Data);
                this.setState({data: data.Data,pages:Pages})
            },
            'personel',AccessManager.VIEW,
            this.props.history);
    };

    render(){
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/ifi/personels/management'}><IoMdAddCircle/></Link></div>
            <SweetTable
                filterable={false}
                className='-striped -highlight'
                defaultPageSize={Constants.DefaultPageSize}
                data={this.state.data}
                pages={this.state.pages}
                columns={this.columns}
                excludedExportColumns={'personelid'}
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
            accessor: 'personelno',
            filterable:false,
        },
        {
            accessor: 'nationalcode',
            Header: 'کد ملی',
            filterable:true,
        },
        {
            Header: 'نام',
            accessor: 'name',
            filterable:true,
        },
        {
            Header: 'نام خانوادگی',
            accessor: 'family',
            filterable:true,
        },
        {
            Header: 'شماره حساب بانک ملی',
            accessor: 'hmeli',
            filterable:false,
        },
        {
            Header: 'عملیات',
            accessor: 'personelid',
            Cell: props => <div className={'operationsrow'}>
                {!this.state.canEdit &&
                <Link className={'viewlink'}  to={'/ifi/personels/management/'+props.value}><IoMdEye/></Link>
                }
                {this.state.canEdit &&
                <Link className={'editlink'}  to={'/ifi/personels/management/'+props.value}><FaEdit/></Link>
                }
                {this.state.canDelete &&
                <MdDeleteForever onClick={
                    () =>{
                        SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/personel/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },
                                'personel',AccessManager.DELETE,this.props.history);
                        });
                    }
                }/>
                }
            </div>,
        },];
}
export default ifi_personelList;