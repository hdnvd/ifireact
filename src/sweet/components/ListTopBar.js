/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, TouchableHighlight, Image} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import ModalSelector from 'react-native-modal-selector';
import SweetSelectorModal from './SweetSelectorModal';


export default class ListTopBar extends Component<{}> {
    state={
      displaySortFieldSelect:false,
    };
    render() {
        return (
            <View>
            <View style={generalStyles.listTopBar}>
                <TouchableHighlight onPress={() => {
                    this.setState({displaySortFieldSelect:true});
                }}
                                    activeOpacity={0.3}
                                    underlayColor='#ffffff'>
                    <View style={generalStyles.listTopBarItem}>
                        <SweetSelectorModal
                            options={this.props.sortFields}
                            onValueChange={(option)=>{ this.props.onSortFieldSelect(option.id);}}
                            onHideRequest={()=>{this.setState({displaySortFieldSelect:false});}}
                            visible={this.state.displaySortFieldSelect}/>
                        <Text style={generalStyles.listTopBarItemText}>مرتب سازی</Text>
                        <Image source={require('../../images/sort.png')}
                               style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onSearchClick}
                                    activeOpacity={0.3}
                                    underlayColor='#eee'>
                    <View style={generalStyles.listTopBarItem}>

                        <Text style={generalStyles.listTopBarItemText}>جستجو</Text>
                        <Image source={require('../../images/filter.png')}
                               style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                    </View>
                </TouchableHighlight>
            </View>
                {this.props.displaySearchTitleBar &&
                <View style={generalStyles.searchTitleTopBar}>
                    <Text style={generalStyles.searchTitleTopBarText}>نتایج جستجو</Text>
                    <TouchableHighlight style={generalStyles.searchTitleTopBarCancelIconContainer}
                                        onPress={this.props.onCancelSearch}
                                        activeOpacity={0.3}
                                        underlayColor='#fff'>
                        <Image source={require('../../images/cancel.png')}
                               style={generalStyles.searchTitleTopBarCancelIcon} resizeMode={'stretch'}/>
                    </TouchableHighlight>
                </View>
                }
            </View>
        );
    }
}

