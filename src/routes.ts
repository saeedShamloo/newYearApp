import UserScores from './components/dashboard/userScores/UserScores';
import LogBoard from './components/dashboard/LogBoard';
import Game from './components/dashboard/myGame/Game';
import Help from './components/dashboard/Help';
import Admin from './components/dashboard/admin/Admin';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SettingIcon from '@material-ui/icons/Settings';
import MoodIcon from '@material-ui/icons/Mood';
import Lottery from "./components/dashboard/lottery/Lottery";

const dashboardRoutes = [
    {
        path: "/scores",
        name: "scores",
        component: UserScores,
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
        path: "/lottery",
        name: "lottery",
        component: Lottery,
        icon: MoodIcon,
        layout: "/dashboard",
        text: 'ثبت نام قرعه کشی'
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
        text: 'مدیر',
        role:"admin"
      }, 
  ];
  export default dashboardRoutes;