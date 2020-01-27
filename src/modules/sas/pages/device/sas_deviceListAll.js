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

class sas_deviceListAll extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:false,
            canDelete:false,
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

        let url='/sas/alldevice?_startrow='+RecordStart+'&_pagesize='+pageSize+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null,
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,recordCount:data.RecordCount,pages:Pages})
        },
        null,'sas.device',"listall",
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
                            <label htmlFor='isactive'>وضعیت</label>
                            <select
                                id='isactive'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.isactive=event.target.value;}}>
                                <option value={''}>همه</option>
                                <option value={'1'}>حاضر به کار</option>
                                <option value={'0'}>غیرفعال</option>
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
        Header: 'وضعیت تجهیز',
        accessor: 'active',
        Cell:props => {
            return props.value?'حاضر به کار':'غیرفعال';
        },
    },
    {
        Header: 'آخرین درخواست',
        accessor: 'lastrequest',
        Cell: props => {
            if (props.value != null && props.value>0) {
                return <div className={'operationsrow'}>
                    <Link className={'viewlink'} to={'/sas/requests/view/' + props.value}><IoMdEye/></Link>
                </div>;
            }
            else
                return <div></div>;
        }
    },
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                    <Link className={'viewlink'}  to={'/sas/devices/view/'+props.value}><IoMdEye/></Link>

                </div>,
},];
        }
export default sas_deviceListAll;
