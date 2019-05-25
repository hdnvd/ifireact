// @flow
import * as React from 'react';
import sas_requestList from "./sas_requestList";

class sas_currentbox extends sas_requestList {
    getboxtype()
    {
        return sas_requestList.BOXTYPE_CURRENTBOX;
    }
}

export default sas_currentbox;
