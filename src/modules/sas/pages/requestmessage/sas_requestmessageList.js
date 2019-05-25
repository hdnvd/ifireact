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

class sas_requestmessageList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('sas','requestmessage',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('sas','requestmessage',AccessManager.DELETE),
            displaySearchWindow:false,
            
            requestOptions:[],
            unitOptions:[],
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
        let filterString=this.HttpGetParamsFromArray(filtered);
        if(filterString!='') filterString='&'+filterString;
        let url='/sas/requestmessage?pg='+page+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'sas.requestmessage',AccessManager.LIST,
        this.props.history);
        
new SweetFetcher().Fetch('/sas/request',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({requestOptions:Options});
            }, 
            null,'sas.request',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({unitOptions:Options});
            }, 
            null,'sas.unit',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({userOptions:Options});
            }, 
            null,'sas.user',AccessManager.LIST,
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
                            <label htmlFor='messagete'>message_te</label>
                            <input
                                className='form-control'
                                id='messagete'
                                type='text'
                                onChange={(event)=>{this.searchParams.messagete=event.target.value;}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='request'>درخواست</label>
                        <select 
                                id='request'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.request=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.requestOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='unit'>بخش</label>
                        <select 
                                id='unit'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.unit=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.unitOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='user'>user_fid</label>
                        <select 
                                id='user'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.user=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.userOptions}
                            </select>
                            </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/sas/requestmessages/management'}><IoMdAddCircle/></Link></div>
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
    Header: 'درخواست',
    accessor: 'requestcontent'
},
{
    Header: 'بخش',
    accessor: 'unitcontent'
},
{
    Header: 'user_fid',
    accessor: 'usercontent'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/sas/requestmessages/management/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/sas/requestmessages/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/sas/requestmessage/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'sas.requestmessage',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default sas_requestmessageList;