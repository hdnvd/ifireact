import React from 'react';
import Page from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'صفحه اصلی', component: DefaultLayout, },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];
const ifi_dfnList = React.lazy(() => import('./modules/ifi/pages/dfn/ifi_dfnList'));
routes.push({ path: '/ifi/dfns',exact:true, name: 'لیست فیلدها',component:ifi_dfnList});
const ifi_dfnManage = React.lazy(() => import('./modules/ifi/pages/dfn/ifi_dfnManage'));
routes.push({ path: '/ifi/dfns/management/:id',exact:false, name: 'ویرایش فیلد',component:ifi_dfnManage});
routes.push({ path: '/ifi/dfns/management',exact:false, name: 'تغریف فیلدها',component:ifi_dfnManage});


const ifi_personelList = React.lazy(() => import('./modules/ifi/pages/personel/ifi_personelList'));
routes.push({ path: '/ifi/personels',exact:true, name: 'لیست پرسنل',component:ifi_personelList});
const ifi_personelManage = React.lazy(() => import('./modules/ifi/pages/personel/ifi_personelManage'));
routes.push({ path: '/ifi/personels/management/:id',exact:false, name: 'ویرایش پرسنل',component:ifi_personelManage});
routes.push({ path: '/ifi/personels/management',exact:false, name: 'تعریف پرسنل',component:ifi_personelManage});


const contactus_messagereceiverList = React.lazy(() => import('./modules/contactus/pages/messagereceiver/contactus_messagereceiverList'));
routes.push({ path: '/contactus/messagereceivers',exact:true, name: 'لیست messagereceiver',component:contactus_messagereceiverList});
const contactus_messagereceiverManage = React.lazy(() => import('./modules/contactus/pages/messagereceiver/contactus_messagereceiverManage'));
routes.push({ path: '/contactus/messagereceivers/management/:id',exact:false, name: 'ویرایش messagereceiver',component:contactus_messagereceiverManage});
routes.push({ path: '/contactus/messagereceivers/management',exact:false, name: 'تعریف messagereceiver',component:contactus_messagereceiverManage});


const contactus_messageManage = React.lazy(() => import('./modules/contactus/pages/message/contactus_messageManage'));
const contactus_messageView = React.lazy(() => import('./modules/contactus/pages/message/contactus_messageView'));
const contactus_messageSend = React.lazy(() => import('./modules/contactus/pages/message/contactus_messageSend'));
// const contactus_messageFind = React.lazy(() => import('./modules/contactus/pages/message/contactus_messageFind'));
routes.push({ path: '/contactus/messages/management/:id',exact:false, name: 'مدیریت پیام',component:contactus_messageManage});
// routes.push({ path: '/contactus/messages/management',exact:false, name: 'مدیریت پیام',component:contactus_messageManage});
routes.push({ path: '/contactus/messages/find',exact:false, name: 'پیگیری پیام ها',component:contactus_messageView});
routes.push({ path: '/contactus/messages/send',exact:false, name: 'ارسال پیام',component:contactus_messageSend});
// routes.push({ path: '/contactus/messages/Find',exact:false, name: 'پیگیری پیام ها',component:contactus_messageFind});

const contactus_unitList = React.lazy(() => import('./modules/contactus/pages/unit/contactus_unitList'));
routes.push({ path: '/contactus/units',exact:true, name: 'لیست یگان ها',component:contactus_unitList});
const contactus_unitManage = React.lazy(() => import('./modules/contactus/pages/unit/contactus_unitManage'));
const contactus_unitView = React.lazy(() => import('./modules/contactus/pages/unit/contactus_unitView'));
routes.push({ path: '/contactus/units/management/:id',exact:false, name: 'تعریف یگان',component:contactus_unitManage});
routes.push({ path: '/contactus/units/management',exact:false, name: 'تعریف یگان',component:contactus_unitManage});
routes.push({ path: '/contactus/units/view/:id',exact:false, name: 'یگان',component:contactus_unitView});


const contactus_subjectList = React.lazy(() => import('./modules/contactus/pages/subject/contactus_subjectList'));
routes.push({ path: '/contactus/subjects',exact:true, name: 'لیست موضوعات',component:contactus_subjectList});
const contactus_subjectManage = React.lazy(() => import('./modules/contactus/pages/subject/contactus_subjectManage'));
const contactus_subjectView = React.lazy(() => import('./modules/contactus/pages/subject/contactus_subjectView'));
routes.push({ path: '/contactus/subjects/management/:id',exact:false, name: 'ویرایش موضوعات',component:contactus_subjectManage});
routes.push({ path: '/contactus/subjects/management',exact:false, name: 'تعریف موضوعات',component:contactus_subjectManage});
routes.push({ path: '/contactus/subjects/view/:id',exact:false, name: 'موضوع',component:contactus_subjectView});

const contactus_AnsweredMessageList = React.lazy(() => import('./modules/contactus/pages/message/contactus_AnsweredMessageList'));
const contactus_NotAnsweredMessageList = React.lazy(() => import('./modules/contactus/pages/message/contactus_NotAnsweredMessageList'));
routes.push({ path: '/contactus/messages/answered',exact:false, name: 'پیام های ورودی',component:contactus_AnsweredMessageList});
routes.push({ path: '/contactus/messages/notanswered',exact:false, name: 'پیام های بایگانی شده',component:contactus_NotAnsweredMessageList});

const posts_postList = React.lazy(() => import('./modules/posts/pages/post/posts_postList'));
routes.push({ path: '/posts/posts',exact:true, name: 'لیست مطلب',component:posts_postList});
const posts_postManage = React.lazy(() => import('./modules/posts/pages/post/posts_postManage'));
const posts_postView = React.lazy(() => import('./modules/posts/pages/post/posts_postView'));
routes.push({ path: '/posts/posts/management/:id',exact:false, name: 'ویرایش مطلب',component:posts_postManage});
routes.push({ path: '/posts/posts/management',exact:false, name: 'تعریف مطلب',component:posts_postManage});
routes.push({ path: '/posts/posts/view/:id',exact:false, name: 'مطلب',component:posts_postView});





//******************************************/
const sas_unitList = React.lazy(() => import('./modules/sas/pages/unit/sas_unitList'));
routes.push({ path: '/sas/units',exact:true, name: 'لیست بخش',component:sas_unitList});
const sas_unitManage = React.lazy(() => import('./modules/sas/pages/unit/sas_unitManage'));
const sas_unitView = React.lazy(() => import('./modules/sas/pages/unit/sas_unitView'));
routes.push({ path: '/sas/units/management/:id',exact:false, name: 'ویرایش بخش',component:sas_unitManage});
routes.push({ path: '/sas/units/management',exact:false, name: 'تعریف بخش',component:sas_unitManage});
routes.push({ path: '/sas/units/view/:id',exact:false, name: 'بخش',component:sas_unitView});


const sas_requestList = React.lazy(() => import('./modules/sas/pages/request/sas_requestList'));
const sas_inbox = React.lazy(() => import('./modules/sas/pages/request/sas_inbox'));
const sas_outbox = React.lazy(() => import('./modules/sas/pages/request/sas_outbox'));
const sas_currentbox = React.lazy(() => import('./modules/sas/pages/request/sas_currentbox'));
const sas_approve = React.lazy(() => import('./modules/sas/pages/request/sas_approve'));
routes.push({ path: '/sas/requests',exact:true, name: 'لیست درخواست',component:sas_requestList});
routes.push({ path: '/sas/inbox',exact:true, name: 'پیام های دریافتی',component:sas_inbox});
routes.push({ path: '/sas/outbox',exact:true, name: 'پیام های ارسال شده',component:sas_outbox});
routes.push({ path: '/sas/current',exact:true, name: 'پیام های موجود',component:sas_currentbox});
routes.push({ path: '/sas/approve',exact:true, name: 'پیام های منتظر تایید',component:sas_approve});
const sas_requestManage = React.lazy(() => import('./modules/sas/pages/request/sas_requestManage'));
const sas_requestView = React.lazy(() => import('./modules/sas/pages/request/sas_requestView'));
routes.push({ path: '/sas/requests/management/:id',exact:false, name: 'ویرایش درخواست',component:sas_requestManage});
routes.push({ path: '/sas/requests/management',exact:false, name: 'تعریف درخواست',component:sas_requestManage});
routes.push({ path: '/sas/requests/view/:id',exact:false, name: 'درخواست',component:sas_requestView});



const sas_deviceList = React.lazy(() => import('./modules/sas/pages/device/sas_deviceList'));
routes.push({ path: '/sas/devices',exact:true, name: 'لیست تجهیز',component:sas_deviceList});
const sas_deviceManage = React.lazy(() => import('./modules/sas/pages/device/sas_deviceManage'));
const sas_deviceView = React.lazy(() => import('./modules/sas/pages/device/sas_deviceView'));
routes.push({ path: '/sas/devices/management/:id',exact:false, name: 'ویرایش تجهیز',component:sas_deviceManage});
routes.push({ path: '/sas/devices/management',exact:false, name: 'تعریف تجهیز',component:sas_deviceManage});
routes.push({ path: '/sas/devices/view/:id',exact:false, name: 'تجهیز',component:sas_deviceView});


const sas_devicetypeList = React.lazy(() => import('./modules/sas/pages/devicetype/sas_devicetypeList'));
routes.push({ path: '/sas/devicetypes',exact:true, name: 'لیست نوع سخت افزار',component:sas_devicetypeList});
const sas_devicetypeManage = React.lazy(() => import('./modules/sas/pages/devicetype/sas_devicetypeManage'));
const sas_devicetypeView = React.lazy(() => import('./modules/sas/pages/devicetype/sas_devicetypeView'));
routes.push({ path: '/sas/devicetypes/management/:id',exact:false, name: 'ویرایش نوع سخت افزار',component:sas_devicetypeManage});
routes.push({ path: '/sas/devicetypes/management',exact:false, name: 'تعریف نوع سخت افزار',component:sas_devicetypeManage});
routes.push({ path: '/sas/devicetypes/view/:id',exact:false, name: 'نوع سخت افزار',component:sas_devicetypeView});


const sas_unitsequenceList = React.lazy(() => import('./modules/sas/pages/unitsequence/sas_unitsequenceList'));
routes.push({ path: '/sas/unitsequences',exact:true, name: 'لیست unitsequence',component:sas_unitsequenceList});
const sas_unitsequenceManage = React.lazy(() => import('./modules/sas/pages/unitsequence/sas_unitsequenceManage'));
const sas_unitsequenceView = React.lazy(() => import('./modules/sas/pages/unitsequence/sas_unitsequenceView'));
routes.push({ path: '/sas/unitsequences/management/:id',exact:false, name: 'ویرایش unitsequence',component:sas_unitsequenceManage});
routes.push({ path: '/sas/unitsequences/management',exact:false, name: 'تعریف unitsequence',component:sas_unitsequenceManage});
routes.push({ path: '/sas/unitsequences/view/:id',exact:false, name: 'unitsequence',component:sas_unitsequenceView});


const sas_statusList = React.lazy(() => import('./modules/sas/pages/status/sas_statusList'));
routes.push({ path: '/sas/statuss',exact:true, name: 'لیست وضعیت',component:sas_statusList});
const sas_statusManage = React.lazy(() => import('./modules/sas/pages/status/sas_statusManage'));
const sas_statusView = React.lazy(() => import('./modules/sas/pages/status/sas_statusView'));
routes.push({ path: '/sas/statuss/management/:id',exact:false, name: 'ویرایش وضعیت',component:sas_statusManage});
routes.push({ path: '/sas/statuss/management',exact:false, name: 'تعریف وضعیت',component:sas_statusManage});
routes.push({ path: '/sas/statuss/view/:id',exact:false, name: 'وضعیت',component:sas_statusView});


const sas_requeststatustrackList = React.lazy(() => import('./modules/sas/pages/requeststatustrack/sas_requeststatustrackList'));
routes.push({ path: '/sas/requeststatustracks',exact:true, name: 'لیست requeststatustrack',component:sas_requeststatustrackList});
const sas_requeststatustrackManage = React.lazy(() => import('./modules/sas/pages/requeststatustrack/sas_requeststatustrackManage'));
const sas_requeststatustrackView = React.lazy(() => import('./modules/sas/pages/requeststatustrack/sas_requeststatustrackView'));
routes.push({ path: '/sas/requeststatustracks/management/:id',exact:false, name: 'ویرایش requeststatustrack',component:sas_requeststatustrackManage});
routes.push({ path: '/sas/requeststatustracks/management',exact:false, name: 'تعریف requeststatustrack',component:sas_requeststatustrackManage});
routes.push({ path: '/sas/requeststatustracks/view/:id',exact:false, name: 'requeststatustrack',component:sas_requeststatustrackView});


const sas_requestunittrackList = React.lazy(() => import('./modules/sas/pages/requestunittrack/sas_requestunittrackList'));
routes.push({ path: '/sas/requestunittracks',exact:true, name: 'لیست requestunittrack',component:sas_requestunittrackList});
const sas_requestunittrackManage = React.lazy(() => import('./modules/sas/pages/requestunittrack/sas_requestunittrackManage'));
const sas_requestunittrackView = React.lazy(() => import('./modules/sas/pages/requestunittrack/sas_requestunittrackView'));
routes.push({ path: '/sas/requestunittracks/management/:id',exact:false, name: 'ویرایش requestunittrack',component:sas_requestunittrackManage});
routes.push({ path: '/sas/requestunittracks/management',exact:false, name: 'تعریف requestunittrack',component:sas_requestunittrackManage});
routes.push({ path: '/sas/requestunittracks/view/:id',exact:false, name: 'requestunittrack',component:sas_requestunittrackView});


const sas_requesttypeList = React.lazy(() => import('./modules/sas/pages/requesttype/sas_requesttypeList'));
routes.push({ path: '/sas/requesttypes',exact:true, name: 'لیست نوع درخواست',component:sas_requesttypeList});
const sas_requesttypeManage = React.lazy(() => import('./modules/sas/pages/requesttype/sas_requesttypeManage'));
const sas_requesttypeView = React.lazy(() => import('./modules/sas/pages/requesttype/sas_requesttypeView'));
routes.push({ path: '/sas/requesttypes/management/:id',exact:false, name: 'ویرایش نوع درخواست',component:sas_requesttypeManage});
routes.push({ path: '/sas/requesttypes/management',exact:false, name: 'تعریف نوع درخواست',component:sas_requesttypeManage});
routes.push({ path: '/sas/requesttypes/view/:id',exact:false, name: 'نوع درخواست',component:sas_requesttypeView});


const sas_requestmessageList = React.lazy(() => import('./modules/sas/pages/requestmessage/sas_requestmessageList'));
routes.push({ path: '/sas/requestmessages',exact:true, name: 'لیست requestmessage',component:sas_requestmessageList});
const sas_requestmessageManage = React.lazy(() => import('./modules/sas/pages/requestmessage/sas_requestmessageManage'));
const sas_requestmessageView = React.lazy(() => import('./modules/sas/pages/requestmessage/sas_requestmessageView'));
routes.push({ path: '/sas/requestmessages/management/:id',exact:false, name: 'ویرایش requestmessage',component:sas_requestmessageManage});
routes.push({ path: '/sas/requestmessages/management',exact:false, name: 'تعریف requestmessage',component:sas_requestmessageManage});
routes.push({ path: '/sas/requestmessages/view/:id',exact:false, name: 'requestmessage',component:sas_requestmessageView});
/**************************************/


const sas_unittypeList = React.lazy(() => import('./modules/sas/pages/unittype/sas_unittypeList'));
const sas_Dashboard = React.lazy(() => import('./modules/sas/pages/request/sas_dashboard'));
routes.push({ path: '/',exact:true, name: 'صفحه اصلی',component:sas_Dashboard});
routes.push({ path: '/sas/unittypes',exact:true, name: 'لیست نوع بخش',component:sas_unittypeList});
const sas_unittypeManage = React.lazy(() => import('./modules/sas/pages/unittype/sas_unittypeManage'));
const sas_unittypeView = React.lazy(() => import('./modules/sas/pages/unittype/sas_unittypeView'));
routes.push({ path: '/sas/unittypes/management/:id',exact:false, name: 'ویرایش نوع بخش',component:sas_unittypeManage});
routes.push({ path: '/sas/unittypes/management',exact:false, name: 'تعریف نوع بخش',component:sas_unittypeManage});
routes.push({ path: '/sas/unittypes/view/:id',exact:false, name: 'نوع بخش',component:sas_unittypeView});
export default routes;
