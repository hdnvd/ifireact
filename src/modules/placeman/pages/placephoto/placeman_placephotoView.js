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

class placeman_placephotoView extends SweetComponent {
    constructor(props) {
        super(props);
        this.state = {
                canEdit:AccessManager.UserCan('placeman','placephoto',AccessManager.EDIT),

			name:'',
			photoigu:'',
			photoiguPreview:'',
			phototype:'',
			phototypeOptions:[],
			place:'',
			placeOptions:[],
        };
        if(this.props.match.params.id>0){
        new SweetFetcher().Fetch('/placeman/placephoto/'+this.props.match.params.id, SweetFetcher.METHOD_GET,null,
        data => {
            data.Data=Common.convertNullKeysToEmpty(data.Data);

                 this.setState({
name:data.Data.name,
photoiguPreview:Constants.SiteURL+'/'+data.Data.photoigu,
phototype:data.Data.phototypeinfo.name,
place:data.Data.placeinfo.name,});

            },
            null,'placeman.placephoto',AccessManager.VIEW,
            this.props.history);
        }//IF

    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'> placephoto</p>

                        {/*<div className='form-group'>*/}
                        {/*    <label>نام</label>*/}
                        {/*    <label*/}
                        {/*        className='valuelabel'>*/}
                        {/*        {this.state.name}*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <div className='form-group'>
                            <label htmlFor='photoigu'>تصویر</label>

                        <ModalImage
                            small={this.state.photoiguPreview}
                            large={this.state.photoiguPreview}
                            className={'imageuploadpreview'} />
                        </div>

                        {/*<div className='form-group'>*/}
                        {/*    <label>phototype_fid</label>*/}
                        {/*    <label*/}
                        {/*        className='valuelabel'>*/}
                        {/*        {this.state.phototype}*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        {/*<div className='form-group'>*/}
                        {/*    <label>place_fid</label>*/}
                        {/*    <label*/}
                        {/*        className='valuelabel'>*/}
                        {/*        {this.state.place}*/}
                        {/*    </label>*/}
                        {/*</div>    */}
                        {/*    <div className='text-center'>*/}
                        {/*    <MDBBtn onClick={() =>*/}
                        {/*     {*/}
                        {/*        this.props.history.push('/placeman/placephotos');*/}
                        {/*     }*/}
                        {/*    }>برگشت</MDBBtn>*/}
                        {/*</div>*/}
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default placeman_placephotoView;
