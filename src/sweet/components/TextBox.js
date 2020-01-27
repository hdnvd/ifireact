/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

export default class TextBox extends React.Component {
    render() {
        let inputType='text';
        if(this.props.keyboardType!=null)
        {
            if(this.props.keyboardType.trim().toLowerCase()==='numeric')
                inputType='number';
        }
        return (
            <div className='form-group'>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                {(this.props.multiline == null || this.props.multiline == false) &&
                < input
                    className='form-control'
                    id={this.props.id}
                    type={inputType}
                    readOnly={this.props.readOnly}
                    group
                    validate
                    value={this.props.value}
                    onChange={(event) =>{this.props.onChangeText(event.target.value)}} {...this.props}/>
                }
                {this.props.multiline != null && this.props.multiline &&
                <CKEditor
                    className='form-control'
                    id={this.props.id}
                    readOnly={this.props.readOnly}
                    group
                    editor={ClassicEditor}
                    config={this.editorConfiguration}
                    data={this.props.value}
                    onChange={(event, editor) => {
                        this.props.onChangeText(editor.getData());
                    }}
                />
                }
            </div>
           );
    }
}

