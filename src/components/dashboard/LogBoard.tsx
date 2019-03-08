import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import SentimentIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { request } from './../../constants/values';
import { IAppState } from '../../redux/types/index';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import UpdateIcon from '@material-ui/icons/Update';
import { baseURL, ReqWithLoadingAction } from '../../share/fetch/fetch';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { blueGrey, indigo } from "@material-ui/core/colors";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  refresh: {
    maxWidth:40,
    minWidth:40,
    position: 'absolute',
    right: 10,
    top:10
    },
    wrapper: {
        position : 'relative',
    },
    avatar: {
        alignItems: 'flex-start',
        background: blueGrey[800]
    }
});

export type LogBoardProps = {
    classes: any,
    loading: boolean
};
export type LogBoardState = {
    players: any[]
};

class LogBoard extends React.Component<LogBoardProps, LogBoardState>{
    constructor(props: LogBoardProps){
        super(props);
        this.state= {
            players: []
        }
    }

    componentDidMount(){
        this.getPlayers();
    }

    getPlayers = async ()=>{
        const response: any = await ReqWithLoadingAction(request.get,`${baseURL}/topPlayers`);
        if(response.data.length){
            this.setState({ players: response.data })
        }
    }

    render(){
        const { classes, loading } = this.props;
        return loading ? <div style={{display:'flex', justifyContent:'center'}}><BeatLoader
        sizeUnit={"px"}
        size={20}
        color={indigo[300]}
        loading={loading}/></div>: (
          <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper + ' ' + classes.wrapper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
                جدول نتایج
              </Typography>
              <Button variant="contained"
                        onClick={this.getPlayers} 
                        color="primary" className={classes.button + ' ' + classes.refresh}>
                        <UpdateIcon className={classes.rightIcon} />
                        </Button>
              <List className={classes.list}>
                {this.state.players.map((player:any, index: number) => (
                  <React.Fragment key={index}>
                    <ListItem button>
                      {/* <Avatar><SentimentIcon/></Avatar> */}
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                             {player.name.charAt(0)}
                         </Avatar>
                      <ListItemText primary={`${player.name} ${player.family}`} secondary={`امتیاز : ${player.soccer}`} />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments">
                            <CommentIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                  </React.Fragment>
                ))}
              </List>
            </Paper>
            
          </React.Fragment>
        )
    }
}

const Comp = withStyles(styles as any)(LogBoard);
const mapStateToProps = (appState: IAppState)=>({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)


