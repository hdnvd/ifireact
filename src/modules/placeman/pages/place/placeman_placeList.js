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

class placeman_placeList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('placeman','place',AccessManager.EDIT),
            canInsert:AccessManager.UserCan('placeman','place',AccessManager.INSERT),
            canDelete:AccessManager.UserCan('placeman','place',AccessManager.DELETE),
            displaySearchWindow:false,
            
            areaOptions:[],
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
        Request.appendVariable('_pagesize',pageSize);
        Request.appendVariable('_startrow',RecordStart);
        let filterAndSortString=Request.getParamsString();
        if(filterAndSortString!='') filterAndSortString='?'+filterAndSortString;
        let url='/placeman/place'+filterAndSortString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'placeman.place',AccessManager.LIST,
        this.props.history);
        
new SweetFetcher().Fetch('/placeman/area',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({areaOptions:Options});
            }, 
            null,'placeman.area',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/placeman/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'placeman.user',AccessManager.LIST,
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
                            <label htmlFor='title'>عنوان</label>
                            <input
                                className='form-control'
                                id='title'
                                type='text'
                                onChange={(event)=>{this.searchParams.title=event.target.value;}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='area'>منطقه</label>
                        <select 
                                id='area'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.area=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.areaOptions}
                            </select>
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
                            <label htmlFor='latitude'>عرض جغرافیایی</label>
                            <input
                                className='form-control'
                                id='latitude'
                                type='text'
                                onChange={(event)=>{this.searchParams.latitude=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='longitude'>طول جغرافیایی</label>
                            <input
                                className='form-control'
                                id='longitude'
                                type='text'
                                onChange={(event)=>{this.searchParams.longitude=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>توضیحات</label>
                            <input
                                className='form-control'
                                id='description'
                                type='text'
                                onChange={(event)=>{this.searchParams.description=event.target.value;}}/>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>فعال/غیرفعال</label>
                                    <Input
                                        onClick={() => this.setState({active : 0})}
                                        checked={this.state.active == 0}
                                        label='غیر فعال'
                                        type='radio'
                                        id='radioisactive1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({active : 1})}
                                        checked={this.state.active == 1}
                                        label='فعال'
                                        type='radio'
                                        id='radioisactive2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
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
                            <label htmlFor='visits'>تعداد بازدید</label>
                            <input
                                className='form-control'
                                id='visits'
                                type='text'
                                onChange={(event)=>{this.searchParams.visits=event.target.value;}}/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className={'topoperationsrow'}>{this.state.canInsert && <Link className={'addlink'}  to={'/placeman/places/management'}><IoMdAddCircle/></Link>}</div>
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
    Header: 'عنوان',
    accessor: 'title'
},
{
    Header: 'منطقه',
    id: 'area',
    accessor: data=>data.areacontent,
},
{
    Header: 'آدرس',
    accessor: 'address'
},
{
    Header: 'عرض جغرافیایی',
    accessor: 'latitude'
},
{
    Header: 'طول جغرافیایی',
    accessor: 'longitude'
},
{
    Header: 'توضیحات',
    accessor: 'description'
},
{
    Header: 'فعال/غیرفعال',
    id: 'active',
    accessor: data=>data.active==0?'خیر':'بله',
},
{
    Header: 'کاربر',
    id: 'user',
    accessor: data=>data.usercontent,
},
{
    Header: 'تعداد بازدید',
    accessor: 'visits'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/placeman/places/view/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/placeman/places/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/placeman/place/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'placeman.place',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default placeman_placeList;
