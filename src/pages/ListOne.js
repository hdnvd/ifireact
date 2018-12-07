// @flow

import * as React from "react";
import ReactTable from 'react-table'
import { Link,HashRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import 'react-table/react-table.css'
import { Button } from 'react-bootstrap';
class ListOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name:'hdai',
                }
            ],
            columns : [],
        };
        fetch('http://77.104.83.68:813/api/user')
            .then(response => response.json())
            .then(data => {
                let FirstRow=data[0];
                let ColumnNames=Object.getOwnPropertyNames(FirstRow);
                console.log();
                let cmns=ColumnNames.map(a=> {
                        let rObj = {};
                        rObj['Header'] = a;
                        rObj['accessor'] = a;
                        return rObj;
                    }
                );
                let EditObj = {};
                EditObj['Header'] = "عملیات";
                EditObj['accessor'] = "edit";
                EditObj['show'] = true;
                EditObj['Cell'] = props => <div>
                    <button className='number' onClick={()=>alert("این بخش هنوز تکمیل نشده است")}>حذف</button>
                    <button className='number'><Link to={"/editper"}>ویرایش</Link></button>
                    <button className='number' onClick={()=>alert("این بخش هنوز تکمیل نشده است")}>مشاهده</button>
                </div>;
                cmns.push(EditObj);
                this.setState({ data:data,columns:cmns })
            });
    }
    render(){
        return <ReactTable
            previousText={'ضفحه قبل'}
            nextText={'صفحه بعد'}
            noDataText={'هیچ داده ای وجود ندارد'}
            pageText={'صفحه'}
            ofText={'از'}
            rowsText={'سطر'}
            pageJumpText={'برو به صفحه'}
            rowsSelectorText={'سطر در صفحه'}
            filterable={true}
            data={this.state.data}
            columns={this.state.columns}
        />;
    }
}

export default ListOne;
