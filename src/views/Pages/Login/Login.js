import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../../logo.png'
import Cookies from 'universal-cookie';

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: '',
        };

    }

    render() {
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
                                                }} autoComplete="username"/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="کلمه عبور" onChange={(e) => {
                                                    this.setState({'password': e.target.value})
                                                }} autoComplete="current-password"/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" onClick={() => {
                                                        const data = new URLSearchParams();
                                                        data.append('name', this.state.username);
                                                        data.append('password', this.state.password);
                                                        data.append('forceLogin', true);
                                                        data.append('appName', 'Panel');
                                                        new SweetFetcher().Fetch('/USERs/login', 'post', data, data => {
                                                            console.log(data);
                                                            let cookies = new Cookies();
                                                            cookies.set(data);
                                                            cookies.set('sessionkey', data.Data.sessionkey);
                                                            if (data.Data.sessionkey.length > 2)
                                                                this.props.history.push('/ifi/dfns');
                                                            else
                                                                alert("اطلاعات کاربری صحیح نمی باشد.");

                                                        },this.props.history);
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
                                            <h2>سامانه حق الزحمه</h2>
                                            <p>ویرایش 97/09</p>
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
