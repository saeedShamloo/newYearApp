import Soccer from './components/dashboard/Soccers';
import LogBoard from './components/dashboard/LogBoard';
import Game from './components/dashboard/Game';
import Help from './components/dashboard/Help';
import Admin from './components/dashboard/Admin';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SettingIcon from '@material-ui/icons/Settings';

const dashboardRoutes = [
    {
        path: "/soccer",
        name: "Soccer",
        component: Soccer,
        icon:  DashboardIcon,
        layout: "/dashboard",
        text: 'امتیازات'
      },  
        {
        path: "/logBoard",
        name: "logBoard",
        component: LogBoard,
        icon: PeopleIcon,
        layout: "/dashboard",
        text: 'جدول نتایج'
      },
      {
        path: "/game",
        name: "game",
        component: Game,
        icon: BarChartIcon,
        layout: "/dashboard",
        text: 'شروع بازی'
      }, 
      {
        path: "/help",
        name: "help",
        component: Help,
        icon: HelpIcon,
        layout: "/dashboard",
        text: 'توضیحات'
      },
      {
        path: "/admin",
        name: "admin",
        component: Admin,
        icon: SettingIcon,
        layout: "/dashboard",
        text: 'مدیر'
      }, 
  ];
  export default dashboardRoutes;