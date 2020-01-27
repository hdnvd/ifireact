/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, TouchableHighlight, Image, Modal, StyleSheet, Dimensions} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import ModalSelector from 'react-native-modal-selector';
import SweetSelectorModal from './SweetSelectorModal';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';
import Pagination from 'react-native-snap-carousel/src/pagination/Pagination';
import Constants from '../../classes/Constants';
import SweetConsole from '../../classes/SweetConsole';


export default class SweetTopCarousel extends Component<{}> {
    state={
        activeTab:0,
        isImageViewVisible:false,
    };
    urlField="photoigu";
    urlPrefix="";
    constructor(props) {
        super(props);
        if(props.urlField!=null)
            this.urlField=props.urlField;
        if(props.urlPrefix!=null)
            this.urlPrefix=props.urlPrefix;
    }

    _renderItem = ({item, index}) => {
        let Window = Dimensions.get('window');
        //SweetConsole.log(this.urlField,"Carousel urlField");
        //SweetConsole.log(item,"Carousel Photo Item");
        //SweetConsole.log(this.urlPrefix+item[this.urlField],"Carousel Photo URL");
        return (
            <TouchableHighlight onPress={()=>{this.setState({isImageViewVisible: true});}}>
                <View style={{...StyleSheet.flatten(generalStyles.topimagelistitem),height:Window.width*0.7}}>
                    <Image style={generalStyles.topimagelistItemImage}
                           source={{uri: this.urlPrefix+item[this.urlField]}}/>
                </View>
            </TouchableHighlight>
        );
    };
    render() {
        let Window = Dimensions.get('window');
        if(this.props.data==null || this.props.data.length===0)
        {
            if(this.props.defaultPhoto!=null)
                return(
                    <View style={Styles.defaultTopPhotoContainer}>
                        <Image style={Styles.defaultTopPhoto}
                               source={this.props.defaultPhoto} resizeMode={'stretch'}/>
                    </View>
                );
            else
                return <View/>;
        }
        return (
            <View>
                <Modal visible={this.state.isImageViewVisible} transparent={true} animationType={'fade'} onRequestClose={()=>{this.setState({isImageViewVisible: false});}}>
                    <ImageViewer imageUrls={this.props.data.map(item=>{
                        item.url=this.urlPrefix+item[this.urlField];
                        return item;
                    })} onClick={() => {
                        this.setState({isImageViewVisible: false});
                    }}/>
                </Modal>

                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.props.data}
                    renderItem={this._renderItem}
                    sliderWidth={Window.width}
                    itemWidth={Window.width}
                    onSnapToItem={i => this.setState({activeTab: i})}
                />
                <Pagination
                    containerStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                        paddingVertical: 7,
                        width: '100%',
                        position: 'absolute',
                        bottom: 15
                    }}
                    inactiveDotOpacity={0.8}
                    inactiveDotScale={0.8}
                    dotStyle={{backgroundColor: '#ffffff'}}
                    activeDotIndex={this.state.activeTab}
                    dotsLength={this.props.data.length}
                />
            </View>
        );
    }
}


let Window = Dimensions.get('window');
const Styles=StyleSheet.create(
    {
        defaultTopPhotoContainer:
            {
                width:'100%',
                height:Window.width*0.5,
                alignItems: 'center',

                justifyContent: 'center',
            },
        defaultTopPhoto:
            {
                width:Window.width*0.35,
                height:Window.width*0.35*0.756,
            }
    }

);
