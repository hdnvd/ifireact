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

            name: 'ویلاهای منتظر تایید',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/trapp/inactivevillas',
            access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
        },
    {

        name: 'ویلاهای تایید شده',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/villas',
        access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    },
    // {
    //
    //     name: 'موجودی حساب ها',
    //     icon: 'icon-list',
    //     badge: {
    //         variant: 'info',
    //     },
    //     url: '/trapp/villaownerbalances',
    //     access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    // },
    {

        name: 'سفارشات',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/orders',
        access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    },
    {

        name: 'سفارشات ناتمام',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/incompleteorders',
        access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    },


    {

        name: 'نظرات',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/comments/comments',
        access:AccessManager.UserCan('comments','comment',AccessManager.LIST)
    },

    {
        name: 'روزهای تعطیل',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/common/dates',
        access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    },
    // {
    //
    //     name: 'تراکنش ها',
    //     icon: 'icon-list',
    //     badge: {
    //         variant: 'info',
    //     },
    //     url: '/finance/transactions',
    //     access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    // },

    {

        name: 'اطلاعات پایه',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        access:AccessManager.UserIsLoggedIn(),
        children:[{

            name: 'اطلاعات جغرافیایی',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            access:AccessManager.UserIsLoggedIn(),
            children:[
    {

        name: 'استان ها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/placeman/provinces',
        access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    },
    {

        name: 'شهر ها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/placeman/citys',
        access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    },
    {

        name: 'منطقه ها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/placeman/areas',
        access:AccessManager.UserCan('trapp','order',AccessManager.LIST)
    },]},
            {

                name: 'اطلاعات اولیه ویلا',
                icon: 'icon-list',
                badge: {
                    variant: 'info',
                },
                access:AccessManager.UserIsLoggedIn(),
                children:[
    {

        name: 'امکانات ویلاها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/options',
        access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    },
    {

        name: 'انواع ساختمان',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/structuretypes',
        access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    },

    {

        name: 'چشم اندازها',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/viewtypes',
        access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    },
    {

        name: 'انواع بافت',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/areatypes',
        access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    },
    {

        name: 'انواع اقامتگاه',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/trapp/owningtypes',
        access:AccessManager.UserCan('trapp','villa',AccessManager.LIST)
    },
        ]},
        ],

    },

    {
        name: 'تغییر رمز',
        url: '/changepass',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
        },
        access:AccessManager.UserIsLoggedIn(),

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
