// @flow
import * as React from 'react';
import sas_requestList from "./sas_requestList";

class sas_approve extends sas_requestList {
    getboxtype()
    {
        return sas_requestList.BOXTYPE_NEEDTOAPPROVE;
    }
}

export default sas_approve;
