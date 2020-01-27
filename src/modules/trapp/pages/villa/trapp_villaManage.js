// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import  DatePicker  from '../../../../PersianDatePicker/components/DatePicker';
import '../../../../scss/datepicker.scss'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
import InputMask from 'react-input-mask';
import Constants from '../../../../classes/Constants';
import AccessManager from '../../../../classes/AccessManager';
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';
import ModalImage from 'react-modal-image'
import SweetButton from '../../../../classes/sweet-button';
import SweetAlert from '../../../../classes/SweetAlert';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextBox from "../../../../sweet/components/TextBox";
import CheckedRow from "../../../../sweet/components/CheckedRow";
import PickerBox from "../../../../sweet/components/PickerBox";
import ImageSelector from "../../../../sweet/components/ImageSelector";
class trapp_villaManage extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','villa',this.props.match.params.id>0?AccessManager.EDIT:AccessManager.INSERT),

			roomcountnum:'',
			capacitynum:'',
			maxguestsnum:'',
			structureareanum:'',
			totalareanum:'',
			placemanplace:'',
			placemanplaceOptions:[],
			addedbyowner:0,
			viewtype:'',
			viewtypeOptions:[],
			structuretype:'',
			structuretypeOptions:[],
			fulltimeservice:0,
			timestartclk:'',
			owningtype:'',
			owningtypeOptions:[],
			areatype:'',
			areatypeOptions:[],
			descriptionte:'',
			documentphotoigu:'',
			documentphotoiguPreview:'',
			normalpriceprc:'',
			holidaypriceprc:'',
			weeklyoffnum:'',
			monthlyoffnum:'',
            discountnum:'',
            villaowner:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/villa/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

                 this.setState({ roomcountnum:data.Data.roomcountnum,capacitynum:data.Data.capacitynum,
                     maxguestsnum:data.Data.maxguestsnum,structureareanum:data.Data.structureareanum,
                     totalareanum:data.Data.totalareanum,placemanplace:data.Data.placemanplace,
                     addedbyowner:data.Data.addedbyowner,viewtype:data.Data.viewtype,structuretype:data.Data.structuretype
                     ,fulltimeservice:data.Data.fulltimeservice,timestartclk:data.Data.timestartclk,owningtype:data.Data.owningtype
                     ,areatype:data.Data.areatype,descriptionte:data.Data.descriptionte
                     ,documentphotoiguPreview:Constants.SiteURL+'/'+data.Data.documentphotoigu,
                     documentphotoigu:data.Data.documentphotoigu,normalpriceprc:data.Data.normalpriceprc,
                     holidaypriceprc:data.Data.holidaypriceprc,weeklyoffnum:data.Data.weeklyoffnum,
                     monthlyoffnum:data.Data.monthlyoffnum,villaowner:data.Data.villaowner.id,discountnum:data.Data.discountnum});
            },
            null,'trapp.villa',AccessManager.VIEW,
            this.props.history);
        }//IF

new SweetFetcher().Fetch('/trapp/viewtype',SweetFetcher.METHOD_GET,null,
                data=>{
                this.setState({viewtypeOptions:data.Data});
            },
            null,'trapp.viewtype',AccessManager.LIST,
            this.props.history);
new SweetFetcher().Fetch('/trapp/structuretype',SweetFetcher.METHOD_GET,null,
                data=>{
                let Options=data.Data;
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
    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف ویلا</p>

                        <TextBox readOnly={!this.state.canEdit} keyboardType='numeric' title={'تعداد اتاق'} value={this.state.roomcountnum} onChangeText={(text) => {this.setState({roomcountnum: text});}}/>
                        <TextBox readOnly={!this.state.canEdit} keyboardType='numeric' title={'ظرفیت به نفر'} value={this.state.capacitynum} onChangeText={(text) => {this.setState({capacitynum: text});}}/>
                        <TextBox readOnly={!this.state.canEdit} keyboardType='numeric' title={'حداکثر تعداد مهمان'} value={this.state.maxguestsnum} onChangeText={(text) => {this.setState({maxguestsnum: text});}}/>
                        <TextBox readOnly={!this.state.canEdit} keyboardType='numeric' title={'متراژ بنا'} value={this.state.structureareanum} onChangeText={(text) => {this.setState({structureareanum: text});}}/>
                        <TextBox readOnly={!this.state.canEdit} keyboardType='numeric' title={'متراژ کل'} value={this.state.totalareanum} onChangeText={(text) => {this.setState({totalareanum: text});}}/>
                        <CheckedRow title='دارای سند مالکیت به نام کاربر' checked={this.state.addedbyowner}
                                    onPress={() => this.setState({addedbyowner: this.state.addedbyowner==0?1:0})}/>

                        <PickerBox
                            name={'viewtypes'}
                            title={'چشم انداز'}
                            selectedValue ={this.state.viewtype}
                            onValueChange={(value, index) => {
                                this.setState({viewtype: value});
                            }}
                            options={this.state.viewtypeOptions}
                        />
                        <PickerBox
                            name={'structuretype'}
                            title={'نوع ساختمان'}
                            selectedValue ={this.state.structuretype}
                            onValueChange={(value, index) => {
                                this.setState({structuretype: value});
                            }}
                            options={this.state.structuretypeOptions}
                        />
                         <div className='form-group'>
                            <FormInline>

                           <label>تحویل ۲۴ ساعته</label>
                                    <Input
                                        onClick={() => this.setState({fulltimeservice : 0})}
                                        checked={this.state.fulltimeservice == 0}
                                        label='تحویل ۲۴ ساعته ندارد'
                                        type='radio'
                                        id='radiois_fulltimeservice1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({fulltimeservice : 1})}
                                        checked={this.state.fulltimeservice == 1}
                                        label='تحویل ۲۴ ساعته دارد'
                                        type='radio'
                                        id='radiois_fulltimeservice2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='timestartclk'>زمان تحویل/تخلیه</label>
                            <input
                                className='form-control'
                                id='timestartclk'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.timestartclk}
                                onChange={(event)=>{this.setState({timestartclk:event.target.value})}}/>
                        </div>
                    <div className='form-group'>
                        <label htmlFor='owningtype'>نوع اقامتگاه</label>
                        <select
                                id='owningtype'
                                className='browser-default custom-select'
                                value={this.state.owningtype}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({owningtype:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.owningtypeOptions}
                            </select>
                            </div>
                    <div className='form-group'>
                        <label htmlFor='areatype'>بافت</label>
                        <select
                                id='areatype'
                                className='browser-default custom-select'
                                value={this.state.areatype}
                                disabled={!this.state.canEdit}
                                onChange={(event)=>{this.setState({areatype:event.target.value})}}>
                                <option value={''}>انتخاب کنید</option>
                                {this.state.areatypeOptions}
                            </select>
                            </div>
                        <TextBox multiline={true} title={'توضیحات'} value={this.state.descriptionte} onChangeText={(text) => {this.setState({descriptionte: text});}}/>


                        <ImageSelector title='انتخاب سند مالکیت' onConfirm={(path)=>{
                            this.setState({SelecteddocumentphotoiguLocation : path});
                        }} previewImage={this.state.documentphotoiguPreview} onImagePreviewLoaded={(result)=>{
                            this.setState({
                                documentphotoiguPreview: [result]
                            });
                        }}/>

                        <div className='form-group'>
                            <label htmlFor='normalpriceprc'>قیمت در روزهای عادی</label>
                            <input
                                className='form-control'
                                id='normalpriceprc'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.normalpriceprc}
                                onChange={(event)=>{this.setState({normalpriceprc:event.target.value})}}/>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='holidaypriceprc'>تخفیف</label>
                            <input
                                className='form-control'
                                id='holidaypriceprc'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.discountnum}
                                onChange={(event)=>{this.setState({discountnum:event.target.value})}}/>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='holidaypriceprc'>قیمت در روزهای تعطیل</label>
                            <input
                                className='form-control'
                                id='holidaypriceprc'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.holidaypriceprc}
                                onChange={(event)=>{this.setState({holidaypriceprc:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='weeklyoffnum'>تخفیف رزرو بیش از یک هفته</label>
                            <input
                                className='form-control'
                                id='weeklyoffnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.weeklyoffnum}
                                onChange={(event)=>{this.setState({weeklyoffnum:event.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='monthlyoffnum'>تخفیف رزرو بیش از یک ماه</label>
                            <input
                                className='form-control'
                                id='monthlyoffnum'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.monthlyoffnum}
                                onChange={(event)=>{this.setState({monthlyoffnum:event.target.value})}}/>
                        </div>
                            <div className='text-center'>
                            {this.state.canEdit &&
                                <div>
                                <SweetButton value={'ذخیره'}
                                    onButtonPress={(afterFetchListener) => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                    if (this.props.match.params.id > 0)
                                        id = this.props.match.params.id;
                                    const data = new FormData();

									data.append('roomcountnum', this.state.roomcountnum);
									data.append('capacitynum', this.state.capacitynum);
									data.append('maxguestsnum', this.state.maxguestsnum);
									data.append('structureareanum', this.state.structureareanum);
									data.append('totalareanum', this.state.totalareanum);
									data.append('placemanplace', this.state.placemanplace);
									data.append('addedbyowner', this.state.addedbyowner);
									data.append('viewtype', this.state.viewtype);
									data.append('structuretype', this.state.structuretype);
									data.append('fulltimeservice', this.state.fulltimeservice);
									data.append('timestartclk', this.state.timestartclk);
									data.append('owningtype', this.state.owningtype);
									data.append('areatype', this.state.areatype);
									data.append('descriptionte', this.state.descriptionte);
									data.append('documentphotoigu', this.state.documentphotoigu);
									data.append('normalpriceprc', this.state.normalpriceprc);
									data.append('holidaypriceprc', this.state.holidaypriceprc);
									data.append('weeklyoffnum', this.state.weeklyoffnum);
									data.append('monthlyoffnum', this.state.monthlyoffnum);
									data.append('discountnum', this.state.discountnum);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/trapp/villa'+Separator+id,method,data,
                                    res => {
                                                return this.props.history.push('/trapp/villas');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'trapp.villa',action,
                                        this.props.history);

                                }
                                }
                                />
                                    <MDBBtn onClick={() =>
                                    {
                                        this.props.history.push('/placeman/placephotos/place/'+this.state.placemanplace);
                                    }
                                    }>تصاویر ویلا</MDBBtn>
                                    <MDBBtn onClick={() =>
                                    {
                                        this.props.history.push('/trapp/villaowners/management/'+this.state.villaowner);
                                    }
                                    }>اطلاعات صاحب ویلا</MDBBtn>
                                    <SweetButton value={'فعال سازی'}
                                                 onButtonPress={(afterFetchListener) => {
                                                     let id = this.state.placemanplace;
                                                     let method=SweetFetcher.METHOD_PUT;
                                                     let Separator='/';
                                                     let action=AccessManager.EDIT;
                                                         const data = new FormData();
                                                         data.append('id', id);
                                                         new SweetFetcher().Fetch('/placeman/place'+Separator+id+Separator+'activate/1',method,data,
                                                             res => {
                                                                 return this.props.history.push('/trapp/villas');
                                                                 //console.log(res);
                                                             },(error)=>{
                                                                 let status=error.response.status;
                                                                 afterFetchListener();
                                                                 SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                                             },
                                                             'trapp.villa',action,
                                                             this.props.history);



                                                 }
                                                 }
                                    />
                                    <SweetButton value={'غیرفعال سازی'}
                                                 onButtonPress={(afterFetchListener) => {
                                                     let id = this.state.placemanplace;
                                                     let method=SweetFetcher.METHOD_PUT;
                                                     let Separator='/';
                                                     let action=AccessManager.EDIT;
                                                     const data = new FormData();
                                                     data.append('id', id);
                                                     new SweetFetcher().Fetch('/placeman/place'+Separator+id+Separator+'activate/0',method,data,
                                                         res => {
                                                             return this.props.history.push('/trapp/villas');
                                                             //console.log(res);
                                                         },(error)=>{
                                                             let status=error.response.status;
                                                             afterFetchListener();
                                                             SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                                         },
                                                         'trapp.villa',action,
                                                         this.props.history);



                                                 }
                                                 }
                                    />
                                </div>

                            }
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/trapp/villas');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default trapp_villaManage;
