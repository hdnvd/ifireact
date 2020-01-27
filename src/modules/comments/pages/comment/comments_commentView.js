// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
import jMoment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
import InputMask from 'react-input-mask';
import Constants from '../../../../classes/Constants';
import AccessManager from '../../../../classes/AccessManager';
import Common from '../../../../classes/Common';
import SweetComponent from '../../../../classes/sweet-component';
import ModalImage from 'react-modal-image'
import SweetButton from '../../../../classes/sweet-button';
import SweetAlert from '../../../../classes/SweetAlert';

class comments_commentView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('comments','comment',AccessManager.EDIT),
            
			text:'',
			commenttype:'',
			commenttypeOptions:[],
			publishtime:'',
			ratenum:'',
			tempuser:'',
			tempuserOptions:[],
			mothercomment:'',
			mothercommentOptions:[],
			user:'',
			userOptions:[],
			subjectentity:'',
			subjectentityOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/comments/comment/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
text:data.Data.text,
commenttype:data.Data.commenttypeinfo.name,
publishtime:data.Data.publishtime,
ratenum:data.Data.ratenum,
tempuser:data.Data.tempuserinfo.name,
mothercomment:data.Data.mothercommentinfo.name,
user:data.Data.userinfo.name,
subjectentity:data.Data.subjectentityinfo.name,});
        
            }, 
            null,'comments.comment',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> comment</p>
                        
                        <div className='form-group'>
                            <label>متن</label>
                            <label
                                className='valuelabel'>
                                {this.state.text}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>نوع نظر</label>
                            <label
                                className='valuelabel'>
                                {this.state.commenttype}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>زمان انتشار</label>
                            <label
                                className='valuelabel'>
                                {this.state.publishtime}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>امتیاز</label>
                            <label
                                className='valuelabel'>
                                {this.state.ratenum}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>کاربر موقت</label>
                            <label
                                className='valuelabel'>
                                {this.state.tempuser}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>نظر مادر</label>
                            <label
                                className='valuelabel'>
                                {this.state.mothercomment}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>کاربر</label>
                            <label
                                className='valuelabel'>
                                {this.state.user}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>موجودیت هدف</label>
                            <label
                                className='valuelabel'>
                                {this.state.subjectentity}
                            </label>
                        </div>    
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/comments/comments');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default comments_commentView;
