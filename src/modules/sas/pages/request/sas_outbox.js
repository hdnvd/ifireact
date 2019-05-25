// @flow
import * as React from 'react';
import sas_requestList from "./sas_requestList";

class sas_outbox extends sas_requestList {
    getboxtype()
    {
        return sas_requestList.BOXTYPE_OUTBOX;
    }
}

export default sas_outbox;
