import UserScores from './components/dashboard/userScores/UserScores';
import ScoreBoard from './components/dashboard/scoreBoard/ScoreBoard';
import Game from './components/dashboard/myGame/Game';
import Help from './components/dashboard/Help';
import Admin from './components/dashboard/admin/Admin';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import GameIcon from '@material-ui/icons/Gamepad';
import PredictIcon from '@material-ui/icons/HowToVote';
import PredictResultIcon from '@material-ui/icons/Visibility';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SettingIcon from '@material-ui/icons/Settings';
import MoodIcon from '@material-ui/icons/Mood';
import Lottery from "./components/dashboard/lottery/Lottery";
import Predict from "./components/dashboard/predict/Predict";
import PredictResult from './components/dashboard/predict/result/PredictResult';
import { Route } from './layout/dashboard/SideMenu';

const dashboardRoutes : Route[] = [
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
        component: ScoreBoard,
        icon: PeopleIcon,
        layout: "/dashboard",
        text: 'جدول نتایج'
      },
      {
        path: "/game",
        name: "game",
        component: Game,
        icon: GameIcon,
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
          path: "/predict",
          name: "predict",
          component: Predict,
          icon: PredictIcon,
          layout: "/dashboard",
          text: 'پیش بینی'
      },
    {
        path: "/predictResult",
        name: "predictResult",
        component: PredictResult,
        icon: PredictResultIcon,
        layout: "/dashboard",
        text: 'نتایج پیش بینی'
    },
      {
        path: "/help",
        name: "help",
        component: Help,
        icon: HelpIcon,
        layout: "/dashboard",
        text: 'داستان کربیکا'
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