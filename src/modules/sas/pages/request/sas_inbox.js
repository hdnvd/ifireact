// @flow
import * as React from 'react';
import sas_requestList from "./sas_requestList";

class sas_inbox extends sas_requestList {
    getboxtype()
    {
        return sas_requestList.BOXTYPE_INBOX;
    }
}

export default sas_inbox;
