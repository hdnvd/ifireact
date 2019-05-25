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

class sas_requesttypeList extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('sas','requesttype',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('sas','requesttype',AccessManager.DELETE),
            displaySearchWindow:false,
            
            motherrequesttypeOptions:[],
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
        let url='/sas/requesttype?pg='+page+filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'sas.requesttype',AccessManager.LIST,
        this.props.history);
        
new SweetFetcher().Fetch('/sas/requesttype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({motherrequesttypeOptions:Options});
            }, 
            null,'sas.requesttype',AccessManager.LIST,
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
                            <label htmlFor='priority'>اولویت</label>
                            <input
                                className='form-control'
                                id='priority'
                                type='text'
                                onChange={(event)=>{this.searchParams.priority=event.target.value;}}/>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیاز به تایید حفاظت اطلاعات</label>
                                    <Input
                                        onClick={() => this.setState({needssecurityacceptance : 0})}
                                        checked={this.state.needssecurityacceptance == 0}
                                        label='نیاز به تایید حفاظت اطلاعات ندارد'
                                        type='radio'
                                        id='radiois_needssecurityacceptance1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({needssecurityacceptance : 1})}
                                        checked={this.state.needssecurityacceptance == 1}
                                        label='نیاز به تایید حفاظت اطلاعات دارد'
                                        type='radio'
                                        id='radiois_needssecurityacceptance2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='motherrequesttype'>نوع درخواست مادر</label>
                        <select 
                                id='motherrequesttype'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.motherrequesttype=event.target.value;}}>
                                <option value={''}>همه</option>
                                {this.state.motherrequesttypeOptions}
                            </select>
                            </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>نیازمند ثبت سخت افزار</label>
                                    <Input
                                        onClick={() => this.setState({hardwareneeded : 0})}
                                        checked={this.state.hardwareneeded == 0}
                                        label='نیازمند ثبت سخت افزار ندارد'
                                        type='radio'
                                        id='radiois_hardwareneeded1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({hardwareneeded : 1})}
                                        checked={this.state.hardwareneeded == 1}
                                        label='نیازمند ثبت سخت افزار دارد'
                                        type='radio'
                                        id='radiois_hardwareneeded2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={this.toggleSearchWindow}>بستن</MDBBtn>
                        <MDBBtn color='primary' onClick={this.searchData}>جستجو</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/sas/requesttypes/management'}><IoMdAddCircle/></Link></div>
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
    Header: 'اولویت',
    accessor: 'priority'
},
{
    Header: 'نیاز به تایید حفاظت اطلاعات',
    id: 'is_needssecurityacceptance',
    accessor: data=>data.needssecurityacceptance==0?'خیر':'بله',
},
{
    Header: 'نوع درخواست مادر',
    accessor: 'motherrequesttypecontent'
},
{
    Header: 'نیازمند ثبت سخت افزار',
    id: 'is_hardwareneeded',
    accessor: data=>data.hardwareneeded==0?'خیر':'بله',
},
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/sas/requesttypes/management/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/sas/requesttypes/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/sas/requesttype/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'sas.requesttype',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default sas_requesttypeList;
