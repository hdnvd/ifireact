import React from 'react';
import Page from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const EditOne = React.lazy(() => import('./pages/EditOne'));
const EditGlobal = React.lazy(() => import('./pages/EditGlobal'));
const ListOne = React.lazy(() => import('./pages/ListOne'));
const ListGlobal = React.lazy(() => import('./pages/ListGlobal'));
const itsap_servicetypeList = React.lazy(() => import('./modules/itsap/pages/servicetype/itsap_servicetypeList'));
const itsap_servicetypegroupList = React.lazy(() => import('./pages/itsap_servicetypegroupList'));
const itsap_servicetypegroupManage = React.lazy(() => import('./pages/itsap_servicetypegroupManage'));
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
const itsap_servicetypeManage = React.lazy(() => import('./modules/itsap/pages/servicetype/itsap_servicetypeManage'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'صفحه اصلی', component: DefaultLayout, },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/list/:id',exact:false, name: 'لیست اطلاعات',component:ListGlobal},

    { path: '/itsap/servicetypes',exact:true, name: 'لیست اطلاعات',component:itsap_servicetypeList},
    { path: '/itsap/servicetypes/management/:id',exact:false, name: 'مدیریت اطلاعات',component:itsap_servicetypeManage},
    { path: '/itsap/servicetypegroups',exact:true, name: 'لیست اطلاعات',component:itsap_servicetypegroupList},
    { path: '/itsap/servicetypegroups/management/:id',exact:false, name: 'مدیریت اطلاعات',component:itsap_servicetypegroupManage},
  { path: '/edit/:id',exact:false, name: 'ویرایش اطلاعات', component:EditGlobal },
  { path: '/listper',exact:false, name: 'ListPer', component:ListOne },
  { path: '/editper',exact:false, name: 'EditPer', component:EditOne },
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


const ifi_activityList = React.lazy(() => import('./modules/ifi/pages/activity/ifi_activityList'));
routes.push({ path: '/ifi/activitys',exact:true, name: 'لیست اطلاعات',component:ifi_activityList});
const ifi_activityManage = React.lazy(() => import('./modules/ifi/pages/activity/ifi_activityManage'));
routes.push({ path: '/ifi/activitys/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_activityManage});
routes.push({ path: '/ifi/activitys/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_activityManage});


const ifi_bankList = React.lazy(() => import('./modules/ifi/pages/bank/ifi_bankList'));
routes.push({ path: '/ifi/banks',exact:true, name: 'لیست اطلاعات',component:ifi_bankList});
const ifi_bankManage = React.lazy(() => import('./modules/ifi/pages/bank/ifi_bankManage'));
routes.push({ path: '/ifi/banks/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_bankManage});
routes.push({ path: '/ifi/banks/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_bankManage});


const ifi_classList = React.lazy(() => import('./modules/ifi/pages/class/ifi_classList'));
routes.push({ path: '/ifi/classs',exact:true, name: 'لیست اطلاعات',component:ifi_classList});
const ifi_classManage = React.lazy(() => import('./modules/ifi/pages/class/ifi_classManage'));
routes.push({ path: '/ifi/classs/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_classManage});
routes.push({ path: '/ifi/classs/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_classManage});


const ifi_departmentList = React.lazy(() => import('./modules/ifi/pages/department/ifi_departmentList'));
routes.push({ path: '/ifi/departments',exact:true, name: 'لیست اطلاعات',component:ifi_departmentList});
const ifi_departmentManage = React.lazy(() => import('./modules/ifi/pages/department/ifi_departmentManage'));
routes.push({ path: '/ifi/departments/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_departmentManage});
routes.push({ path: '/ifi/departments/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_departmentManage});


const ifi_paycenterList = React.lazy(() => import('./modules/ifi/pages/paycenter/ifi_paycenterList'));
routes.push({ path: '/ifi/paycenters',exact:true, name: 'لیست اطلاعات',component:ifi_paycenterList});
const ifi_paycenterManage = React.lazy(() => import('./modules/ifi/pages/paycenter/ifi_paycenterManage'));
routes.push({ path: '/ifi/paycenters/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_paycenterManage});
routes.push({ path: '/ifi/paycenters/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_paycenterManage});


const ifi_programestimationList = React.lazy(() => import('./modules/ifi/pages/programestimation/ifi_programestimationList'));
routes.push({ path: '/ifi/programestimations',exact:true, name: 'لیست اطلاعات',component:ifi_programestimationList});
const ifi_programestimationManage = React.lazy(() => import('./modules/ifi/pages/programestimation/ifi_programestimationManage'));
routes.push({ path: '/ifi/programestimations/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_programestimationManage});
routes.push({ path: '/ifi/programestimations/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_programestimationManage});


const ifi_employeeList = React.lazy(() => import('./modules/ifi/pages/employee/ifi_employeeList'));
routes.push({ path: '/ifi/employees',exact:true, name: 'لیست اطلاعات',component:ifi_employeeList});
const ifi_employeeManage = React.lazy(() => import('./modules/ifi/pages/employee/ifi_employeeManage'));
routes.push({ path: '/ifi/employees/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_employeeManage});
routes.push({ path: '/ifi/employees/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_employeeManage});


const ifi_employmenttypeList = React.lazy(() => import('./modules/ifi/pages/employmenttype/ifi_employmenttypeList'));
routes.push({ path: '/ifi/employmenttypes',exact:true, name: 'لیست اطلاعات',component:ifi_employmenttypeList});
const ifi_employmenttypeManage = React.lazy(() => import('./modules/ifi/pages/employmenttype/ifi_employmenttypeManage'));
routes.push({ path: '/ifi/employmenttypes/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_employmenttypeManage});
routes.push({ path: '/ifi/employmenttypes/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_employmenttypeManage});


const ifi_programestimationemployeeList = React.lazy(() => import('./modules/ifi/pages/programestimationemployee/ifi_programestimationemployeeList'));
routes.push({ path: '/ifi/programestimationemployees',exact:true, name: 'لیست اطلاعات',component:ifi_programestimationemployeeList});
const ifi_programestimationemployeeManage = React.lazy(() => import('./modules/ifi/pages/programestimationemployee/ifi_programestimationemployeeManage'));
routes.push({ path: '/ifi/programestimationemployees/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_programestimationemployeeManage});
routes.push({ path: '/ifi/programestimationemployees/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_programestimationemployeeManage});


const ifi_regionList = React.lazy(() => import('./modules/ifi/pages/region/ifi_regionList'));
routes.push({ path: '/ifi/regions',exact:true, name: 'لیست اطلاعات',component:ifi_regionList});
const ifi_regionManage = React.lazy(() => import('./modules/ifi/pages/region/ifi_regionManage'));
routes.push({ path: '/ifi/regions/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_regionManage});
routes.push({ path: '/ifi/regions/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_regionManage});


const ifi_roleList = React.lazy(() => import('./modules/ifi/pages/role/ifi_roleList'));
routes.push({ path: '/ifi/roles',exact:true, name: 'لیست اطلاعات',component:ifi_roleList});
const ifi_roleManage = React.lazy(() => import('./modules/ifi/pages/role/ifi_roleManage'));
routes.push({ path: '/ifi/roles/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_roleManage});
routes.push({ path: '/ifi/roles/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_roleManage});


const ifi_taxtypeList = React.lazy(() => import('./modules/ifi/pages/taxtype/ifi_taxtypeList'));
routes.push({ path: '/ifi/taxtypes',exact:true, name: 'لیست اطلاعات',component:ifi_taxtypeList});
const ifi_taxtypeManage = React.lazy(() => import('./modules/ifi/pages/taxtype/ifi_taxtypeManage'));
routes.push({ path: '/ifi/taxtypes/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_taxtypeManage});
routes.push({ path: '/ifi/taxtypes/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_taxtypeManage});


const ifi_programmaketypeList = React.lazy(() => import('./modules/ifi/pages/programmaketype/ifi_programmaketypeList'));
routes.push({ path: '/ifi/programmaketypes',exact:true, name: 'لیست اطلاعات',component:ifi_programmaketypeList});
const ifi_programmaketypeManage = React.lazy(() => import('./modules/ifi/pages/programmaketype/ifi_programmaketypeManage'));
routes.push({ path: '/ifi/programmaketypes/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_programmaketypeManage});
routes.push({ path: '/ifi/programmaketypes/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_programmaketypeManage});

const ifi_dfnList = React.lazy(() => import('./modules/ifi/pages/dfn/ifi_dfnList'));
routes.push({ path: '/ifi/dfns',exact:true, name: 'لیست اطلاعات',component:ifi_dfnList});
const ifi_dfnManage = React.lazy(() => import('./modules/ifi/pages/dfn/ifi_dfnManage'));
routes.push({ path: '/ifi/dfns/management/:id',exact:false, name: 'مدیریت اطلاعات',component:ifi_dfnManage});
routes.push({ path: '/ifi/dfns/management',exact:false, name: 'مدیریت اطلاعات',component:ifi_dfnManage});

export default routes;
