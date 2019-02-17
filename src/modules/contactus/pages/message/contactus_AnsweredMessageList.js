// @flow
import * as React from 'react';
import contactus_messageList from "./contactus_messageList";

class contactus_AnsweredMessageList extends contactus_messageList {
    getAnsweredState()
    {
        console.log("HIIII","HAdi");
        return 1;
    }
}

export default contactus_AnsweredMessageList;
