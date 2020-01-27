/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Dimensions,
    StyleSheet,
    TouchableOpacity, PermissionsAndroidStatic as PermissionsAndroid, Image,
} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import DateTimePicker from "react-native-modal-datetime-picker";
import {Button} from "react-native-elements";
import SweetButton from "./SweetButton";
import SweetModal from './SweetModal';
import Constants from '../../classes/Constants';
import Geolocation from '@react-native-community/geolocation';
import SweetConsole from '../../classes/SweetConsole';
import SweetAlert from '../../classes/SweetAlert';
import MapView, {Marker} from 'react-native-maps';
import TextBox from './TextBox';
import FetchLocation from '../../components/FetchLocation';

export default class SweetLocationSelector extends Component<{}> {
    static getLocationInfoFromObject(theObject)
    {
        let subObjectFunction= ({latitude,longitude,latitudeDelta,longitudeDelta})=> {
            return ({latitude, longitude, latitudeDelta, longitudeDelta})
        };

        let res=subObjectFunction(theObject);
        console.log(res);
        return res;
    }
    constructor(props) {
        super(props);
        this.state = {
            displayMap:false,
        };
    }
    changeMainModalDisplayState(visible)
    {
        this.setState({displayMap:visible});
    }
    render() {
        let Location={
            latitude:  35.6892,
            longitude: 51.3890,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        if(this.props.location!=null)
        {
            if(this.props.location.latitude!=null)
                Location.latitude=parseFloat(this.props.location.latitude);
            if(this.props.location.longitude!=null)
                Location.longitude=parseFloat(this.props.location.longitude);
            if(this.props.location.latitudeDelta!=null)
                Location.latitudeDelta=parseFloat(this.props.location.latitudeDelta);
            if(this.props.location.longitudeDelta!=null)
                Location.longitudeDelta=parseFloat(this.props.location.longitudeDelta);
        }
        // console.log(Location);
        return (
            <View  style={{marginTop: '3%'}}>
                <Text style={this.props.labelStyle!=null?this.props.labelStyle:generalStyles.inputLabel}>
                    {this.props.title==null?'موقعیت روی نقشه':this.props.title}</Text>

                <View style={Styles.container}>
                        <View style={Styles.mapContainer}>
                            <MapView
                                showUserLocationButton={true}
                                style={Styles.map}
                                initialRegion={{
                                    latitude:  35.6892,
                                    longitude: 51.3890,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                showsUserLocation={true}
                                loadingEnabled={true}
                                region={Location}
                                onRegionChangeComplete={this.props.onLocationChange}
                            >
                                <Marker coordinate={Location}>
                                    <Image
                                        source={require('../../images/icons/location.png')}
                                        style={Styles.marker}
                                    />
                                </Marker>
                            </MapView>
                            <FetchLocation onFetchLocation={this.OnRelocate} style={Styles.locate} />
                        </View>
                    </View>

                {/*</SweetModal>*/}
            </View>);
    }
    OnRelocate= () =>
    {
        Geolocation.getCurrentPosition(pos=>{

                        let gpsLocation={
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        };
                this.props.onLocationChange(gpsLocation);

            },err=>{
                SweetAlert.displaySimpleAlert('پیام','لطفا GPS گوشی خود را روشن کنید.');
            },
            {
                timeout:10000
            });
    };
}

let Window = Dimensions.get('window');
const Styles=StyleSheet.create(
    {
        container:{
            backgroundColor: '#fff', width: '90%', height: Window.height*0.5,
            justifyContent: 'center', alignSelf: 'center',
            borderRadius: 15,
            padding:Window.width*0.01,
        },
        mapContainer:
            {
                width: '100%',
                height: '100%'
            },
        map:
            {
                width: '100%',
                height: '100%'
            },
        marker:
            {
              width:Window.width*0.1,
                height:Window.width*0.1,
            },
    });
