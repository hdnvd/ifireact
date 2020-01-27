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

class sas_deviceList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('sas','device',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('sas','device',AccessManager.DELETE),
            displaySearchWindow:false,

            devicetypeOptions:[],
            ownerunitOptions:[],
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
    LoadData(pageSize,page,sorted,filtered)
    {
        let filterString=this.HttpGetParamsFromArray(filtered);
        if(filterString!='') filterString='&'+filterString;

        let RecordStart=((page-1)*pageSize);
        let url='/sas/device?_startrow='+RecordStart+'&_pagesize='+pageSize+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null,
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,recordCount:data.RecordCount,pages:Pages})
        },
        null,'sas.device',AccessManager.LIST,
        this.props.history);

new SweetFetcher().Fetch('/sas/devicetype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({devicetypeOptions:Options});
            },
            null,'sas.devicetype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({ownerunitOptions:Options});
            },
            null,'sas.unit',AccessManager.LIST,
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
                        <label htmlFor='devicetype'>نوع سخت افزار</label>
                        <select
                                id='devicetype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.devicetype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.devicetypeOptions}
                            </select>
                            </div>
                        <div className='form-group'>
                            <label htmlFor='code'>شماره سریال</label>
                            <input
                                className='form-control'
                                id='code'
                                type='text'
                                onChange={(event)=>{this.searchParams.code=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='notete'>یادداشت</label>
                            <input
                                className='form-control'
                                id='notete'
                                type='text'
                                onChange={(event)=>{this.searchParams.notete=event.target.value;}}/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/sas/devices/management'}><IoMdAddCircle/></Link></div>
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
    Header: 'نام',
    accessor: 'name'
},
{
    Header: 'نوع سخت افزار',
    accessor: 'devicetypecontent'
},
{
    Header: 'شماره سریال',
    accessor: 'code'
},
{
    Header: 'بخش مالک',
    accessor: 'ownerunitcontent'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/sas/devices/view/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/sas/devices/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/sas/device/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'sas.device',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default sas_deviceList;
