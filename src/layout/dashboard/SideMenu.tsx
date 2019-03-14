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

type SideMenuClasses = {
    drawerPaper: string,
    drawerPaperClose: string,
    toolbarIcon: string,
}

export type SideMenuProps = {
    classes: SideMenuClasses,
    user: string,
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
        const {classes, open, handleDrawerClose, routes, isAdmin, user} = this.props;
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
                    <Typography align='center' variant="h6">{user}</Typography>
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
                            <Typography align='center' variant="h6">{messages.user} : {user}</Typography>
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

const getRoutes = (routes: any[], isAdmin: boolean, onClick: (()=>void))=>{
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


const SideLink = withStyles(sideLinkStyles)(({route, onClick, classes})=> <NavLink to={route.path}
                                                                                   className={classes.route}
                                                                                   activeClassName={classes.activeRoute}>
    <ListItem button onClick={onClick}>
        <ListItemIcon>
         {React.createElement(route.icon)}
        </ListItemIcon>
        <ListItemText primary={route.text} />
      </ListItem>
</NavLink>);

