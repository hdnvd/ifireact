/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Picker, ScrollView, Text, TextInput, TouchableHighlight, View} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {Button} from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import PlaceManager from "../../modules/placeman/classes/PlaceManager";

export default class CityAreaFinder extends Component<{}> {
    placemanager=new PlaceManager();
    constructor(props) {
        super(props);
        this.state =
            {
                findText:'',
                infoLoaded:false,
                provinceOptions:[<Picker.Item label='استان' value='-1' style={generalStyles.pickerItem} />],
                cityOptions:[<Picker.Item label='شهر' value='-1' style={generalStyles.pickerItem} />],
                areaOptions:[<Picker.Item label='منطقه' value='-1' style={generalStyles.pickerItem} />],
                selectedProvinceValue: -1,
                selectedCityValue: -1,
                selectedAreaValue: -1,
                visibleSearch:false,
            };

        this.placemanager.onProvincesLoaded=(ProvinceOptions,Provinces)=>{
            const provinceID=(Provinces!=null && Provinces.length>0)?Provinces[0].id:-1;
            this.setState({provinceOptions:ProvinceOptions,selectedProvinceValue:provinceID,selectedCityValue:-1},()=>{
                this.placemanager.loadCityOptions(provinceID)
            });
        };
        this.placemanager.onCitiesLoaded=(CityOptions,Cities)=>{
            const cityID=(Cities!=null && Cities.length>0)?Cities[0].id:-1;
            this.setState({cityOptions:CityOptions,selectedCityValue:cityID,selectedAreaValue:-1},()=>{
                this.placemanager.loadAreaOptions(this.state.selectedProvinceValue,cityID);
                if(this.props.onCitySelected!=null)
                    this.props.onCitySelected(cityID);
            });
        };
        this.placemanager.onAreasLoaded=(AreaOptions,Areas)=>{
            const AreaID=(Areas!=null && Areas.length>0)?Areas[0].id:-1;
            this.setState({areaOptions:AreaOptions,selectedAreaValue: AreaID},()=>{
                if(this.props.onAreaSelected!=null)
                    this.props.onAreaSelected(AreaID);
            });
        };
    }
    loadData=()=>{
        this.placemanager.loadProvinceOptions();
    };
    componentDidMount()
    {
        this.loadData();
    }
    render() {
        let data=null;
        if(global.provinces!=null)
            data=global.provinces.filter(pr=>{
            return pr.title.includes(this.state.findText);
        });
        return (<View style={{width:'100%',backgroundColor:'#fff',position: 'relative',zIndex:3}}>
            {this.state.visibleSearch && this.state.findText.length>=2 &&
            <View style={{backgroundColor:'#fff',width:'80%',height:170,justifyContent:'center',alignSelf:'center',
                shadowColor: "#1f1f1f",
                position:'absolute',
                bottom:'70%',
                zIndex:2,
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2.22,
                elevation: 5,
                borderRadius:15,
            }}>
                <ScrollView contentContainerStyle={{flexGrow: 1,zIndex:3}} style={{flexGrow: 1,zIndex:3}}>
                    <View  style={{justifyContent:'center',height:'100%',flex:1}}>
                        <View>
                            <Text style={{textAlign:'center',fontFamily:'IRANSansMobile'}}>همه</Text></View>
                        {data!=null && data.map(pr=>{
                            return <TouchableHighlight activeOpacity={0}
                                                       underlayColor='#fff'
                                                       onPress={()=>{
                                                       this.setState({visibleSearch:false})}
                                                       }><View style={{width:'100%',paddingVertical:10,backgroundColor:'#fff',borderWidth:1,borderTopColor:'#ccc'}}>
                                <Text style={{textAlign:'center',fontFamily:'IRANSansMobile'}}>{pr.title}</Text>
                            </View>
                            </TouchableHighlight>
                        }
                        )}
                    </View>
                </ScrollView>
            </View>
            }
            <Text style={{width:'100%',borderWidth:0,textAlign:'center',marginTop:'10%',fontFamily:'IRANSansMobile'}}>مقصد شما</Text>
            <TextInput onChangeText={(text)=>{
                this.setState({findText:text,visibleSearch:true});
            }} style={{zIndex:1,width:'100%',borderWidth:0,textAlign:'center',fontFamily:'IRANSansMobile'}} placeholder='شهر/استان' />

        </View>);
    }
}

