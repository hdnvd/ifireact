/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Picker,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native';
import generalStyles from '../../styles/generalStyles';
import PlaceManager from '../../modules/placeman/classes/PlaceManager';
import SweetModal from './SweetModal';
import CityAreaSelector from './CityAreaSelector';
import Constants from '../../classes/Constants';
import TextBox from './TextBox';

export default class CityAreaSelectorModal extends CityAreaSelector {
    constructor(props) {
        super(props);
        this.state={
            ...super.state,
            foundProvinces:[],
            foundCities:[],
            foundAreas:[],
            displaySelect:false,
            selectingItem:'province',
        }
    }
    loadData = (searchText) => {

        if (global.provinces != null ) {
            const data =PlaceManager.findPlaces(searchText,false,true,false);
            this.setState({foundProvinces:data[0],foundCities:data[1],foundAreas:data[2]})
        }
    };
    loadAllDataFromSelectingItem = (selectingItem,motherID) => {
        if(selectingItem=='province')
            this.setState({selectingItem:'province',foundProvinces:this.placemanager.getProvinces()});
        else if(selectingItem=='city')
        {
            const provinceObject=this.placemanager.getProvinceObjectFromId(motherID);
            this.setState({selectingItem:'city',foundCities:provinceObject==null?[]:provinceObject.province.cities});
        }
        if(selectingItem=='area')
        {
            const cityObject=this.placemanager.getCityObjectFromId(motherID);
            if(cityObject!=null && cityObject.city.areas.length===1)
                this.onAreaSelect(cityObject.city.areas[0]);
            else
                this.setState({selectingItem:'area',foundAreas:cityObject==null?[]:cityObject.city.areas});
        }
    };
    componentDidMount() {
        this.loadAllDataFromSelectingItem('province',-1);
        // this.loadData('');
    }
    getPlaceTitle()
    {
        let areaObject=null;
        const area=this.props.area;
        if(area!=null && area>0)
            areaObject=this.placemanager.getAreaObjectFromId(area);
        if(areaObject!=null)
            return areaObject.area.title+' - '+areaObject.city.title+' - '+areaObject.province.title;
        else{
            const city=this.props.city;
            if(city!=null && city>0)
                areaObject=this.placemanager.getCityObjectFromId(area);
            if(areaObject!=null)
                return areaObject.city.title+' - '+areaObject.province.title;
            else{
                const province=this.props.province;
                if(province!=null && province>0)
                    areaObject=this.placemanager.getProvinceObjectFromId(province);
                if(areaObject!=null)
                    return areaObject.province.title;
            }
        }
        return null;
    }
    onAreaSelect(c)
    {
        this.loadAllDataFromSelectingItem('province',-1);
        this.changeMainModalDisplayState(false);
        this.props.onSelect({area:c.id});
    }
    changeMainModalDisplayState(visible)
    {
        this.setState({displaySelect:visible});
    }
    getSelectList(list,onSelectItem,getTitle)
    {
        // console.log(list);
        return <View style={{justifyContent: 'center', height: '100%', flex: 1}}>
        {list != null && list.length > 0 &&
        <View>
            <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.3}
                renderItem={(item) =>{
                    return <TouchableOpacity activeOpacity={0}
                                             underlayColor='#fff'
                                             onPress={()=>{onSelectItem(item)}}><View
                        style={{width: '100%', paddingVertical: 10, alignItems: 'center'}}>
                        <View style={Styles.item}/>
                        <Text style={Styles.itemText}>{getTitle(item)}</Text>
                    </View>
                    </TouchableOpacity>}
                }
            />
        </View>
        }
        </View>;
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{
                    this.changeMainModalDisplayState(true);
                }}>
                    <TextBox editable={false} title={this.props.title==null?'شهر':this.props.title} value={this.getPlaceTitle()}/>
                </TouchableOpacity>
                <SweetModal visible={this.state.displaySelect} onHideRequest={()=>{
                    this.changeMainModalDisplayState(false);

                }}{...this.props}>
                    <View style={Styles.container}>
                        {/*<TextInput onChangeText={(text)=>{this.loadData(text)}} placeholder={'شهر'}/>*/}
                        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flexGrow: 1}}>
                            <View style={{justifyContent: 'center', height: '100%', flex: 1}}>
                                {this.state.selectingItem=='province' && this.getSelectList(this.state.foundProvinces,(c) => {
                                    this.loadAllDataFromSelectingItem('city',c.item.id);
                                },(c)=>{return c.item.title})}
                                {this.state.selectingItem=='city' && this.getSelectList(this.state.foundCities,(c) => {
                                    this.loadAllDataFromSelectingItem('area',c.item.id);
                                },(c)=>{return c.item.title})}
                                {this.state.selectingItem=='area' &&
                                this.getSelectList(this.state.foundAreas,(c) => {
                                    this.onAreaSelect(c.item);
                                },(c)=>{return c.item.title})
                                }
                            </View>
                        </ScrollView>
                    </View>
                </SweetModal>
            </View>
            );
    }
}


let Window = Dimensions.get('window');
const Styles=StyleSheet.create(
    {
        item:
            {
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                width: '70%',
                marginBottom: 10,
            },
        itemText:{
            textAlign: 'center',
            fontFamily: Constants.BaseFontName,
        },
        container:{
            backgroundColor: '#fff', width: '80%', height: Window.height*0.5, justifyContent: 'center', alignSelf: 'center',
            borderRadius: 15,
        },
    });
