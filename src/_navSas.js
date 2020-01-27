import AccessManager from "./classes/AccessManager";
let FinalItems=[];
let Items=[
        {
            name: 'ورود به سامانه',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/login',
            access:!AccessManager.UserIsLoggedIn()
        },
        {

            name: 'تعریف بخش ها',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/sas/units',
            access:AccessManager.UserCan('sas','unit',AccessManager.LIST)
        },
    {

        name: 'تعریف توالی بخش ها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/unitsequences',
        access:AccessManager.UserCan('sas','unitsequence',AccessManager.LIST)
    },
        {

            name: 'تعریف انواع تجهیزات',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/sas/devicetypes',
            access:AccessManager.UserCan('sas','devicetype',AccessManager.LIST)
        },
    {

        name: 'تعریف تجهیزات',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/devices',
        access:AccessManager.UserCan('sas','device',AccessManager.LIST)
    },
    {

        name: 'مشاهده تجهیزات',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/devices/all',
        access:AccessManager.UserCan('sas','device',"listall")
    },
        {

            name: 'تعریف انواع درخواست',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/sas/requesttypes',
            access:AccessManager.UserCan('sas','requesttype',AccessManager.LIST)
        },
        {

            name: 'ارسال درخواست',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/sas/requests/management',
            access:AccessManager.UserCan('sas','request',AccessManager.INSERT)
        },
    {

        name: 'صندوق ارسال',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/outbox',
        access:AccessManager.UserCan('sas','request',AccessManager.INSERT)
    },
    {

        name: 'صندوق ارجاعات',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/inbox',
        access:AccessManager.UserCan('sas','request',"inbox")
    },
    {

        name: 'فهرست درخواست ها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/requests',
        access:AccessManager.UserCan('sas','request',"list")
    },
    {

        name: 'صندوق دریافت',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/current',
        access:AccessManager.UserCan('sas','request',"inbox")
    },
    {

        name: 'صندوق منتظر تایید',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/sas/approve',
        access:AccessManager.UserCan('sas','request',"approve")
    },
        // {
        //
        //     name: 'ثبت مطالب آموزشی',
        //     icon: 'icon-list',
        //     badge: {
        //         variant: 'info',
        //     },
        //     url: '/posts/posts',
        //     access:AccessManager.UserCan('posts','post',AccessManager.LIST)
        // },
    {
        name: 'تغییر رمز',
        url: '/changepass',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
        },
        access:true

    },
        {
            name: 'خروج',
            url: '/login',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
            },
            access:true

        },
    ];
for(let i=0;i<Items.length;i++)
{
    if(Items[i].access==true)
        FinalItems.push(Items[i]);
}
export default {
  items: FinalItems
};
