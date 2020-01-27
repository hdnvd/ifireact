// @flow
import * as React from 'react';
import trapp_villaList from "./trapp_villaList";

export default class trapp_inactiveVillaList extends trapp_villaList {
    constructor(props) {
        super(props);
        this.loadInactives=true;
    };
}
