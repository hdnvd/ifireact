/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import generalStyles from '../../styles/generalStyles';
export default class PageContainer extends Component<{}> {
    render() {
        return (
            <View flex={1}>
                {this.props.isLoading &&
                <View flex={1} style={{
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <ActivityIndicator animating={this.props.isLoading} size="large"
                                       color="#000000"/>
                </View>
                }

                {!this.props.isLoading && this.props.isEmpty &&
                <View flex={1} style={{
                    flex: 1,
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text style={Styles.title}>{this.props.emptyText!=null?this.props.emptyText:'هیچ محتوایی برای نمایش وجود ندارد'} </Text>

                </View>
                }
                {!this.props.isLoading && !this.props.isEmpty &&
                    this.props.children
                }
            </View>
        );
    }
}

const Styles=StyleSheet.create(
    {
       title:{
           fontSize: 17,
           textAlign: 'center',
           direction: 'rtl',

           fontFamily: 'IRANSansMobile',
       }
    });
