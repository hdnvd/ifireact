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
class posts_postManage extends SweetComponent {
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
            
                 this.setState({ title:data.Data.title,summaryte:data.Data.summaryte,contentte:data.Data.contentte,thumbnailfluPreview:Constants.SiteURL+'/'+data.Data.thumbnailflu,thumbnailflu:data.Data.thumbnailflu,});
            }, 
            null,'posts.post',AccessManager.VIEW,
            this.props.history);
        }//IF
    }
    editorConfiguration = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
    };
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>تعریف مطلب</p>
                        
                        <div className='form-group'>
                            <label htmlFor='title'>عنوان</label>
                            <input
                                className='form-control'
                                id='title'
                                type='text'
                                readOnly={!this.state.canEdit}
                                group
                                validate
                                value={this.state.title}
                                onChange={(event)=>{this.setState({title:event.target.value})}}/>
                        </div><div className='form-group'>
                            <label htmlFor='summaryte'>خلاصه</label>
                            <CKEditor
                                className='form-control'
                                id='content'
                                readOnly={!this.state.canEdit}
                                group
                                editor={ ClassicEditor }
                                config={ this.editorConfiguration }
                                data={this.state.summaryte}
                                onChange={ ( event, editor ) => {
                                    this.setState({summaryte:editor.getData()});
                                } }
                            />
                            </div><div className='form-group'>
                            <label htmlFor='contentte'>محتوا</label>
                            <CKEditor
                                className='form-control'
                                id='content'
                                readOnly={!this.state.canEdit}
                                group
                                editor={ ClassicEditor }
                                config={ this.editorConfiguration }
                                data={this.state.contentte}
                                onChange={ ( event, editor ) => {
                                    this.setState({contentte:editor.getData()});
                                } }
                            />
                            </div><div className='form-group'>
                            <label htmlFor='thumbnailflu'>تصویر شاخص</label>
                            <input
                            className='form-control file'
                            readOnly={!this.state.canEdit}
                            id='thumbnailflu'
                            group
                            type='file'
                            onChange={(event)=>{
                                let file=event.target.files[0];
                                let reader = new FileReader();
                                let url = reader.readAsDataURL(file);
                                reader.onloadend = function (e) {
                                    this.setState({
                                        thumbnailfluPreview: [reader.result]
                                });
                                }.bind(this);
                                this.setState({ thumbnailflu : file})
                            }}
                        />
                        {this.state.thumbnailflu!='' &&
                        <ModalImage
                            small={this.state.thumbnailfluPreview}
                            large={this.state.thumbnailfluPreview}
                            className={'imageuploadpreview'} />
                        }
                        </div>
                                
                            <div className='text-center'>
                            {this.state.canEdit && 
                                <SweetButton value={'ذخیره'}
                                    onButtonPress={(afterFetchListener) => {
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                    if (this.props.match.params.id > 0)
                                        id = this.props.match.params.id;
                                    const data = new FormData();
                                    
									data.append('title', this.state.title);
									data.append('summaryte', this.state.summaryte);
									data.append('contentte', this.state.contentte);
									data.append('thumbnailflu', this.state.thumbnailflu);
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
                                    new SweetFetcher().Fetch('/posts/post'+Separator+id,method,data, 
                                    res => {
                                                return this.props.history.push('/posts/posts');
                                                //console.log(res);
                                        },(error)=>{
                                            let status=error.response.status;
                                            afterFetchListener();
                                            SweetAlert.displaySimpleAlert('خطای پیش بینی نشده','خطایی در ذخیره اطلاعات به وجود آمد'+status.toString().trim());

                                        },
                                        'posts.post',action,
                                        this.props.history);
                                    
                                }
                                }
                                />
                            }
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

export default posts_postManage;
