/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
export default class CheckedRow extends React.Component {
    render() {
        let checked=false;
        if(this.props.checked===true || this.props.checked==="true" || this.props.checked==="1" || this.props.checked===1)
            checked=true;
        return (
            <div className='form-group'>
                <input
                    className='form-control checkedrow'
                    id={this.props.id}
                    type={'checkbox'}
                    readOnly={this.props.readOnly}
                    group
                    validate
                    value={checked}
                    onChange={(event) =>{this.props.onPress()} } {...this.props}/>

                {this.props.title}
            </div>);
    }
}

