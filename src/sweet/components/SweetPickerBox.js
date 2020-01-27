/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import SFMan from "../../classes/SFMan";
import PickerBox from './PickerBox';

export default class SweetPickerBox extends PickerBox {
    showEmptyTitle=false;
    getItem=(item,itemTitle,itemValue)=>{
        return <TouchableOpacity activeOpacity={0}
                          underlayColor='#fff'
                          onPress={() => {this.props.onValueChange(item);}}><View
            style={styles.touchableOpacity}>

            <View style={styles.itemContainer}/>
            <Text style={styles.itemText}>{itemTitle}</Text>
        </View>
        </TouchableOpacity>;
    };
    render() {
        let OptionViews=this.getItemViews();
        return (
            <View style={{...StyleSheet.flatten(styles.container),top:this.props.top}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flexGrow: 1}}>
                    <View style={{justifyContent: 'center', height: '100%', flex: 1}}>
                        <View>
                            {OptionViews}
                        </View>
                    </View>
                </ScrollView>
            </View>);
    }
}


const styles=StyleSheet.create(
    {
        container:{
            backgroundColor: '#fff', width: '80%', height: 170, justifyContent: 'center', alignSelf: 'center',
            shadowColor: '#1f1f1f',
            position: 'absolute',
            zIndex: 2,
            shadowOffset: {
                width: 5,
                height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2.22,
            elevation: 5,
            borderRadius: 15,
        },
        touchableOpacity:{width: '100%', paddingVertical: 10, alignItems: 'center'},
        itemContainer:{
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            width: '70%',
            marginBottom: 10,
        },
        itemText:{
            textAlign: 'center',
            fontFamily: 'IRANSansMobile'
        },
    });
