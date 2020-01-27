/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Switch, Dimensions} from 'react-native';
import generalStyles from "../../styles/generalStyles";
export default class ViewBox extends Component<{}> {
    render() {
        return (
            <View style={{...StyleSheet.flatten(generalStyles.viewBox),...this.props.style}}>
                {(this.props.logo!=null || this.props.title!=null) &&
                <View style={generalStyles.viewBoxTitleBox}>

                    {this.props.showDisableSwitch!=null &&
                    <Switch onValueChange={this.props.onDisableSwitchValueChange} value={this.props.enabled} style={styles.disableSwitch}/>
                    }
                    <View style={styles.viewBoxTitleBoxTitleAndHeader}>
                    {this.props.logo!=null  &&
                    <Image source={this.props.logo}
                           style={generalStyles.viewBoxLogo}/>
                    }
                    {this.props.title != null &&
                        <Text style={generalStyles.viewBoxCaption}>{this.props.title}</Text>
                    }
                    </View>
                </View>
                }
                {this.props.children}
            </View>);
    }
}

let Window = Dimensions.get('window');
const styles=StyleSheet.create(
    {
        disableSwitch:
            {
                alignSelf:"flex-start",

            },
        viewBoxTitleBoxTitleAndHeader:
            {
                // backgroundColor:'#0f0',
                alignItems: 'flex-end',
                marginLeft:"auto",
            }
    });
