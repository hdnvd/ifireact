import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../../logo.png'
import Cookies from 'universal-cookie';
import moment from 'moment-jalaali'

import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import Constants from "../../../classes/Constants";
import SweetFetcher from "../../../classes/sweet-fetcher";
import Common from "../../../classes/Common";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            username: 'admin@trapp.app',
            password: '098887655',
        };
        // let cookies = new Cookies();
        // cookies.set('sessionkey', '');
        // cookies.set('userdisplayname', '');
        // cookies.set('userlogintime', '');
        // cookies.set('access', null);
        // Common.clearAllCookies();

    }

    render() {
        let cookies = new Cookies();
        // alert(cookies.get('redirecting'));
        if(cookies.get('redirecting')==='1')
        {
            // alert('redirecting');
            cookies.set('redirecting','0');
            this.props.history.push('/');
        }
        else
        {

            if(cookies.get('sessionkey')!=null)
                Common.clearAllCookies();
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <h1>ورود به سامانه
                                            </h1>
                                            <p className="text-muted"></p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="نام کاربری" onChange={(e) => {
                                                    this.setState({'username': e.target.value})
                                                }} autoComplete="username"
                                                       value={this.state.username}/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="کلمه عبور" onChange={(e) => {
                                                    this.setState({'password': e.target.value})
                                                }} autoComplete="current-password"
                                                value={this.state.password}/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" onClick={() => {
                                                        const data = new URLSearchParams();
                                                        data.append('name', this.state.username);
                                                        data.append('password', this.state.password);
                                                        data.append('forceLogin', true);
                                                        data.append('appName', 'Panel');
                                                        Common.clearAllCookies();
                                                        new SweetFetcher().Fetch('/users/login', SweetFetcher.METHOD_POST, data, data => {
                                                            console.log(data);
                                                            let cookies = new Cookies();
                                                            // cookies.set(data);
                                                            cookies.set('sessionkey', data.Data.sessionkey,{ path: '/' });
                                                            console.log(cookies.get('sessionkey'));
                                                            cookies.set('userdisplayname', data.Data.displayname,{ path: '/' });
                                                            cookies.set('userroles', data.Data.roles,{ path: '/' });

                                                            cookies.set('userlogintime', moment().locale('fa').format('HH:mm'),{ path: '/' });
                                                            let access=Common.convertObjectPropertiesToLowerCase(data.Data.access);
                                                            // console.log(access);
                                                            let key, keys = Object.keys(access);
                                                            let n = keys.length;
                                                            while (n--) {
                                                                key = keys[n];
                                                                console.log('access.'+access[key].name);
                                                                cookies.set('access.'+access[key].name,true ,{ path: '/' });
                                                            }
                                                            // cookies.set('access',access ,{ path: '/' });
                                                            // console.log(cookies.get('access'));
                                                            if (data.Data.sessionkey.length > 2)
                                                            {
                                                                window.location.reload();
                                                                cookies.set('redirecting', '1',{ path: '/' });

                                                            }
                                                            else
                                                                alert("اطلاعات کاربری صحیح نمی باشد.");

                                                        },null,'users','load',this.props.history);
                                                    }}>ورود</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            {/*<img src={Logo} />*/}
                                            {/*<h2>سامانه ارتباط با کارکنان عقیدتی و سیاسی قرارگاه خاتم الانبیاء</h2>*/}
                                            {/*<h2>سامانه اتوماسیون خدمات فاوایی قرارگاه خاتم الانبیاء</h2>*/}
                                            <h2>سامانه مدیریت Trapp</h2>
                                            <p>ویرایش 98/5</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
