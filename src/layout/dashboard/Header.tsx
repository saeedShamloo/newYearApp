import * as React from 'react';
import {withStyles,AppBar,Toolbar,Typography,IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as classNames from 'classnames';
import { appBarStyles } from './DashbardJSS';
import messages from "../../constants/messages";

const styles = {
    logOut: {transform: 'rotateY(180deg)'}
};

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
    user: string,
    open: boolean,
    handleDrawerOpen: ()=> void
};
export type HeaderState = {};

class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);
    }
    render(){
        const {classes, open, handleDrawerOpen, onLogout, user} = this.props;
        return (
        <AppBar
          position="absolute"
          className={classNames(classes.appBar)}
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
              className={classes.title}>
                {messages.userProfile}
            </Typography>
              <IconButton color="inherit" style={styles.logOut} onClick={onLogout}>
                  <ExitToAppIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
        );
    }
};

export default withStyles(appBarStyles)(Header);