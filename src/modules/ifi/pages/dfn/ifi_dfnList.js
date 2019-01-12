// @flow
import * as React from 'react';
import {Link} from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';
import {IoMdEye, IoMdAddCircle} from 'react-icons/io';
import {MdDeleteForever} from 'react-icons/md';
import SweetTable from '../../../../classes/sweet-table'
import moment from 'moment-jalaali'
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import SweetAlert from "../../../../classes/SweetAlert";
import Constants from "../../../../classes/Constants";
import AccessManager from "../../../../classes/AccessManager";

class ifi_dfnList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData:[],
            // [{ title: 'src/', children: [] },{ title: 'src/', children: [{ title: 'index.js' }] },{ title: 'src/', children: [{ title: 'index.js' }] },{ title: 'src/', children: [{ title: 'index.js' }] }],

            data: [],
            subdata: [],
            pages: 1,
            canEdit:AccessManager.UserCan('cmn_dfn',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('cmn_dfn',AccessManager.DELETE),
        };
    };

    componentDidMount() {
         this.LoadData(-1, 25, 1, null, null);
    }
    GetData(pid) {
                let treeData=[];
                console.log(pid);
                let dt=this.state.data[pid];
                for (let i = 0;dt!=null &&  i < dt.length; i++) {
                    treeData[i]={};
                    treeData[i].title=dt[i].name;
                    treeData[i].title=<div className={'treerow'}>
                        <label>{dt[i].name}</label>
                        {!this.state.canEdit &&
                        <Link className={'viewlink'}  to={'/ifi/dfns/management/'+dt[i].id}><IoMdEye/></Link>
                        }
                        {this.state.canEdit &&
                        <Link className={'editlink'}  to={'/ifi/dfns/management/'+dt[i].id}><FaEdit/></Link>
                        }
                        {this.state.canDelete &&
                        <MdDeleteForever onClick={
                            () => {
                                SweetAlert.displayDeleteAlert(() => {
                                    new SweetFetcher().Fetch('/dfn/' + dt[i].id, SweetFetcher.METHOD_DELETE, null,
                                        data => {
                                            this.LoadData(Constants.DefaultPageSize, this.state.page + 1, null, null);
                                        },
                                        'cmn.dfn', AccessManager.DELETE, this.props.history);
                                });
                            }
                        }/>
                        }
                    </div>;
                    treeData[i].children=this.GetData(dt[i].id);
                    if(treeData[i].children==null) treeData[i].children=[];
                }
                return treeData;
    };
    LoadData(pid, pageSize, page, sorted, filtered) {
        new SweetFetcher().Fetch('/dfn', SweetFetcher.METHOD_GET, null,
            data => {
                let AllData=data.Data;
                let AllAssociatedData=[];
                for(let i=0;i<AllData.length;i++)
                {
                    let item=AllData[i];
                    console.log(item);
                    if(item.pid==null)
                        item.pid=-1;
                    if(!AllAssociatedData.hasOwnProperty(item.pid))
                        AllAssociatedData[item.pid]=[];
                    AllAssociatedData[item.pid].push(item);
                }
                this.setState({data:AllAssociatedData});
                let Tree=this.GetData(-1,pageSize,page,sorted,filtered);
                this.setState({treeData:Tree});

            },'dfn','view',
            this.props.history);
        // console.log(data);
        // this.setState({treeData:data});
    };

    render() {
        return <div className={'pagecontent'}>
            <div className={'topoperationsrow'}><Link className={'addlink'}  to={'/ifi/dfns/management'}><IoMdAddCircle/></Link></div>
            <div className={'tree'} style={{height:800}}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    theme={FileExplorerTheme}
                    canDrag={false}
                />
            </div>

        </div>;
    }


}

export default ifi_dfnList;