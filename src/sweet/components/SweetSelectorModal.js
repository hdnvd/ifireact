/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, TouchableHighlight, Modal, TouchableOpacity} from 'react-native';
import PickerBox from './PickerBox';

export default class SweetSelectorModal extends PickerBox {

    showEmptyTitle=false;
    getItem=(item,itemTitle,itemValue)=>{
        return <View style={{width:'100%'}}><TouchableHighlight
            activeOpacity={0}
            underlayColor='#fff'
            onPress={()=>{
                this.props.onHideRequest();
                if(this.props.onValueChange!=null)
                    this.props.onValueChange(item);
            }}>
            <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#ccc',paddingVertical:10}}>
                <Text style={{width:'100%',
                    fontSize: 15,
                    justifyContent:'center',
                    marginTop:5,
                    color:'#000000',
                    fontFamily: 'IRANSansMobile',
                    textAlign:'center',}}>{itemTitle}</Text>

            </View>
        </TouchableHighlight>
        </View>;
    };
    render() {
        let OptionViews=this.getItemViews();
        return (
            <Modal visible={this.props.visible} transparent={true} animationType={'fade'}>
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
                    {OptionViews}
                    <View style={{width:'100%'}}><TouchableHighlight
                        activeOpacity={0}
                        underlayColor='#fff'
                        onPress={()=>{
                            this.props.onHideRequest();
                        }}>
                        <View style={{width:'100%',paddingVertical:10,backgroundColor:'#fff'}}>
                            <Text style={{width:'100%',
                                fontSize: 13,
                                justifyContent:'center',
                                marginTop:5,
                                color:'#af0a00',
                                fontFamily: 'IRANSansMobile',
                                textAlign:'center',}}>لغو</Text>

                        </View>
                    </TouchableHighlight>
                    </View>
                </View>
                </View>
                </TouchableHighlight>
            </Modal>);
    }
}

