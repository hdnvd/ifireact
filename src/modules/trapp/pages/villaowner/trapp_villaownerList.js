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

class trapp_villaownerList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('trapp','villaowner',AccessManager.EDIT),
            canInsert:AccessManager.UserCan('trapp','villaowner',AccessManager.INSERT),
            canDelete:AccessManager.UserCan('trapp','villaowner',AccessManager.DELETE),
            displaySearchWindow:false,
            
            userOptions:[],
            placemanareaOptions:[],
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
        Request.appendVariable('_pagesize',pageSize);
        Request.appendVariable('_startrow',RecordStart);
        let filterAndSortString=Request.getParamsString();
        if(filterAndSortString!='') filterAndSortString='?'+filterAndSortString;
        let url='/trapp/villaowner'+filterAndSortString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'trapp.villaowner',AccessManager.LIST,
        this.props.history);
        
new SweetFetcher().Fetch('/trapp/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'trapp.user',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/area',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({placemanareaOptions:Options});
            }, 
            null,'trapp.area',AccessManager.LIST,
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
                            <label htmlFor='name'>نام</label>
                            <input
                                className='form-control'
                                id='name'
                                type='text'
                                onChange={(event)=>{this.searchParams.name=event.target.value;}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='user'>کاربر</label>
                        <select 
                                id='user'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.user=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.userOptions}
                            </select>
                            </div>
                        <div className='form-group'>
                            <label htmlFor='nationalcodebnum'>کد ملی</label>
                            <input
                                className='form-control'
                                id='nationalcodebnum'
                                type='text'
                                onChange={(event)=>{this.searchParams.nationalcodebnum=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='address'>آدرس</label>
                            <input
                                className='form-control'
                                id='address'
                                type='text'
                                onChange={(event)=>{this.searchParams.address=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='shabacodebnum'>کد شبا</label>
                            <input
                                className='form-control'
                                id='shabacodebnum'
                                type='text'
                                onChange={(event)=>{this.searchParams.shabacodebnum=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='telbnum'>تلفن</label>
                            <input
                                className='form-control'
                                id='telbnum'
                                type='text'
                                onChange={(event)=>{this.searchParams.telbnum=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='backuptelbnum'>تلفن شماره ۲</label>
                            <input
                                className='form-control'
                                id='backuptelbnum'
                                type='text'
                                onChange={(event)=>{this.searchParams.backuptelbnum=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>ایمیل</label>
                            <input
                                className='form-control'
                                id='email'
                                type='text'
                                onChange={(event)=>{this.searchParams.email=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='backupmobilebnum'>تلفن همراه شماره ۲</label>
                            <input
                                className='form-control'
                                id='backupmobilebnum'
                                type='text'
                                onChange={(event)=>{this.searchParams.backupmobilebnum=event.target.value;}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='placemanarea'>منطقه</label>
                        <select 
                                id='placemanarea'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.placemanarea=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.placemanareaOptions}
                            </select>
                            </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className={'topoperationsrow'}>{this.state.canInsert && <Link className={'addlink'}  to={'/trapp/villaowners/management'}><IoMdAddCircle/></Link>}</div>
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
    Header: 'کاربر',
    id: 'user',
    accessor: data=>data.usercontent,
},
{
    Header: 'کد ملی',
    accessor: 'nationalcodebnum'
},
{
    Header: 'آدرس',
    accessor: 'address'
},
{
    Header: 'کد شبا',
    accessor: 'shabacodebnum'
},
{
    Header: 'تلفن',
    accessor: 'telbnum'
},
{
    Header: 'تلفن شماره ۲',
    accessor: 'backuptelbnum'
},
{
    Header: 'ایمیل',
    accessor: 'email'
},
{
    Header: 'تلفن همراه شماره ۲',
    accessor: 'backupmobilebnum'
},
{
    Header: 'منطقه',
    id: 'placemanarea',
    accessor: data=>data.placemanareacontent,
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/trapp/villaowners/view/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/trapp/villaowners/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/trapp/villaowner/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'trapp.villaowner',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default trapp_villaownerList;
