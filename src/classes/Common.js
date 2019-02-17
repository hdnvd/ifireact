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
    static convertNullKeysToEmpty(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={}
        while (n--) {
            key = keys[n];
            let content=obj[key];
            if(content==null || content=="null" || (content.length>0 && content.trim()=='null'))
                newobj[key] = '';
            else
                newobj[key] = content;
        }
        return newobj;
    }
    static getObjectCopy(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={}
        while (n--) {
            key = keys[n];
            newobj[key]=obj[key];
        }
        return newobj;
    }
}

export default Common;
