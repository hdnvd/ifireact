// @flow
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Cookies from 'universal-cookie';

class AccessManager{
    static VIEW='view';
    static EDIT='edit';
    static INSERT='insert';
    static DELETE='delete';
    static UserCan(TableName,Action)
    {
        let cookies = new Cookies();
        let access=cookies.get('access');
        console.log(access);
        let ActionString=TableName + "."+Action;
        let hasAccess=(access.hasOwnProperty(ActionString) && access[ActionString]==1);
        return hasAccess;
    }
    static UserIsLoggedIn()
    {
        let cookies = new Cookies();
        let sessionKey= cookies.get('sessionkey');
        if(sessionKey==null || sessionKey=="")
            return false;
        return true;
    }
    static getUserDisplayName()
    {
        let cookies = new Cookies();
        let userdisplayname= cookies.get('userdisplayname');
        if(userdisplayname==null)
            userdisplayname="کاربر مهمان";
        return userdisplayname;
    }
    static getUserLoginTime()
    {
        let cookies = new Cookies();
        let userlogintime= cookies.get('userlogintime');
        if(userlogintime==null)
            userlogintime="";
        return userlogintime;
    }
}

export default AccessManager;
