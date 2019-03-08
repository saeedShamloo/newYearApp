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
    routes: any[]
};
export type SideMenuState = {};

class SideMenu extends React.Component<SideMenuProps, SideMenuState>{
    constructor(props: SideMenuProps){
        super(props);
    }
    render(){
        const {classes, open, handleDrawerClose, routes} = this.props;
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
            <List>{routes.map((route:any, key: number)=> <SideLink route={route} key={key}/>)}</List>
            <Divider />
  
          </Drawer>
        );
    }
}

export default withStyles(sideMenustyles as any)(SideMenu);

const SideLink = ({route})=> <NavLink
to={route.path}>
    <ListItem button>
        <ListItemIcon>
         {React.createElement(route.icon)}
        </ListItemIcon>
        <ListItemText primary={route.text} />
      </ListItem>
</NavLink>

// export const mainListItems = (
//     <div>
//       <ListItem button>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="داشبورد" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <PeopleIcon />
//         </ListItemIcon>
//         <ListItemText primary="امتیازات" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <BarChartIcon />
//         </ListItemIcon>
//         <ListItemText primary="بازی" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <LayersIcon />
//         </ListItemIcon>
//         <ListItemText primary="پنل مدیریت" />
//       </ListItem>
//     </div>
//   );