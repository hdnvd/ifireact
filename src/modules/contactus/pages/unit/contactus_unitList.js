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
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';

class contactus_unitList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('contactus','unit',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('contactus','unit',AccessManager.DELETE),
        };
    };
    componentDidMount() {
        this.LoadData(Constants.DefaultPageSize,1,null,null);
    }
    LoadData(pageSize,page,sorted,filtered)
    {
        let filterString=this.HttpGetParamsFromArray(filtered);
        if(filterString!='') filterString='&'+filterString;
        let url='/contactus/unit?pg='+page+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'contactus.unit',AccessManager.LIST,
        this.props.history);
    };
    render(){
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/contactus/units/management'}><IoMdAddCircle/></Link></div>
        <SweetTable
            filterable={false}
            className='-striped -highlight'
            defaultPageSize={Constants.DefaultPageSize}
            data={this.state.data}
            pages={this.state.pages}
            columns={this.columns}
            excludedExportColumns={'id'}
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
    Header: 'نام',
    accessor: 'name'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/contactus/units/management/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/contactus/units/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/contactus/unit/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'contactus.unit',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default contactus_unitList;
