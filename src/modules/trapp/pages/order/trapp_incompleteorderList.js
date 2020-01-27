// @flow
import * as React from 'react';
import trapp_orderList from "./trapp_orderList";
class trapp_incompleteorderList extends trapp_orderList {

    constructor(props) {
        super(props);
        this.orderstatus = 1;
    };
}
export default trapp_incompleteorderList;
