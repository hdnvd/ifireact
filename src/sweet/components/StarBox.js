/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import SweetAlert from '../../classes/SweetAlert';

export default class StarBox extends Component<{}> {
    starNum=5;
    filledImage=require('../../images/icons/star/starfilled.png');
    emptyImage=require('../../images/icons/star/starwhite.png');
    _getStar(index,isSelected)
    {
        const image=<Image style={this.props.starStyle==null?styles.star:this.props.starStyle} source={isSelected?this.filledImage:this.emptyImage}/>;
        if(this.props.onValueChange!=null){
        return <TouchableOpacity onPress={()=>{this.props.onValueChange(index+1)}}>
            {image}
        </TouchableOpacity>;
        }
        else
            return image;
    };
    render() {
        let i;
        const rate=Math.round(this.props.rate);
        let starArray=[];
        for(i=0;i<rate;i++)
            starArray[i]=this._getStar(i,true);
        for(i=Math.max(rate,0);i<this.starNum;i++)
            starArray[i]=this._getStar(i,false);
        return (
            <View {...this.props}>
            <View style={styles.container}>
                {starArray}
            </View>
            </View>);
    }
}

let Window = Dimensions.get('window');
const styles=StyleSheet.create(
    {
       container:
           {
                flexDirection:'row',
           },
        star:{
           height: 30,
            width: 30,
            marginHorizontal:5,
        }
    });

