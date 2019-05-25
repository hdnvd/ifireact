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

class posts_postView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('posts','post',AccessManager.EDIT),
            
			title:'',
			summaryte:'',
			contentte:'',
			thumbnailflu:'',
			thumbnailfluPreview:'',
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/posts/post/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null, 
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);
            
                 this.setState({ 
title:data.Data.title,
summaryte:data.Data.summaryte,
contentte:data.Data.contentte,thumbnailfluPreview:Constants.SiteURL+'/'+data.Data.thumbnailflu,});
        
            }, 
            null,'posts.post',AccessManager.VIEW,
            this.props.history);
        }//IF
        
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> post</p>
                        
                        <div className='form-group'>
                            <label>عنوان</label>
                            <label
                                className='valuelabel'>
                                {this.state.title}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>خلاصه</label>
                            <label
                                className='valuelabel'>
                                {this.state.summaryte}
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>محتوا</label>
                            <label
                                className='valuelabel'>
                                {this.state.contentte}
                            </label>
                        </div><div className='form-group'>
                            <label htmlFor='thumbnailflu'>تصویر شاخص</label>
                            
                        <ModalImage
                            small={this.state.thumbnailfluPreview}
                            large={this.state.thumbnailfluPreview}
                            className={'imageuploadpreview'} />
                        </div>
                                
                            <div className='text-center'>
                            <MDBBtn onClick={() =>
                             {
                                this.props.history.push('/posts/posts');
                             }
                            }>برگشت</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default posts_postView;
