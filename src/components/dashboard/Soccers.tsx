import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import { baseURL, ReqWithLoadingAction } from '../../share/fetch/fetch';
import { grey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import winnerImage from '../../../assets/images/tim_80x80.png';
import ImageIcon from '@material-ui/icons/PermIdentity';
import { request } from './../../constants/values';
import { IAppState } from '../../redux/types/index';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { indigo, blueGrey } from "@material-ui/core/colors";
import UpdateIcon from '@material-ui/icons/Update';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    appBar: {
        position: 'relative'
    },
    toolbarTitle: {
        flex: 1
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [
            theme
                .breakpoints
                .up(900 + theme.spacing.unit * 3 * 2)
        ]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    titleSection: {
        maxWidth: 680,
        margin: '0 auto 20px auto',
        paddingRight: 40,
        position: 'relative'
    },
    cardHeader: {
        backgroundColor: theme.palette.grey[200]
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 1
    },
    cardActions: {
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            paddingBottom: theme.spacing.unit * 2
        }
    },
    winIcon: {
        verticalAlign: 'middle',
        background: '#2aa88a',
        color: grey[50]
    },
    avatar: {
        height:25,
        width:25,
        background: blueGrey[800]
    },
    refresh: {
        maxWidth:40,
        minWidth:40,
        position: 'absolute',
        right: 0,
        top:0
    },
    playerName: {
        fontSize: '.8em'
    }
});

export type SoccerProps = {
    classes: any,
    loading?: boolean
};
export type SoccerState = {
    soccers: any[]
};

class Soccer extends React.Component < SoccerProps,SoccerState > {
    constructor(props : SoccerProps) {
        super(props);
        this.state = {
            soccers: [],
        }
    }

    async componentDidMount() {
        this.getSoccers();
    }

     getSoccers = async ()=> {
        const response: any = await ReqWithLoadingAction(request.get,`${baseURL}/games`);
        if(response.data.length){
            this.setState({ soccers: response.data })
        }
    }

    render() {
        const {classes, loading} = this.props;
        return loading ? <div style={{display:'flex', justifyContent:'center'}}><BeatLoader
        sizeUnit={"px"}
        size={20}
        color={indigo[300]}
        loading={loading}/></div>:
         (
            <React.Fragment>
                <CssBaseline/>
                
                <main className={classes.layout}>
                    <div className={classes.titleSection}>
                        <Typography
                            component="h5"
                            variant="h5"
                            align="center"
                            color="textPrimary"
                            gutterBottom>
                           توی این قسمت امتیازهای خودتو میتونی ببینی
                        </Typography>
                        <Button variant="contained"
                        onClick={this.getSoccers} 
                        color="primary" className={classes.button + ' ' + classes.refresh}>
                        <UpdateIcon className={classes.rightIcon} />
                    </Button>
                    </div>
                    <Grid container spacing={40} alignItems="stretch">
          {this.state.soccers.map((soccer: any) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={soccer.id} xs={12} sm={6} md={4}>
              <Card style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardHeader
                  title={soccer.title}
                  subheader={soccer.description}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={soccer.soccer == '10' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent style={{ flexGrow:1, padding:8 }}>
                  <div className={classes.cardPricing}>
                    <Typography variant="h6" color="textSecondary">
                      شرکت کننده ها : 
                    </Typography>
                  </div>
                <List dense className={classes.root}>
                        {soccer.players.map((player: any, index: number) => (
                          <ListItem key={index} button>
                            <ListItemAvatar>
                            { player == soccer.winner ? 
                            <Avatar className={classes.avatar} src={winnerImage}/> :
                            <Avatar className={classes.avatar}><ImageIcon/></Avatar>}
                              
                            </ListItemAvatar>
                            <ListItemText primary={player} className={classes.playerName}/>
                            <ListItemSecondaryAction>
                        { player == soccer.winner ? <Checkbox checked={true} /> : null}
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                    </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant='raised' color="primary">
                  امتیازت :  { soccer.soccer }
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
                </main>
            </React.Fragment>
        );
    }
}

const Comp = withStyles(styles as any)(Soccer);
const mapStateToProps = (appState: IAppState)=>({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)