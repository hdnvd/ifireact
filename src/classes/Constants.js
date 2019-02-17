// @flow

import * as React from "react";
import ReactTable from 'react-table'
import {Grid,Row,Col,Button} from 'react-bootstrap'
import 'react-table/react-table.css'


class Constants {
    static SERVERMODE_LARAVEL=1;
    static SERVERMODE_ASP=2;
    static DefaultPageSize=25;
    // static SiteURL="http://77.104.83.68:813";
    static SiteURL="http://laravel.test";
    // static SiteURL="http://contact.sweetsoft.ir";
    // static ServerMode=Constants.SERVERMODE_ASP;
    static ServerMode=Constants.SERVERMODE_LARAVEL;

}

export default Constants;
