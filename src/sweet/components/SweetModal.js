/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, TouchableHighlight, Modal} from 'react-native';
import generalStyles from "../../styles/generalStyles";
export default class SweetModal extends Component<{}> {
    render() {
        return (
            <Modal transparent={true} animationType={'fade'} {...this.props}>
                <TouchableHighlight activeOpacity={0}
                                    underlayColor='#fff'
                                    onPress={this.props.onHideRequest}>
                    <View style={{
                        height:'100%',
                        width:'100%',
                        justifyContent: 'center',
                        backgroundColor:'rgba(0,0,0,0.6)',
                        alignItems: 'center'}}>
                        <View style={{backgroundColor:'#fff',borderRadius:10,padding:10,width:'80%',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                            {this.props.children}
                        </View>
                    </View>
                </TouchableHighlight>
            </Modal>);
    }
}

let Window = Dimensions.get('window');
const styles=StyleSheet.create(
    {

    });
