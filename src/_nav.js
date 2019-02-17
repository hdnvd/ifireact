import AccessManager from "./classes/AccessManager";
let Items=[
        {
            name: 'ارسال پیام',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/contactus/messages/Send',
        },
    {
        name: 'پیگیری گزارشات',
        icon: 'icon-list',
        badge: {
            variant: 'info',
        },
        url: '/contactus/messages/find',
    },
    // {
    //     name: 'ورود مدیران',
    //     icon: 'icon-list',
    //     badge: {
    //         variant: 'info',
    //     },
    //     url: '/login',
    // },
];
if(AccessManager.UserIsLoggedIn())
    Items=[
        {

            name: 'پیام های ورودی',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/contactus/messages/answered',
        },
        {

            name: 'پیام های بایگانی شده',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/contactus/messages/notanswered',
        },
        {

            name: 'تعریف یگان ها',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/contactus/units',
        },
        {

            name: 'تعریف موضوعات',
            icon: 'icon-list',
            badge: {
                variant: 'info',
            },
            url: '/contactus/subjects',
        },
        // {
        //     name: 'برآورد',
        //     url: '/list/Empty',
        //     icon: 'icon-speedometer',
        //     badge: {
        //         variant: 'info',
        //     },
        //     children:[
        //         {
        //             name: 'مجوز قطعی پرداخت',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'ثبت مکانیزه مجوز قطعی پرداخت',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'ثبت سند حسابداری',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //             children:[
        //
        //                 {
        //                     name: 'ثبت سند موقت',
        //                     url: '/list/Empty',
        //                     icon: 'icon-speedometer',
        //                     badge: {
        //                         variant: 'info',
        //                     },
        //
        //                 },
        //
        //                 {
        //                     name: 'ثبت سند مالی',
        //                     url: '/list/Empty',
        //                     icon: 'icon-speedometer',
        //                     badge: {
        //                         variant: 'info',
        //                     },
        //
        //                 },
        //             ],
        //         },
        //         {
        //             name: 'مشاهده تاریخ برآورد',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'تغییر تاریخ مجوز قطعی',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'ثبت سند پیش نویس',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست مجوز قطعی پرداخت',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'علی الحساب برنامه ای',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'پیش پرداخت پیمانی',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'سابقه دریافت برآوردی',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'کاردکی برآورد پرسنل',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'کاردکی سالانه پرسنل',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //     ],
        // },
        // {
        //     name: 'گزارشات',
        //     url: '/list/Empty',
        //     icon: 'icon-speedometer',
        //     badge: {
        //         variant: 'info',
        //     },
        //     children:[
        //         {
        //             name: 'لیست ارسال بانک',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'تهیه دیسکت ارسالی',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'فیش پرسنل برنامه ای',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'انتقال اطلاعات فیش',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست پرسنل',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست اطلاعات پایه',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست وام صندوق رفاه',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست ارسال امور اداری',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست حسابداری کل',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست وام های مکسوره',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست سایر کسور',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'جستجوی مبلغ خالص',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'گزارشات آماری برآورد',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'لیست مالیات برآورد',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //
        //     ],
        // },
        // {
        //     name: 'امکانات',
        //     url: '/list/Empty',
        //     icon: 'icon-speedometer',
        //     badge: {
        //         variant: 'info',
        //     },
        //     children:[
        //         {
        //             name: 'مشاهده گزارش',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'معرفی کاربران',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'تغییر رمز کاربران',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'تغییر سال مالی',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'ایجاد سال مالی',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'تهیه فایل پشتیبان',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'بازیابی اطلاعات',
        //             url: '/list/Empty',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //     ],
        // },
        //
        // {
        //     name: 'اطلاعات جداول اولیه',
        //     icon: 'icon-list',
        //     badge: {
        //         variant: 'info',
        //     },
        //     children:[
        //         {
        //             name: 'ABH',
        //             url: '/list/ABH',
        //             icon: 'icon-list',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'ABH2',
        //             url: '/list/ABH2',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'B28TOKOL',
        //             url: '/list/B28TOKOL',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'BAR(براورد)',
        //             url: '/list/BAR',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'BAX',
        //             url: '/list/BAX',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'BHA',
        //             url: '/list/BHA',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'BTMP',
        //             url: '/list/BTMP',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'EXP',
        //             url: '/list/EXP',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'EXPNEW',
        //             url: '/list/EXPNEW',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'FIX',
        //             url: '/list/FIX',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'MAR(مرکز هزینه)',
        //             url: '/list/MAR',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'MBAN',
        //             url: '/list/MBAN',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'PER(پرسنل)',
        //             url: '/list/PER',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'PREP',
        //             url: '/list/PREP',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'PSANAD',
        //             url: '/list/PSANAD',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'PTMP',
        //             url: '/list/PTMP',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'SANAD',
        //             url: '/list/SANAD',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'SAR',
        //             url: '/list/SAR',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'USER',
        //             url: '/list/USER',
        //             icon: 'icon-user-female',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //         {
        //             name: 'VAM',
        //             url: '/list/VAM',
        //             icon: 'icon-speedometer',
        //             badge: {
        //                 variant: 'info',
        //             },
        //         },
        //     ],
        // },
        {
            name: 'خروج',
            url: '/login',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
            },

        },

        // {
        //     name: 'Dashboard',
        //     url: '/dashboard',
        //     icon: 'icon-speedometer',
        //     badge: {
        //         variant: 'info',
        //         text: 'NEW',
        //     },
        // },
        // {
        //   title: true,
        //   name: 'Theme',
        //   wrapper: {            // optional wrapper object
        //     element: '',        // required valid HTML5 element tag
        //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        //   },
        //   class: ''             // optional class names space delimited list for title item ex: "text-center"
        // },
        // {
        //   name: 'Colors',
        //   url: '/theme/colors',
        //   icon: 'icon-drop',
        // },
        // {
        //   name: 'Typography',
        //   url: '/theme/typography',
        //   icon: 'icon-pencil',
        // },
        // {
        //   title: true,
        //   name: 'Components',
        //   wrapper: {
        //     element: '',
        //     attributes: {},
        //   },
        // },
        // {
        //   name: 'Base',
        //   url: '/base',
        //   icon: 'icon-puzzle',
        //   children: [
        //     {
        //       name: 'Breadcrumbs',
        //       url: '/base/breadcrumbs',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Cards',
        //       url: '/base/cards',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Carousels',
        //       url: '/base/carousels',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Collapses',
        //       url: '/base/collapses',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Dropdowns',
        //       url: '/base/dropdowns',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Forms',
        //       url: '/base/forms',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Jumbotrons',
        //       url: '/base/jumbotrons',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'List groups',
        //       url: '/base/list-groups',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Navs',
        //       url: '/base/navs',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Paginations',
        //       url: '/base/paginations',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Popovers',
        //       url: '/base/popovers',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Progress Bar',
        //       url: '/base/progress-bar',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Switches',
        //       url: '/base/switches',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Tables',
        //       url: '/base/tables',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Tabs',
        //       url: '/base/tabs',
        //       icon: 'icon-puzzle',
        //     },
        //     {
        //       name: 'Tooltips',
        //       url: '/base/tooltips',
        //       icon: 'icon-puzzle',
        //     },
        //   ],
        // },
        // {
        //   name: 'Buttons',
        //   url: '/buttons',
        //   icon: 'icon-cursor',
        //   children: [
        //     {
        //       name: 'Buttons',
        //       url: '/buttons/buttons',
        //       icon: 'icon-cursor',
        //     },
        //     {
        //       name: 'Button dropdowns',
        //       url: '/buttons/button-dropdowns',
        //       icon: 'icon-cursor',
        //     },
        //     {
        //       name: 'Button groups',
        //       url: '/buttons/button-groups',
        //       icon: 'icon-cursor',
        //     },
        //     {
        //       name: 'Brand Buttons',
        //       url: '/buttons/brand-buttons',
        //       icon: 'icon-cursor',
        //     },
        //   ],
        // },
        // {
        //   name: 'Charts',
        //   url: '/charts',
        //   icon: 'icon-pie-chart',
        // },
        // {
        //   name: 'Icons',
        //   url: '/icons',
        //   icon: 'icon-star',
        //   children: [
        //     {
        //       name: 'CoreUI Icons',
        //       url: '/icons/coreui-icons',
        //       icon: 'icon-star',
        //       badge: {
        //         variant: 'info',
        //         text: 'NEW',
        //       },
        //     },
        //     {
        //       name: 'Flags',
        //       url: '/icons/flags',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Font Awesome',
        //       url: '/icons/font-awesome',
        //       icon: 'icon-star',
        //       badge: {
        //         variant: 'secondary',
        //         text: '4.7',
        //       },
        //     },
        //     {
        //       name: 'Simple Line Icons',
        //       url: '/icons/simple-line-icons',
        //       icon: 'icon-star',
        //     },
        //   ],
        // },
        // {
        //   name: 'Notifications',
        //   url: '/notifications',
        //   icon: 'icon-bell',
        //   children: [
        //     {
        //       name: 'Alerts',
        //       url: '/notifications/alerts',
        //       icon: 'icon-bell',
        //     },
        //     {
        //       name: 'Badges',
        //       url: '/notifications/badges',
        //       icon: 'icon-bell',
        //     },
        //     {
        //       name: 'Modals',
        //       url: '/notifications/modals',
        //       icon: 'icon-bell',
        //     },
        //   ],
        // },
        // {
        //   name: 'Widgets',
        //   url: '/widgets',
        //   icon: 'icon-calculator',
        //   badge: {
        //     variant: 'info',
        //     text: 'NEW',
        //   },
        // },
        // {
        //   divider: true,
        // },
        // {
        //   title: true,
        //   name: 'Extras',
        // },
        // {
        //   name: 'Pages',
        //   url: '/pages',
        //   icon: 'icon-star',
        //   children: [
        //     {
        //       name: 'Login',
        //       url: '/login',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Register',
        //       url: '/register',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Error 404',
        //       url: '/404',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Error 500',
        //       url: '/500',
        //       icon: 'icon-star',
        //     },
        //   ],
        // },
        // {
        //   name: 'Disabled',
        //   url: '/dashboard',
        //   icon: 'icon-ban',
        //   attributes: { disabled: true },
        // },
        // {
        //   name: 'Download CoreUI',
        //   url: 'https://coreui.io/react/',
        //   icon: 'icon-cloud-download',
        //   class: 'mt-auto',
        //   variant: 'success',
        //   attributes: { target: '_blank', rel: "noopener" },
        // },
        // {
        //   name: 'Try CoreUI PRO',
        //   url: 'https://coreui.io/pro/react/',
        //   icon: 'icon-layers',
        //   variant: 'danger',
        //   attributes: { target: '_blank', rel: "noopener" },
        // },
    ];

export default {
  items: Items
};
