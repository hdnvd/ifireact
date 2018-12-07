// @flow

import * as React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
class EditOne extends React.Component {
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
                        return <label>
                            {a}
                            <input type="text" name={a} />
                        </label>;
                    }
                );

                this.setState({ data:data,fields:cmns })
            });
    }
    render(){
        return <form>
            {this.state.fields}
            <input type="submit" value="ذخیره" />
        </form>;
    }
}

export default EditOne;
