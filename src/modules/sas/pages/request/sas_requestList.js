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

class sas_requestList extends SweetComponent {
    static BOXTYPE_OUTBOX=1;
    static BOXTYPE_INBOX=2;
    static BOXTYPE_CURRENTBOX=3;
    static BOXTYPE_ADMINBOX=4;
    static BOXTYPE_COMPLATEDBOX=5;
    static BOXTYPE_INCOMPLATEBOX=6;
    static BOXTYPE_NEEDTOAPPROVE=7;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('sas','request',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('sas','request',AccessManager.DELETE),
            displaySearchWindow:false,

            requesttypeOptions:[],
            deviceOptions:[],
            statusOptions:[],
            senderunitOptions:[],
            currentunitOptions:[],
            senderuserOptions:[],
            recordCount:0,
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

    getboxtype()
    {
        return sas_requestList.BOXTYPE_ADMINBOX;
    }
    LoadData(pageSize,page,sorted,filtered)
    {

        let RecordStart=((page-1)*pageSize);
        let filterString=this.HttpGetParamsFromArray(filtered);
        if(filterString!='') filterString='&'+filterString;
        let BoxType=this.getboxtype();
        let url='';
        if(BoxType===sas_requestList.BOXTYPE_ADMINBOX)
            url='/sas/request?_startrow='+RecordStart+'&_pagesize='+pageSize+filterString;
        else if(BoxType===sas_requestList.BOXTYPE_OUTBOX)
            url='/sas/request/outbox?_startrow='+RecordStart+"&_pagesize="+pageSize+filterString;
        else if(BoxType===sas_requestList.BOXTYPE_CURRENTBOX)
            url='/sas/request/current?_startrow='+RecordStart+"&_pagesize="+pageSize+filterString;
        else if(BoxType===sas_requestList.BOXTYPE_INBOX)
            url='/sas/request/inbox?_startrow='+RecordStart+"&_pagesize="+pageSize+filterString;
        else if(BoxType===sas_requestList.BOXTYPE_NEEDTOAPPROVE)
            url='/sas/request/approve?_startrow='+RecordStart+"&_pagesize="+pageSize+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null,
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,recordCount:data.RecordCount,pages:Pages})
        },
        null,'sas.request',AccessManager.LIST,
        this.props.history);

new SweetFetcher().Fetch('/sas/requesttype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({requesttypeOptions:Options});
            },
            null,'sas.requesttype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/device',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({deviceOptions:Options});
            },
            null,'sas.device',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/status',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({statusOptions:Options});
            },
            null,'sas.status',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({senderunitOptions:Options});
            },
            null,'sas.unit',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({currentunitOptions:Options});
            },
            null,'sas.unit',AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/sas/request/approve?__onlycount=1',SweetFetcher.METHOD_GET,null,
            data=>{
                console.log(data.RecordCount);
            },
            null,'sas.request',"list",
            this.props.history);
        new SweetFetcher().Fetch('/sas/request/current?__onlycount=1',SweetFetcher.METHOD_GET,null,
            data=>{
                console.log(data.RecordCount);
            },
            null,'sas.request',"list",
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
            <MDBContainer className={'searchcontainer'}>
                <MDBBtn onClick={this.toggleSearchWindow}>جستجو</MDBBtn>
                <MDBModal isOpen={this.state.displaySearchWindow} toggle={this.toggleSearchWindow}>
                    <MDBModalHeader toggle={this.toggleSearchWindow}>جستجو</MDBModalHeader>
                    <MDBModalBody>

                    <div className='form-group'>
                        <label htmlFor='requesttype'>نوع درخواست</label>
                        <select
                                id='requesttype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.requesttype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.requesttypeOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='status'>وضعیت</label>
                        <select
                                id='status'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.status=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.statusOptions}
                            </select>
                            </div>
                        {this.getboxtype() == sas_requestList.BOXTYPE_ADMINBOX &&
                            <div>

                                {/*<div className='form-group'>*/}
                                {/*    <label htmlFor='priority'>اولویت</label>*/}
                                {/*    <input*/}
                                {/*        className='form-control'*/}
                                {/*        id='priority'*/}
                                {/*        type='text'*/}
                                {/*        onChange={(event)=>{this.searchParams.priority=event.target.value;}}/>*/}
                                {/*</div>*/}
                        <div className='form-group'>
                            <label htmlFor='senderunit'>بخش ارسال کننده</label>
                            <select
                                id='senderunit'
                                className='browser-default custom-select'
                                onChange={(event) => {
                                    this.searchParams.senderunit = event.target.value;
                                }}>
                                <option value={''}>همه</option>
                                {this.state.senderunitOptions}
                            </select>
                        </div>
                        < div className='form-group'>
                            <label htmlFor='currentunit'>بخش فعلی</label>
                            <select
                            id='currentunit'
                            className='browser-default custom-select'
                            onChange={(event) => {
                            this.searchParams.currentunit = event.target.value;
                        }}>
                            <option value={''}>همه</option>
                            {this.state.currentunitOptions}
                            </select>
                            </div>
                            </div>
                        }
                        <div className='form-group'>
                            <label htmlFor='letternumber'>شماره نامه</label>
                            <input
                                className='form-control'
                                id='letternumber'
                                type='text'
                                onChange={(event)=>{this.searchParams.letternumber=event.target.value;}}/>
                        </div>

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>

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
        <div>تعداد کل نتایج:{this.state.recordCount}</div>
        </div>;
    }

columns = [
{
    Header: 'نوع درخواست',
    accessor: 'requesttypecontent'
},
{
    Header: 'تجهیز',
    accessor: 'devicecontent'
},
{
    Header: 'اولویت',
    accessor: 'priority'
},
{
    Header: 'وضعیت',
    accessor: 'statuscontent'
},
{
    Header: 'بخش ارسال کننده',
    accessor: 'senderunitcontent'
},
{
    Header: 'بخش فعلی',
    accessor: 'currentunitcontent'
},
// {
//     Header: 'زمان تایید مدیر',
//     accessor: 'adminacceptancetime'
// },
// {
//     Header: 'زمان تایید حفاظت',
//     accessor: 'securityacceptancetime'
// },
// {
//     Header: 'زمان ارسال نهایی',
//     accessor: 'fullsendtime'
// },
{
    Header: 'شماره نامه',
    accessor: 'letternumber'
},
{
    Header: 'تاریخ نامه',
    id: 'letter_date',
    accessor:data=> data.letterdate
},
{
    Header: 'کاربر ارسال کننده',
    accessor: 'senderusercontent'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/sas/requests/view/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/sas/requests/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/sas/request/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'sas.request',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default sas_requestList;
