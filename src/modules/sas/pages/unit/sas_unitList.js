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

class sas_unitList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('sas','unit',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('sas','unit',AccessManager.DELETE),
            displaySearchWindow:false,
            
            unittypeOptions:[],
            useruserOptions:[],
            adminuserOptions:[],
            securityuserOptions:[],
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
        let url='/sas/unit?pg='+page+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'sas.unit',AccessManager.LIST,
        this.props.history);
        
new SweetFetcher().Fetch('/sas/unittype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({unittypeOptions:Options});
            }, 
            null,'sas.unittype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({useruserOptions:Options});
            }, 
            null,'sas.user',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({adminuserOptions:Options});
            }, 
            null,'sas.user',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/sas/user',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({securityuserOptions:Options});
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
                            <label htmlFor='name'>نام</label>
                            <input
                                className='form-control'
                                id='name'
                                type='text'
                                onChange={(event)=>{this.searchParams.name=event.target.value;}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='unittype'>نوع بخش</label>
                        <select 
                                id='unittype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.unittype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.unittypeOptions}
                            </select>
                            </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیاز به تایید مدیر</label>
                                    <Input
                                        onClick={() => this.setState({needsadminapproval : 0})}
                                        checked={this.state.needsadminapproval == 0}
                                        label='نیاز به تایید مدیر ندارد'
                                        type='radio'
                                        id='radiois_needsadminapproval1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({needsadminapproval : 1})}
                                        checked={this.state.needsadminapproval == 1}
                                        label='نیاز به تایید مدیر دارد'
                                        type='radio'
                                        id='radiois_needsadminapproval2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='useruser'>کاربر</label>
                        <select 
                                id='useruser'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.useruser=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.useruserOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='adminuser'>مدیر</label>
                        <select 
                                id='adminuser'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.adminuser=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.adminuserOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='securityuser'>حفاظت</label>
                        <select 
                                id='securityuser'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.securityuser=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.securityuserOptions}
                            </select>
                            </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/sas/units/management'}><IoMdAddCircle/></Link></div>
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
    Header: 'نوع بخش',
    accessor: 'unittypecontent'
},
{
    Header: 'نیاز به تایید مدیر',
    id: 'is_needsadminapproval',
    accessor: data=>data.needsadminapproval==0?'خیر':'بله',
},
{
    Header: 'کاربر',
    accessor: 'userusercontent'
},
{
    Header: 'مدیر',
    accessor: 'adminusercontent'
},
{
    Header: 'حفاظت',
    accessor: 'securityusercontent'
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/sas/units/view/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/sas/units/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/sas/unit/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'sas.unit',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default sas_unitList;
