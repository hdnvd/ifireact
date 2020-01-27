import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import generalStyles from '../../styles/generalStyles';
import HeaderSize from '../../classes/HeaderSize';

export default class SweetPage extends Component<{}> {
    Window = Dimensions.get('window');
    state =
        {
            ...super.state,
            isLoading: false,
        };
    componentWillUnmount() {
        this.removeBackHandler();
    }
    componentDidMount() {
    }
    removeBackHandler(){
        if(this.backHandler!=null)
            this.backHandler.remove();
    }
    getActiveRouteState(route) {
        if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
            return route;
        }

        const childActiveRoute = route.routes[route.index];
        return this.getActiveRouteState(childActiveRoute);
    }
    getManagementPageHeight=()=>{
        return this.Window.height-(StyleSheet.flatten(generalStyles.actionButtonContainer).height+HeaderSize.getHeaderHeight()+20);
        // return 500;
        // return 100;
    };
    renderPage(content)
    {
        return (<View flex={1}>{content}</View>);
    }


}
