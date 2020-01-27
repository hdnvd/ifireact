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
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,FormInline, Input } from 'mdbreact';
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';
import SweetHttpRequest from '../../../../classes/sweet-http-request';

const jMoment = require('moment-jalaali');
class trapp_orderList extends SweetComponent {
    orderstatus=2;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('trapp','order',AccessManager.EDIT),
            canInsert:AccessManager.UserCan('trapp','order',AccessManager.INSERT),
            canDelete:AccessManager.UserCan('trapp','order',AccessManager.DELETE),
            displaySearchWindow:false,

            reservefinancetransactionOptions:[],
            cancelfinancetransactionOptions:[],
            villaOptions:[],
            orderstatusOptions:[],
            userOptions:[],
        };
    };
    searchParams={};
    toggleSearchWindow = () => {
        this.setState({
            displaySearchWindow: !this.state.displaySearchWindow
        });
    };
    componentDidMount() {
        this.LoadData(Constants.DefaultPageSize,1,null,null);
    }
    LoadData(pageSize,page,sorted,filtered)
    {
        let RecordStart=((page-1)*pageSize);
        let Request=new SweetHttpRequest();
        Request.appendVariables(filtered,'id','value');
        Request.appendVariablesWithPostFix(sorted,'id','desc','__sort');
        Request.appendVariable('__pagesize',pageSize);
        Request.appendVariable('__startrow',RecordStart);
        Request.appendVariable('orderstatus',this.orderstatus);
        let filterAndSortString=Request.getParamsString();
        if(filterAndSortString!='') filterAndSortString='?'+filterAndSortString;
        let url='/trapp/order'+filterAndSortString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null,
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        },
        null,'trapp.order',AccessManager.LIST,
        this.props.history);

    };
    searchData=()=>
    {
        this.toggleSearchWindow();
        if(this.searchParams!=null)
            this.LoadData(Constants.DefaultPageSize,1,null,Common.ObjectToIdValueArray(this.searchParams));
    };
    render(){
        return <div className={'pagecontent'}>
            {/*<MDBContainer className={'searchcontainer'}>*/}
                {/*<MDBBtn onClick={this.toggleSearchWindow}>جستجو</MDBBtn>*/}
                {/*<MDBModal isOpen={this.state.displaySearchWindow} toggle={this.toggleSearchWindow}>*/}
                {/*    <MDBModalHeader toggle={this.toggleSearchWindow}>جستجو</MDBModalHeader>*/}
                {/*    <MDBModalBody>*/}
                {/*    </MDBModalBody>*/}
                {/*    <MDBModalFooter>*/}
                {/*        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>*/}
                {/*        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>*/}
                {/*    </MDBModalFooter>*/}
                {/*</MDBModal>*/}
            {/*</MDBContainer>*/}
            {/*<div className={'topoperationsrow'}>{this.state.canInsert && <Link className={'addlink'}  to={'/trapp/orders/management'}><IoMdAddCircle/></Link>}</div>*/}
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
    Header: 'مبلغ پرداختی',
    accessor: 'priceprc',

    Cell: props => props.value+" ریال",
},
// {
//     Header: 'reserve__finance_transaction_fid',
//     id: 'reservefinancetransaction',
//     accessor: data=>data.reservefinancetransactioncontent,
// },
// {
//     Header: 'cancel__finance_transaction_fid',
//     id: 'cancelfinancetransaction',
//     accessor: data=>data.cancelfinancetransactioncontent,
// },
    {
        Header: 'صاحب ویلا',
        accessor: 'villaowner',
        Cell: props => <div className={'operationsrow'}>

            <Link className={'link'}  to={'/trapp/villaowners/management/'+props.value.id}>{props.value.name}</Link>
        </div>,
    },
    {
        Header: 'تلفن صاحب ویلا',
        accessor: 'villaownerphone',
    },
// {
//     Header: 'وضعیت سفارش',
//     id: 'orderstatus',
//     accessor: data=>data.orderstatuscontent,
// },
{
    Header: 'شروع اقامت',
    id: 'start_date',
    accessor:data=> jMoment.utc(moment.unix(data.startdate)).format('jYYYY/jMM/jDD'),
},
{
    Header: 'مدت اقامت',
    id: 'durationnum',
    accessor:data=>data.durationnum+" روز"
},
{
    Header: 'رزرو کننده',
    accessor: 'username',
},
    {
        Header: 'تلفن رزرو کننده',
        accessor: 'userphone',
    },
    {
        Header: 'مهمان',
        id: 'guestcountnum',
        accessor:data=>data.guestcountnum>0?data.guestcountnum+" نفر":"ندارد"
    },

    {
        Header: 'امکانات ویژه',
        accessor: 'villanonfreeoptions',
        Cell: props => {
            const opts=props.value;
            let optViews=[];
            if(opts!=null){
                optViews= opts.map(opt=>{
                    return opt.option.name+":"+opt.daysnum+"روز"+"    ";
                });
            }
            return optViews
        },
    },
    {
        Header: 'ویلا',
        accessor: 'villa',
        Cell: props => <div className={'operationsrow'}>

            <Link className={'viewlink'}  to={'/trapp/villas/management/'+props.value}><IoMdEye/></Link>
        </div>,
    },
// {
//     Header: 'عملیات',
//     accessor: 'id',
//     Cell: props => <div className={'operationsrow'}>
//                    {!this.state.canEdit &&
//                     <Link className={'viewlink'}  to={'/trapp/orders/view/'+props.value}><IoMdEye/></Link>
//                    }
//                    {this.state.canEdit &&
//                     <Link className={'editlink'}  to={'/trapp/orders/management/'+props.value}><FaEdit/></Link>
//                    }
//                    {this.state.canDelete &&
//                        <MdDeleteForever onClick={
//                        () =>{
//                          SweetAlert.displayDeleteAlert(()=>{
//                             new SweetFetcher().Fetch('/trapp/order/' + props.value, SweetFetcher.METHOD_DELETE, null,
//                                 data => {
//                                     this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
//                                 },(error)=>{
//                                             let status=error.response.status;
//                                             SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
//                                         },'trapp.order',AccessManager.DELETE,this.props.history);
//                          });
//                         }
//                         }/>
//                  }
//                 </div>,
// },

];
        }
export default trapp_orderList;
