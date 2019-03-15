import {grey} from "@material-ui/core/colors";
import { indigo } from "@material-ui/core/colors";

const drawerWidth = 240;
export const dashboardStyles = (theme: any) => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.down('sm')]: {
          padding: 0,
        },
      height: '100vh',
      overflow: 'auto',
    },
    chartContainer: {
      marginLeft: -22,
    },
    tableContainer: {
      height: 320,
    },
    h5: {
      marginBottom: theme.spacing.unit * 2,
    },
  });

export const appBarStyles = (theme:any)=>({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
    title: {
        flexGrow: 1,
      },
      profileBtn: {
          backgroundColor: indigo[800]
      }
})

export const sideMenustyles = (theme: any)=>({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 15px',
        ...theme.mixins.toolbar,
      },
});

export const sideLinkStyles = ()=>({
    route: {
        display: 'block',
        textDecoration: 'none'
    },
    activeRoute:{
        backgroundColor: grey[200]
    }
})