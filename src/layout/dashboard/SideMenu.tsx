import * as React from 'react';
import {
    Drawer,
    IconButton,
    Divider,
    List,
    withStyles,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Hidden
} from '@material-ui/core';
import * as classNames from 'classnames';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { sideMenustyles,sideLinkStyles } from './DashbardJSS';
import { NavLink } from "react-router-dom";
import messages from '../../constants/messages';
import Logo from "../../components/share/Logo";

type SideMenuClasses = {
    drawerPaper: string,
    drawerPaperClose: string,
    toolbarIcon: string,
}

export type Route = {
    path: string,
    name: string,
    component: React.ComponentType,
    icon:  React.ComponentType,
    layout: string,
    text: string,
    role?: string
}

export type SideMenuProps = {
    classes: SideMenuClasses,
    open: boolean,
    handleDrawerClose: ()=> void,
    routes: Route[],
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
            <React.Fragment>
            <Hidden smDown>
                <Drawer
                    onClose={handleDrawerClose}
                variant="permanent"
                classes={{
                  paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}>
                <div className={classes.toolbarIcon}>
                    {/*<Typography align='center' variant="h6">{messages.corebika}</Typography>*/}
                    <div style={{width:160}}><Logo /></div>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>{getRoutes(routes,isAdmin, handleDrawerClose)}</List>
                <Divider />
              </Drawer>
            </Hidden>
                <Hidden smUp implementation={'css'}>
                    <Drawer
                        onClose={handleDrawerClose}
                        classes={{
                            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        variant="temporary"
                        open={open}>
                        <div className={classes.toolbarIcon}>
                            <div style={{width:160}}><Logo /></div>
                            {/*<Typography align='center' variant="h6">{messages.corebika}</Typography>*/}
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronRightIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>{getRoutes(routes, isAdmin, handleDrawerClose)}</List>
                        <Divider/>
                    </Drawer>
                </Hidden>
            </React.Fragment>
        );
    }
}

export default withStyles(sideMenustyles as any)(SideMenu);

const getRoutes = (routes: Route[], isAdmin: boolean, onClick: (()=>void))=>{
    const routesLinks = routes.map((route:any, key: number)=> {
        const link  =<SideLink route={route} key={key} onClick={onClick}/>;
        if(route.role == 'admin'){
            if(!isAdmin){
                return null
            }
        }
        return link;
    });
    return routesLinks;
};

type SideLinkProps = {
    route: Route,
    onClick: ()=> void,
    classes?: any
}

const SideLinkComp = (props:SideLinkProps)=> {
    const { route,onClick,classes } = props;
    return (
        <NavLink to={route.path}
        className={classes.route}
        activeClassName={classes.activeRoute}>
            <ListItem button onClick={onClick}>
                <ListItemIcon>
                {React.createElement(route.icon)}
                </ListItemIcon>
                <ListItemText primary={route.text} />
            </ListItem>
        </NavLink>
    );
};
const SideLink = withStyles(sideLinkStyles)(SideLinkComp)