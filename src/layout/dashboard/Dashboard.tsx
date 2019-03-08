import * as React from 'react';
import {CssBaseline,Typography,withStyles } from '@material-ui/core';
import { dashboardStyles } from './DashbardJSS';
import Header from './Header';
import SideMenu from './SideMenu';
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../../routs";

type DashboardClasses = {
    root: string,
    content: string,
    appBarSpacer: string,
    chartContainer: string,
    tableContainer: string,
}
export type DashboadProps = {
    classes: DashboardClasses,
    location: any
};
export type DashboardState = {
    open: boolean
};

const routesElem = routes.map((prop, key) => {
    if (prop.layout === "/dashboard") {
        const Comp = prop.component;
      return (
        <Route
          path={prop.path}
          render={() => <Comp/>}
          key={key}
        />
      );
    }
  });
const switchRoutes = (
     <Switch>
        {routesElem}
     </Switch>
  );

class Dashboard extends React.Component<DashboadProps, DashboardState>{
    constructor(props: DashboadProps){
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

      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <CssBaseline />
            <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>
            <SideMenu open={this.state.open} handleDrawerClose={this.handleDrawerClose} routes={routes}/>
            <main className={classes.content}>
             <div className={classes.appBarSpacer} />
               {switchRoutes}
               <Redirect from={'/'} to={'/soccer'}/>
            </main>
          </div>
        );
      }
}

export default withStyles(dashboardStyles as any)(Dashboard);