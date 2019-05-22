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
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import * as qs from 'query-string';

class contactus_messageList extends SweetComponent {
    searchParams={};
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('contactus','message',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('contactus','message',AccessManager.DELETE),
            URLParameters: qs.parse(this.props.location.search),
            modal:false,
            messagereceiverOptions:[],
            unitOptions:[],
            subjectOptions:[],
            degreeOptions:[],

        };
        new SweetFetcher().Fetch('/contactus/subject', SweetFetcher.METHOD_GET, null,
            subdata => {
                let Options=subdata.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({subjectOptions: Options});
            },
            null, 'contactus.subject', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/contactus/unit', SweetFetcher.METHOD_GET, null,
            subdata => {
                let Options=subdata.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({unitOptions: Options});
            },
            null, 'contactus.unit', AccessManager.LIST,
            this.props.history);
        new SweetFetcher().Fetch('/contactus/degree', SweetFetcher.METHOD_GET, null,
            subdata => {
                let Options=subdata.Data.map(item=><option value={item.id}>{item.name}</option>);
                this.setState({degreeOptions: Options});
            },
            null, 'contactus.degree', AccessManager.LIST,
            this.props.history);

    };
    toggleSearchWindow = () => {
        this.setState({
            modal: !this.state.modal
        });
    };
    customFilter = ({ fieldName, filter, onChange }) => {

        return (
            <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
            >
                <option value="">همه</option>
                <option value="556">556</option>
                <option value="هادی">4970</option>
            </select>
        );
    };
    getAnsweredState()
    {
        return 2;
    }
    componentDidMount() {
        this.LoadData(Constants.DefaultPageSize,1,null,null);
    }

    LoadData(pageSize,page,sorted,filtered)
    {
        let url='/contactus/message?answered='+this.getAnsweredState();
        let filterString=this.HttpGetParamsFromArray(filtered);
        if(filterString!='') filterString='&'+filterString;
        url=url+'&pg='+page+filterString;
        console.log("URL:",url);
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, 
        data => {
            let Pages=Math.ceil(data.RecordCount/Constants.DefaultPageSize);
            for(let i=0;i<data.Data.length;i++)
                    data.Data[i]=Common.convertNullKeysToEmpty(data.Data[i]);
            this.setState({data: data.Data,pages:Pages})
        }, 
        null,'contactus.message',AccessManager.LIST,
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
                <MDBModal isOpen={this.state.modal} toggle={this.toggleSearchWindow}>
                    <MDBModalHeader toggle={this.toggleSearchWindow}>جستجو</MDBModalHeader>
                    <MDBModalBody>
                        <div className='form-group'>
                            <label htmlFor='orderserial'>کد رهگیری</label>
                            <input
                                className='form-control'
                                id='orderserial'
                                type='text'
                                onChange={(event)=>{this.searchParams.orderserial=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='questiontext'>متن سوال</label>
                            <input
                                className='form-control'
                                id='questiontext'
                                type='text'
                                onChange={(event)=>{this.searchParams.questiontext=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sendername'>نام ارسال کننده</label>
                            <input
                                className='form-control'
                                id='sendername'
                                type='text'
                                onChange={(event)=>{this.searchParams.sendername=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sendertel'>تلفن ارسال کننده</label>
                            <input
                                className='form-control'
                                id='sendertel'
                                type='text'
                                onChange={(event)=>{this.searchParams.sendertel=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='answertext'>متن پاسخ</label>
                            <input
                                className='form-control'
                                id='answertext'
                                type='text'
                                onChange={(event)=>{this.searchParams.answertext=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='unit'>یگان</label>
                            <select
                                id='unit'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.unit=event.target.value;}}>
                                <option>همه</option>
                                {this.state.unitOptions}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='personelno'>کد پرسنلی</label>
                            <input
                                className='form-control'
                                id='personelno'
                                type='text'
                                onChange={(event)=>{this.searchParams.personelno=event.target.value;}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='subject'>موضوع</label>
                            <select
                                id='subject'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.subject=event.target.value;}}>
                                <option>همه</option>
                                {this.state.subjectOptions}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='degree'>درجه</label>
                            <select
                                id='degree'
                                className='browser-default custom-select'
                                onChange={(event)=>{this.searchParams.degree=event.target.value;}}>
                                <option>همه</option>
                                {this.state.degreeOptions}
                            </select>
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
        </div>;
    }

    columns = [
        {
            Header: 'کد رهگیری',
            accessor: 'orderserial'
        },
        {
            Header: 'نام و نشان',
            accessor: 'sendername'
        },
        {
            Header: 'یگان',
            accessor: 'unitcontent'
        },
        {
            Header: 'درجه',
            accessor: 'degreecontent'
        },
        {
            Header: 'موضوع',
            accessor: 'subjectcontent'
        },

    // {
    //     Header: 'یگان',
    //     accessor: 'unit',
    // filterable:true,
    //     Filter:({ filter, onChange }) =>
    //         this.customFilter({ fieldName:'unit_fid', filter, onChange })
    // },
{
    Header: 'عملیات',
    accessor: 'id',
    Cell: props => <div className={'operationsrow'}>
                   {!this.state.canEdit &&
                    <Link className={'viewlink'}  to={'/contactus/messages/management/'+props.value}><IoMdEye/></Link>
                   }
                   {this.state.canEdit &&
                    <Link className={'editlink'}  to={'/contactus/messages/management/'+props.value}><FaEdit/></Link>
                   }
                   {this.state.canDelete &&
                       <MdDeleteForever onClick={ 
                       () =>{
                         SweetAlert.displayDeleteAlert(()=>{
                            new SweetFetcher().Fetch('/contactus/message/' + props.value, SweetFetcher.METHOD_DELETE, null,
                                data => {
                                    this.LoadData(Constants.DefaultPageSize,this.state.page+1,null,null);
                                },(error)=>{
                                            let status=error.response.status;
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده ','خطایی در حذف اطلاعات به وجود آمد'+status.toString().trim());
                                        },'contactus.message',AccessManager.DELETE,this.props.history);
                         });
                        }
                        }/>
                 }
                </div>,
},];
        }
export default contactus_messageList;
