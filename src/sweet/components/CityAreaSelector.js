/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import generalStyles from '../../styles/generalStyles';
import PlaceManager from '../../modules/placeman/classes/PlaceManager';
import PickerBox from './PickerBox';

export default class CityAreaSelector extends Component<{}> {
    placemanager = new PlaceManager();
    constructor(props) {
        super(props);
        this.state =
            {
                infoLoaded: false,
                provinceOptions: [],
                cityOptions: [],
                areaOptions: [],
                selectedProvinceValue: -1,
                selectedCityValue: -1,
                selectedAreaValue: -1,

            };

        this.placemanager.onProvincesLoaded = (ProvinceOptions, Provinces) => {
            let provinceID = (Provinces != null && Provinces.length > 0) ? Provinces[0].id : -1;
            provinceID=-1;
            this.setState({
                provinceOptions: Provinces,
                selectedProvinceValue: provinceID,
                selectedCityValue: -1,
            }, () => {
                this.placemanager.loadCityOptions(provinceID);
            });
        };
        this.placemanager.onCitiesLoaded = (CityOptions, Cities) => {
            let cityID = (Cities != null && Cities.length > 0) ? Cities[0].id : -1;
            cityID=-1;
            this.setState({cityOptions: Cities, selectedCityValue: cityID, selectedAreaValue: -1}, () => {
                this.placemanager.loadAreaOptions(this.state.selectedProvinceValue, cityID);
                if (this.props.onCitySelected != null) {
                    this.props.onCitySelected(cityID);
                }
            });
        };
        this.placemanager.onAreasLoaded = (AreaOptions, Areas) => {
            let AreaID = (Areas != null && Areas.length > 0) ? Areas[0].id : -1;
            AreaID=-1;
            this.setState({areaOptions: Areas, selectedAreaValue: AreaID}, () => {
                if (this.props.onAreaSelected != null) {
                    this.props.onAreaSelected(AreaID);
                }
            });
        };
    }
    loadData = () => {
        this.placemanager.loadProvinceOptions();
    };
    componentDidMount() {
        this.loadData();
    }

    render() {
        return (<View>
            <View>
                <PickerBox style={generalStyles.select}
                           title={'استان'}
                           isOptional={false}
                        name='placemanprovinces'
                        selectedValue={this.state.selectedProvinceValue}
                        onValueChange={
                            (ProvinceID, index) => {
                                this.setState({
                                    selectedProvinceValue: ProvinceID,
                                    selectedCityValue: -1,
                                    selectedAreaValue: -1,
                                }, () => {
                                    if (this.props.onProvinceSelected != null) {
                                        this.props.onProvinceSelected(ProvinceID);
                                    }
                                    this.placemanager.loadCityOptions(ProvinceID);
                                });
                            }
                        }
                           options={this.state.provinceOptions}
                />
            </View>
            <View>
                <PickerBox style={generalStyles.select}
                        name='placemancities'
                           title='شهر'
                           isOptional={true}
                        selectedValue={this.state.selectedCityValue}
                        onValueChange={(CityID, index) => {
                            this.setState({selectedCityValue: CityID, selectedAreaValue: -1}, () => {
                                this.placemanager.loadAreaOptions(this.state.selectedProvinceValue, CityID);
                                if (this.props.onCitySelected != null) {
                                    this.props.onCitySelected(CityID);
                                }
                            });
                        }}
                           options={this.state.cityOptions}
                />
            </View>
            {(this.props.displayAreaSelect == null || this.props.displayAreaSelect == true) &&
            <View>
                <PickerBox style={generalStyles.select}
                           title={'منطقه'}
                           isOptional={true}
                        name='placemanareas'
                        selectedValue={this.state.selectedAreaValue}
                        onValueChange={(AreaID, index) => {
                            this.setState({selectedAreaValue: AreaID}, () => {
                                this.props.onAreaSelected(AreaID);
                            });

                        }}
                           options={this.state.areaOptions}
                />
            </View>
            }
        </View>);
    }
}

