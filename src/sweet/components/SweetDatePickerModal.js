/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View,TouchableHighlight,Modal} from 'react-native';
import generalStyles from '../../styles/generalStyles';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';

export default class SweetDatePickerModal extends Component<{}> {
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <Modal visible={this.props.visible} transparent={true} animationType={'fade'}>
                <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <View style={generalStyles.datepickercontainer}>
                    <PersianCalendarPicker
                        isRTL={true}
                        style={generalStyles.datepickercontainer}
                        scaleFactor={500}
                        onDateChange={this.props.onDateChange}
                        allowRangeSelection={false}
                        textStyle={generalStyles.datepickertext}
                    />
                </View>
                </View>
            </Modal>);
    }
}

