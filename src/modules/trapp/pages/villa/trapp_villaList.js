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

class trapp_villaList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('trapp','villa',AccessManager.EDIT),
            canInsert:AccessManager.UserCan('trapp','villa',AccessManager.INSERT),
            canDelete:AccessManager.UserCan('trapp','villa',AccessManager.DELETE),
            displaySearchWindow:false,

            placemanplaceOptions:[],
            viewtypeOptions:[],
            structuretypeOptions:[],
            owningtypeOptions:[],
            areatypeOptions:[],
        };
    };
    loadInactives=false;

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
        let filterAndSortString=Request.getParamsString();
        if(filterAndSortString!='') filterAndSortString='?'+filterAndSortString;
        let URLStart='/trapp/villa';
        if(this.loadInactives)
            URLStart='/trapp/inactivevilla';
        let url=URLStart+filterAndSortString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null,
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        },
        null,'trapp.villa',AccessManager.LIST,
        this.props.history);

new SweetFetcher().Fetch('/trapp/place',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({placemanplaceOptions:Options});
            },
            null,'trapp.place',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/viewtype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({viewtypeOptions:Options});
            },
            null,'trapp.viewtype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/structuretype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({structuretypeOptions:Options});
            },
            null,'trapp.structuretype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/owningtype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({owningtypeOptions:Options});
            },
            null,'trapp.owningtype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/areatype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({areatypeOptions:Options});
            },
            null,'trapp.areatype',AccessManager.LIST,
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
                        <label htmlFor='viewtype'>چشم انداز</label>
                        <select
                                id='viewtype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.viewtype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.viewtypeOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='structuretype'>نوع ساختمان</label>
                        <select
                                id='structuretype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.structuretype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.structuretypeOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='owningtype'>نوع اقامتگاه</label>
                        <select
                                id='owningtype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.owningtype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.owningtypeOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='areatype'>بافت</label>
                        <select
                                id='areatype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.areatype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.areatypeOptions}
                            </select>
                            </div>
                        <div className='form-group'>
                            <label htmlFor='id'>کد ویلا</label>
                            <input
                                className='form-control'
                                id='id'
                                type='text'
                                onChange={(event)=>{this.searchParams.id=event.target.value;}}/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            {/*<div className={'topoperationsrow'}>{this.state.canInsert && <Link className={'addlink'}  to={'/trapp/villas/management'}><IoMdAddCircle/></Link>}</div>*/}
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
        Header: 'کد ویلا',
        accessor: 'id'
    },
{
    Header: 'اتاق',
    accessor: 'roomcountnum'
},
{
    Header: 'ظرفیت',
    accessor: 'capacitynum'
},
{
    Header: 'حداکثر مهمان',
    accessor: 'maxguestsnum'
},
{
    Header: 'چشم انداز',
    id: 'viewtype',
    accessor: data=>data.viewtypecontent,
},
{
    Header: 'نوع ساختمان',
    id: 'structuretype',
    accessor: data=>data.structuretypecontent,
},
{
    Header: 'نوع اقامتگاه',
    id: 'owningtype',
    accessor: data=>data.owningtypecontent,
},
{
    Header: 'بافت',
    id: 'areatype',
    accessor: data=>data.areatypecontent,
},
{
    Header: 'قیمت عادی',
    accessor: 'normalpriceprc'
},
{
    Header: 'قیمت تعطیل',
    accessor: 'holidaypriceprc'
},
{
    Header: 'تخفیف هفتگی',
    accessor: 'weeklyoffnum'
},
{
    Header: 'تخفیف ماهانه',
    accessor: 'monthlyoffnum'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/trapp/villas/view/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/trapp/villas/management/'+props.value}><FaEdit/></Link>
                   }
                   {/*{this.state.canDelete &&*/}
                       {/*<MdDeleteForever onClick={ */}
                       {/*() =>{*/}
                         {/*SweetAlert.displayDeleteAlert(()=>{*/}
                            {/*new SweetFetcher().Fetch('/trapp/villa/' + props.value, SweetFetcher.METHOD_DELETE, null,*/}
                                {/*data => {*/}
                                    {/*this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);*/}
                                {/*},(error)=>{*/}
                                            {/*let status=error.response.status;*/}
                                            {/*SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());*/}
                                        {/*},'trapp.villa',AccessManager.DELETE,this.props.history);*/}
                         {/*});*/}
                        {/*}*/}
                        {/*}/>*/}
                 {/*}*/}
                </div>,
},];
        }
export default trapp_villaList;
