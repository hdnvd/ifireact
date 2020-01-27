/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import SFMan from "../../classes/SFMan";

export default class PickerBox extends React.Component {
    titleFieldName='id';
    valueFieldName='id';
    showEmptyTitle=true;
    init(){
        this.titleFieldName=this.props.titleFieldName;
        this.valueFieldName=this.props.valueFieldName;
        if(this.valueFieldName==null)
            this.valueFieldName='id';
        if(this.props.options!=null && this.props.options.length>0) {
            if (this.titleFieldName == null)
                this.titleFieldName = SFMan.getTitleFieldFromObject(this.props.options[0]);
        }
    };

    getItem=(item,itemTitle,itemValue)=>{
        return <option value={itemValue}>{itemTitle}</option>;
    };
    constructor(props) {
        super(props);
    }
    getItemViews()
    {
        this.init();
        let OptionViews=null;
        let Options=this.props.options;
        if(Options!=null && Options.length>0) {
            OptionViews = Options.map(data => {
                return this.getItem(data,data[this.titleFieldName],data[this.valueFieldName]);
            });
        }
        let EmptyItemTitle=this.props.emptyItemTitle;
        if(EmptyItemTitle==null)
            EmptyItemTitle='انتخاب کنید';
        if(this.showEmptyTitle && Options!=null)
        {
            if(OptionViews===null)
                OptionViews=[this.getItem({},EmptyItemTitle,'-1')];
            else
                OptionViews=[this.getItem({},EmptyItemTitle,'-1'),...OptionViews];
        }
        else if(Options==null) {
            OptionViews = [this.getItem({},this.props.title,'-1')];
        }
        return OptionViews;
    }
    render() {
        let OptionViews=this.getItemViews();
        return (
            <div className='form-group'>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <select
                    id={this.props.name}
                    name={this.props.name}
                    className='browser-default custom-select'
                    value={this.props.selectedValue}
                    disabled={this.props.readOnly}
                    onChange={(event)=>{{this.props.onValueChange(event.target.value)}}}>
                    {OptionViews}
                </select>
            </div>);
    }
}

