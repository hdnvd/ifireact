// @flow

import * as React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name:'hdai',
                }
            ],
            fields : [],
        };
    }
    render(){
        return <div>
            <img src={require('../assets/img/brand/logo.png')} />
            <label>به سامانه حق الزحمه خوش آمدید</label>

        </div>;
    }
}

export default HomePage;
