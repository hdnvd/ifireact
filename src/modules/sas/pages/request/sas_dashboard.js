import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import AccessManager from "../../../../classes/AccessManager";
import SweetFetcher from "../../../../classes/sweet-fetcher";

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const bar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const doughnut = {
    labels: [
        'Red',
        'Green',
        'Yellow',
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
        }],
};

const radar = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100],
        },
    ],
};

let pie = {
    labels: [
        'Red',
        'Green',
        'Yellow',
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
        }],
};

const polar = {
    datasets: [
        {
            data: [
                11,
                16,
                7,
                3,
                14,
            ],
            backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#E7E9ED',
                '#36A2EB',
            ],
            label: 'My dataset' // for legend
        }],
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue',
    ],
};

const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false
}

class sas_dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages:1,
            page:0,
            canEdit:AccessManager.UserCan('sas','request',AccessManager.EDIT),
            canDelete:AccessManager.UserCan('sas','request',AccessManager.DELETE),
            displaySearchWindow:false,

            requesttypeOptions:[],
            deviceOptions:[],
            statusOptions:[],
            senderunitOptions:[],
            currentunitOptions:[],
            senderuserOptions:[],
            currentStatuses:{datasets:[{}],labels:[]},
            currentTypes:{datasets:[{}],labels:[]},
            outboxStatuses:{datasets:[{}],labels:[]},
            allStatuses:{datasets:[{}],labels:[]},
            outboxTypes:{datasets:[{}],labels:[]},
            allTypes:{datasets:[{}],labels:[]},
        };

        let DefinedColors=['#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#2fffe1',
            '#eb0005',
            '#00ff1f',
            '#000aff',
            '#8490eb',
            '#fff707',];
        new SweetFetcher().Fetch('/sas/request/inbox?__statusstats=1',SweetFetcher.METHOD_GET,null,
            data=>{
                let Labels=[];
                let Datas=[];
                let Colors=[];
                for(let i=0;i<data.Data.length;i++)
                {
                    let Item=data.Data[i];
                    Labels.push(Item.name);
                    Datas.push(Item.count);
                    Colors.push(DefinedColors[i]);
                }
                let thePie={labels:Labels,datasets:[{data:Datas,backgroundColor:Colors}]};
                this.setState({currentStatuses:thePie});
            },
            null,'sas.request',"list",
            this.props.history);
        new SweetFetcher().Fetch('/sas/request/outbox?__statusstats=1',SweetFetcher.METHOD_GET,null,
            data=>{
                let Labels=[];
                let Datas=[];
                let Colors=[];
                for(let i=0;i<data.Data.length;i++)
                {
                    let Item=data.Data[i];
                    Labels.push(Item.name);
                    Datas.push(Item.count);
                    Colors.push(DefinedColors[i]);
                }
                let thePie={labels:Labels,datasets:[{data:Datas,backgroundColor:Colors}]};
                this.setState({outboxStatuses:thePie});
            },
            null,'sas.request',"list",
            this.props.history);
        new SweetFetcher().Fetch('/sas/request?__statusstats=1',SweetFetcher.METHOD_GET,null,
            data=>{
                let Labels=[];
                let Datas=[];
                let Colors=[];
                for(let i=0;i<data.Data.length;i++)
                {
                    let Item=data.Data[i];
                    Labels.push(Item.name);
                    Datas.push(Item.count);
                    Colors.push(DefinedColors[i]);
                }
                let thePie={labels:Labels,datasets:[{data:Datas,backgroundColor:Colors}]};
                this.setState({allStatuses:thePie});
            },
            null,'sas.request',"list",
            this.props.history);
        new SweetFetcher().Fetch('/sas/request/outbox?__typestats=1',SweetFetcher.METHOD_GET,null,
            data=>{
                let Labels=[];
                let Datas=[];
                let Colors=[];
                for(let i=0;i<data.Data.length;i++)
                {
                    let Item=data.Data[i];
                    Labels.push(Item.name);
                    Datas.push(Item.count);
                    Colors.push(DefinedColors[i]);
                }
                let thePie={labels:Labels,datasets:[{data:Datas,backgroundColor:Colors}]};
                this.setState({outboxTypes:thePie});
            },
            null,'sas.request',"list",
            this.props.history);
        new SweetFetcher().Fetch('/sas/request/inbox?__typestats=1',SweetFetcher.METHOD_GET,null,
            data=>{
                let Labels=[];
                let Datas=[];
                let Colors=[];
                for(let i=0;i<data.Data.length;i++)
                {
                    let Item=data.Data[i];
                    Labels.push(Item.name);
                    Datas.push(Item.count);
                    Colors.push(DefinedColors[i]);
                }
                let thePie={labels:Labels,datasets:[{data:Datas,backgroundColor:Colors}]};
                this.setState({currentTypes:thePie});
            },
            null,'sas.request',"list",
            this.props.history);
        new SweetFetcher().Fetch('/sas/request?__typestats=1',SweetFetcher.METHOD_GET,null,
            data=>{
                let Labels=[];
                let Datas=[];
                let Colors=[];
                for(let i=0;i<data.Data.length;i++)
                {
                    let Item=data.Data[i];
                    Labels.push(Item.name);
                    Datas.push(Item.count);
                    Colors.push(DefinedColors[i]);
                }
                let thePie={labels:Labels,datasets:[{data:Datas,backgroundColor:Colors}]};
                this.setState({allTypes:thePie});
            },
            null,'sas.request',"list",
            this.props.history);

    };

    render() {
        let theoptions= {
            tooltips: {
                titleFontFamily: 'IRANSANS',
                footerFontFamily: 'IRANSANS',
            },
            legend: {
                labels: {
                    fontFamily: 'IRANSANS'
                }
            }
        };
        return (
            <div className="animated fadeIn">
                <CardColumns className="cols-2">
                    {AccessManager.UserCan('sas','request','inbox') &&
                        <Card>
                            <CardHeader>
                               وضعیت درخواست های دریافتی موجود
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={this.state.currentStatuses} options={theoptions}/>
                                </div>
                            </CardBody>
                        </Card>
                    }
                    {AccessManager.UserCan('sas', 'request', 'inbox') &&
                        <Card>
                            <CardHeader>
                                نوع درخواست های دریافتی موجود
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={this.state.currentTypes} options={theoptions}/>
                                </div>
                            </CardBody>
                        </Card>
                    }
                    {AccessManager.UserCan('sas', 'request', 'outbox') &&
                        <Card>
                            <CardHeader>
                                وضعیت درخواست های ارسالی
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={this.state.outboxStatuses} options={theoptions}/>
                                </div>
                            </CardBody>
                        </Card>
                    }
                    {AccessManager.UserCan('sas', 'request', 'outbox') &&
                        <Card>
                            <CardHeader>
                                نوع درخواست های ارسالی
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={this.state.outboxTypes} options={theoptions}/>
                                </div>
                            </CardBody>
                        </Card>
                    }
                    {AccessManager.UserCan('sas', 'request', AccessManager.LIST) &&
                        <Card>
                            <CardHeader>
                                نوع کل درخواست ها
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={this.state.allTypes} options={theoptions}/>
                                </div>
                            </CardBody>
                        </Card>
                    }
                    {AccessManager.UserCan('sas', 'request', AccessManager.LIST) &&
                        <Card>
                            <CardHeader>
                                وضعیت کل درخواست ها
                            </CardHeader>
                            <CardBody>
                                <div className="chart-wrapper">
                                    <Doughnut data={this.state.allStatuses} options={theoptions}/>
                                </div>
                            </CardBody>
                        </Card>
                    }
                </CardColumns>
            </div>
        );
    }
}

export default sas_dashboard;
