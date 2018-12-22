// @flow
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Common{

    static convertObjectPropertiesToLowerCase(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={}
        while (n--) {
            key = keys[n];
            newobj[key.toLowerCase()] = obj[key];
        }
        return newobj;
    }
}

export default Common;
