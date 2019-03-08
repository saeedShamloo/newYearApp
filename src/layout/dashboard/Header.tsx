import * as React from 'react';
import {withStyles,AppBar,Toolbar,Typography,IconButton,Badge} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as classNames from 'classnames';
import { appBarStyles } from './DashbardJSS';

type HeaderClasses = {
    appBar: string,
    appBarShift: string,
    toolbar: string,
    menuButton: string,
    menuButtonHidden: string,
    title: string,
}

export type HeaderProps = {
    classes: HeaderClasses,
    open: boolean,
    handleDrawerOpen: ()=> void
};
export type HeaderState = {};

class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);
    }
    render(){
        const {classes, open, handleDrawerOpen} = this.props;
        return (
            <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              پروفایل کاربری
            </Typography>
          </Toolbar>
        </AppBar>
        );
    }
};

export default withStyles(appBarStyles)(Header);