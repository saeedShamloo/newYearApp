import * as React from 'react';
import {withStyles, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import Profile from './profile/Profile';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Person';
import * as classNames from 'classnames';
import { appBarStyles } from './DashbardJSS';
import messages from "../../constants/messages";

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
    username: string,
    user: string,
    open: boolean,
    onLogout: ()=> void,
    handleDrawerOpen: ()=> void
};
export type HeaderState = {
    anchorEl: HTMLElement | null
};

class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    showProfile = (event: any) => {
        this.setState({
          anchorEl: event.currentTarget as HTMLElement,
        });
      };
    
      closeProfile = () => {
        this.setState({
          anchorEl: null,
        });
      };

    render(){
        const {classes, open, handleDrawerOpen, onLogout, username, user} = this.props;
        const { anchorEl } = this.state;
        const openProfile = Boolean(anchorEl);
        return (
        <AppBar
          position="absolute"
          className={classNames(classes.appBar)}>
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}>
                <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
                {messages.dashboard}
            </Typography>
              <IconButton color="inherit" onClick={this.showProfile} className={classes.profileBtn}>
                  <FaceIcon />
              </IconButton>
                <Profile userName={username} 
                        user={user}
                        onLogout={onLogout} 
                        anchorEl={anchorEl}
                        onClose={this.closeProfile}
                        open={openProfile}/>
          </Toolbar>
        </AppBar>
        );
    }
};

export default withStyles(appBarStyles)(Header);