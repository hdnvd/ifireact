/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ModalImage from "react-modal-image";

export default class ImageSelector extends Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input
                    className='form-control file'
                    readOnly={this.props.readOnly}
                    id={this.props.id}
                    group
                    type='file'
                    onChange={(event)=>{
                        let file=event.target.files[0];
                        this.props.onConfirm(file);

                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        this.props.onConfirm(file);
                        reader.onloadend = function (e) {
                            this.props.onImagePreviewLoaded(reader.result);
                        }.bind(this);
                    }}
                />
                {this.props.previewImage!='' &&
                <ModalImage
                    small={this.props.previewImage}
                    large={this.props.previewImage}
                    className={'imageuploadpreview'} />
                }
            </div>
            );
    }
}

