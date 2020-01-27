// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
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

class trapp_villaView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('trapp','villa',AccessManager.EDIT),
            
			roomcountnum:'',
			capacitynum:'',
			maxguestsnum:'',
			structureareanum:'',
			totalareanum:'',
			placemanplace:'',
			placemanplaceOptions:[],
			addedbyowner:'',
			viewtype:'',
			viewtypeOptions:[],
			structuretype:'',
			structuretypeOptions:[],
			fulltimeservice:'',
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
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/trapp/villa/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
roomcountnum:data.Data.roomcountnum,
capacitynum:data.Data.capacitynum,
maxguestsnum:data.Data.maxguestsnum,
structureareanum:data.Data.structureareanum,
totalareanum:data.Data.totalareanum,
placemanplace:data.Data.placemanplaceinfo.name,
addedbyowner:data.Data.addedbyowner,
viewtype:data.Data.viewtypeinfo.name,
structuretype:data.Data.structuretypeinfo.name,
fulltimeservice:data.Data.fulltimeservice,
timestartclk:data.Data.timestartclk,
owningtype:data.Data.owningtypeinfo.name,
areatype:data.Data.areatypeinfo.name,
descriptionte:data.Data.descriptionte,
documentphotoiguPreview:Constants.SiteURL+'/'+data.Data.documentphotoigu,
normalpriceprc:data.Data.normalpriceprc,
holidaypriceprc:data.Data.holidaypriceprc,
weeklyoffnum:data.Data.weeklyoffnum,
monthlyoffnum:data.Data.monthlyoffnum,});
        
            }, 
            null,'trapp.villa',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> villa</p>
                        
                        <div className='form-group'>
                            <label>تعداد اتاق</label>
                            <label
                                className='valuelabel'>
                                {this.state.roomcountnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>ظرفیت به نفر</label>
                            <label
                                className='valuelabel'>
                                {this.state.capacitynum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>حداکثر تعداد مهمان</label>
                            <label
                                className='valuelabel'>
                                {this.state.maxguestsnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>متراژ بنا</label>
                            <label
                                className='valuelabel'>
                                {this.state.structureareanum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>متراژ کل</label>
                            <label
                                className='valuelabel'>
                                {this.state.totalareanum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>محل</label>
                            <label
                                className='valuelabel'>
                                {this.state.placemanplace}
                            </label>
                        </div>
                         <div className='form-group'>
                            <FormInline>
                            
                           <label>دارای سند مالکیت به نام کاربر</label>
                                    <Input
                                        onClick={() => this.setState({addedbyowner : 0})}
                                        checked={this.state.addedbyowner == 0}
                                        label='دارای سند مالکیت به نام کاربر ندارد'
                                        type='radio'
                                        id='radiois_addedbyowner1'
                                readOnly={!this.state.canEdit}
                                    />
                                    <Input
                                        onClick={() => this.setState({addedbyowner : 1})}
                                        checked={this.state.addedbyowner == 1}
                                        label='دارای سند مالکیت به نام کاربر دارد'
                                        type='radio'
                                        id='radiois_addedbyowner2'
                                readOnly={!this.state.canEdit}
                                    />
                                </FormInline>
                        </div>
                        <div className='form-group'>
                            <label>چشم انداز</label>
                            <label
                                className='valuelabel'>
                                {this.state.viewtype}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>نوع ساختمان</label>
                            <label
                                className='valuelabel'>
                                {this.state.structuretype}
                            </label>
                        </div>
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
                            <label>زمان تحویل/تخلیه</label>
                            <label
                                className='valuelabel'>
                                {this.state.timestartclk}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>نوع اقامتگاه</label>
                            <label
                                className='valuelabel'>
                                {this.state.owningtype}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>بافت</label>
                            <label
                                className='valuelabel'>
                                {this.state.areatype}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>توضیحات</label>
                            <div dangerouslySetInnerHTML={{__html: this.state.descriptionte}} />
                        </div><div className='form-group'>
                            <label htmlFor='documentphotoigu'>سند مالکیت</label>
                            
                        <ModalImage
                            small={this.state.documentphotoiguPreview}
                            large={this.state.documentphotoiguPreview}
                            className={'imageuploadpreview'} />
                        </div>
                            
                        <div className='form-group'>
                            <label>قیمت در روزهای عادی</label>
                            <label
                                className='valuelabel'>
                                {this.state.normalpriceprc}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>قیمت در روزهای تعطیل</label>
                            <label
                                className='valuelabel'>
                                {this.state.holidaypriceprc}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تخفیف رزرو بیش از یک هفته</label>
                            <label
                                className='valuelabel'>
                                {this.state.weeklyoffnum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>تخفیف رزرو بیش از یک ماه</label>
                            <label
                                className='valuelabel'>
                                {this.state.monthlyoffnum}
                            </label>
                        </div>    
                            <div className='text-center'>
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

export default trapp_villaView;
