import * as React from 'react';
import { Drawer, IconButton, Divider, List, withStyles, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import * as classNames from 'classnames';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { sideMenustyles } from './DashbardJSS';
import { NavLink } from "react-router-dom";
import messages from '../../constants/messages';

type SideMenuClasses = {
    drawerPaper: string,
    drawerPaperClose: string,
    toolbarIcon: string,
}

export type SideMenuProps = {
    classes: SideMenuClasses,
    open: boolean,
    handleDrawerClose: ()=> void,
    routes: any[],
    isAdmin: boolean
};
export type SideMenuState = {};

class SideMenu extends React.Component<SideMenuProps, SideMenuState>{
    constructor(props: SideMenuProps){
        super(props);
    }
    render(){
        const {classes, open, handleDrawerClose, routes, isAdmin} = this.props;
        return(
            <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
                <Typography align='center' variant="h6">{messages.corebika}</Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{getRoutes(routes,isAdmin)}</List>
            <Divider />
  
          </Drawer>
        );
    }
}

export default withStyles(sideMenustyles as any)(SideMenu);

const getRoutes = (routes: any[], isAdmin: boolean)=>{
    const routesLinks = routes.map((route:any, key: number)=> {
        const link  =<SideLink route={route} key={key}/>;
        if(route.role == 'admin'){
            if(!isAdmin){
                return null
            }
        }
        return link;
    });
    return routesLinks;
};

const SideLink = ({route})=> <NavLink
to={route.path}>
    <ListItem button>
        <ListItemIcon>
         {React.createElement(route.icon)}
        </ListItemIcon>
        <ListItemText primary={route.text} />
      </ListItem>
</NavLink>