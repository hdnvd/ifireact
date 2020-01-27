import React, {Component} from 'react';
import {BackHandler, Dimensions, FlatList, StyleSheet} from 'react-native';
import {NavigationState} from 'react-navigation'
import generalStyles from '../../styles/generalStyles';
import HeaderSize from '../../classes/HeaderSize';
import SweetPage from './SweetPage';
import VillaListController from '../../modules/trapp/controllers/villaListController';
import ListTopBar from './ListTopBar';

export default class SweetListPage extends SweetPage {
    state =
        {
            ...super.state,
            nextStartRow: 0,
            SearchText: '',
            SearchFields: null,
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
            sortField:'id',
        };
    setBackHandler() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.setState({SearchText: '', SearchFields: null}, () => {
                this._loadData(true, true);
            });
            return true;
        });
    }
    _loadData = (isRefreshing, forceHideSearchPage) => {
        throw new Error("SweetError: Please Implement LoadData in the ListPage")
    };
    _getFlatList(data,renderItem)
    {
        return <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            onEndReached={() => this._loadData(false, false)}
            onRefresh={() => this._loadData(true, false)}
            refreshing={this.state.isRefreshing}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.3}
            renderItem={renderItem}
            />
    }
    _getTopBar(sortFields)
    {
        return <ListTopBar sortFields={sortFields}
                           onSortFieldSelect={(optionKey) => {
                               this.setState({sortField: optionKey}, () => {
                                   this._loadData(true, false);
                               });
                           }} onSearchClick={() => {
            this.setState({displaySearchPage: true});
            this.setBackHandler();
        }
        }
                           displaySearchTitleBar={this.state.SearchFields != null}
                           onCancelSearch={this._onCancelSearch}
        />
    }
    _onCancelSearch=() => {
        this.setState({
            displaySearchPage: false,
            SearchText: '',
            SearchFields: null,
        }, () => {
            this._loadData(true, false);
        });
    }

}
