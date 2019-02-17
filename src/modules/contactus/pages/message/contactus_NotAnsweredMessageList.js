// @flow
import * as React from 'react';
import contactus_messageList from "./contactus_messageList";

class contactus_NotAnsweredMessageList extends contactus_messageList {
    getAnsweredState()
    {
        return 0;
    }
}

export default contactus_NotAnsweredMessageList;
