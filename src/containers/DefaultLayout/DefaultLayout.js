import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch,BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import navigation2 from '../../_nav2';
import header from '../../assets/img/header.png'
// routes config
import routes from '../../routes';
import AccessManager from "../../classes/AccessManager";
import SweetFetcher from "../../classes/sweet-fetcher";
import Cookies from "universal-cookie";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            loginTime:0,
        };
        let cookies = new Cookies();
        cookies.addChangeListener((name,value,options)=>{
             // alert(name.name);
            // if(name.name=='userlogintime')
            // {
            //     alert("userlogintimeOK");
            // }
        });
        // cookies.set("userlogintime",'11');
    };

  loading = () => <div className="animated fadeIn pt-1 text-center">در حال بارگذاری...</div>

  signOut(e) {
    e.preventDefault();

      this.setState({isLoggedIn:false,loginTime:0});
      this.props.history.push('/login');
  }

  render() {
      // if(!AccessManager.UserIsLoggedIn())
      //     this.props.history.push('/login');
      new SweetFetcher().Fetch('/users/current',SweetFetcher.METHOD_GET,null,()=>{},null,'cmn_dfn',AccessManager.VIEW,this.props.history);
    return (

      <div className="app">

          {/*<div className={'headerimagediv'} >*/}
              {/*<img src={header} className={'headerimage'} /></div>*/}
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav loginTime={this.state.loginTime} navConfig={AccessManager.UserIsLoggedIn()?navigation:navigation2} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                  <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}

                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
