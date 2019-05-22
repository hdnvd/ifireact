// @flow
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Cookies from 'universal-cookie';
import Constants from "./Constants";

class AccessManager{
    static LIST='list';
    static VIEW='view';
    static EDIT='edit';
    static INSERT='insert';
    static DELETE='delete';
    static UserCan(ModuleName,TableName,Action)
    {
        if(Constants.ServerMode===Constants.SERVERMODE_LARAVEL) {
            let cookies = new Cookies();
            console.log(access);
            ModuleName=ModuleName.toLowerCase();
            TableName=TableName.toLowerCase();
            Action=Action.toLowerCase();
            let ActionString=ModuleName+'.'+TableName + "."+Action;
            let access=cookies.get('access.'+ActionString);
            // let hasAccess=false;

            console.log('Checking Access List '+ActionString);
            // console.log(access.length);
            // console.log(Object.keys(access));
            return access!=null;
            // let keys=Object.keys(access);
            // for(let i=0; keys!==null && i<keys.length;i++)
            // {
            //     console.log(access[keys[i]].name.toLowerCase().trim());
            //     let Access=(access[keys[i]].name.toLowerCase().trim()===ActionString);
            //     if(Access)
            //     {
            //         hasAccess=true;
            //         break;
            //     }
            // }
            // return hasAccess;
        }
        else
        {
            if(Action===AccessManager.LIST)
                Action=AccessManager.VIEW;
            let cookies = new Cookies();
            let access=cookies.get('access');
            console.log(access);
            let ActionString=TableName + "."+Action;
            let hasAccess=(access.hasOwnProperty(ActionString) && access[ActionString].toString()==="1");
            return hasAccess;
        }

    }
    static getUserRoles()
    {
        let cookies = new Cookies();
        let roles= cookies.get('userroles');
        return roles==null?[]:roles;
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
