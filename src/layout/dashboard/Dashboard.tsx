import * as React from 'react';
import {CssBaseline, withStyles} from '@material-ui/core';
import { dashboardStyles } from './DashbardJSS';
import Header from './Header';
import SideMenu from './SideMenu';
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../../routes";
import AuthService from "../../utils/authenticate/AuthService";

type DashboardClasses = {
    root: string,
    content: string,
    appBarSpacer: string,
    chartContainer: string,
    tableContainer: string,
}
export type DashboardProps = {
    classes: DashboardClasses,
    location: any
};
export type DashboardState = {
    open: boolean
};

const routesElem = (isAdmin:boolean)=> {
    const routesElem = routes.map((prop, key) => {
        if (prop.layout === "/dashboard") {
            const Comp = prop.component;
            const route = (<Route
                path={prop.path}
                render={() => <Comp/>}
                key={key}
            />);

            if(prop.role == 'admin'){
                if(!isAdmin){
                    return null;
                }
            }
            return route;
        }
    });
    return routesElem;
};

const switchRoutes =(isAdmin: boolean)=> <Switch>{routesElem(isAdmin)}</Switch>;

class Dashboard extends React.Component<DashboardProps, DashboardState>{
    constructor(props: DashboardProps){
        super(props);
        this.state = {
            open: false,
          };
        }

      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      handleLogOut = ()=>{
          const auth = new AuthService();
          auth.logout();
      };

      render() {
        const { classes,user } = this.props;
        const isAdmin = user == 'admin';
        return (
          <div className={classes.root}>
            <CssBaseline />
            <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} onLogout={this.handleLogOut}/>
            <SideMenu open={this.state.open} handleDrawerClose={this.handleDrawerClose} routes={routes} isAdmin={isAdmin}/>
            <main className={classes.content}>
             <div className={classes.appBarSpacer} />
               {switchRoutes(isAdmin)}
               <Redirect from={'/'} to={'/scores'}/>
            </main>
          </div>
        );
      }
}

export default withStyles(dashboardStyles as any)(Dashboard);