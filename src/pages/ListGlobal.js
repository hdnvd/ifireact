// @flow

import * as React from "react";
import { Link} from 'react-router-dom';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Translator from "./Translator";
import SweetTable from "../classes/sweet-table";

class ListGlobal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name:'hdai',
                }
            ],
            id: this.props.match.params.id,
            columns : [],
        };
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        this.LoadData(id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            const id = nextProps.match.params.id;
            this.LoadData(id);
        }
    }
    LoadData(id)
    {
        fetch('http://77.104.83.68:813/api/'+id)
            .then(response => response.json())
            .then(data => {
                let FirstRow=data[0];
                let ColumnNames=Object.getOwnPropertyNames(FirstRow);
                console.log();
                let cmns=ColumnNames.map(a=> {
                        let rObj = {};
                        rObj['Header'] = Translator.getCaption(a);
                        rObj['accessor'] = a;
                        return rObj;
                    }
                );
                let EditObj = {};
                EditObj['Header'] = "عملیات";
                EditObj['accessor'] = "edit";
                EditObj['minWidth'] = 200;
                EditObj['show'] = true;
                EditObj['Cell'] = props => <div className={"operationsrow"}>
                    <button className='number' onClick={()=>alert("این بخش هنوز تکمیل نشده است")}>حذف</button>
                   <Link to={"/edit/"+id}>ویرایش</Link>
                    <button className='number' onClick={()=>alert("این بخش هنوز تکمیل نشده است")}>مشاهده</button>
                </div>;
                cmns.push(EditObj);
                this.setState({ data:data,columns:cmns })
            });
    };
    render(){
        return <SweetTable
            getTableProps={() => ({ style: { display: 'block' } })}
            filterable={true}
            className="-striped -highlight"
            defaultPageSize={10}
            data={this.state.data}
            columns={this.state.columns}
        />;
    }
}

export default ListGlobal;
