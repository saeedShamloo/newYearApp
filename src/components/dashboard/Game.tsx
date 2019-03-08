import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Paper,Dialog, DialogTitle,DialogActions,DialogContent,DialogContentText,Snackbar,Slide,
     Typography, Card, Grid, CardContent , CardHeader, CardActions, Button, List,ListItemText,Checkbox, ListItem,ListItemSecondaryAction, Avatar, ListItemAvatar} from '@material-ui/core';
     import { request } from './../../constants/values';
     import { IAppState } from '../../redux/types/index';
     import { connect } from 'react-redux';
     import { BeatLoader } from 'react-spinners';
     import { indigo, blueGrey } from "@material-ui/core/colors";
     import UpdateIcon from '@material-ui/icons/Update';
     import { baseURL, ReqWithLoadingAction, getRequest } from '../../share/fetch/fetch';
import { async } from 'q';

export type GameProps = {
    classes: any,
    loading: boolean,
};
export type GameState = {
    dialogOpen: boolean,
    checked: string,
    game: any,
    registeringSurvey: boolean,
    openSnack: boolean,
    surveryMessage: string
};

const styles = (theme: any) => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    appBar: {
      position: 'relative',
    },
    toolbarTitle: {
      flex: 1,
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
        width: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    cardHeader: {
      backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing.unit * 2,
      },
    },
    refresh: {
        position: 'absolute',
        top: 0,
        right:0,
        maxWidth:40,
        minWidth:40,
    },
    gameTitle: {
        position: 'relative'
    },
    playerName: {
        fontSize: '0.8em'
    },
    avatar: {
        alignItems: 'flex-start',
        background: blueGrey[800]
    }
  });

class Game extends React.Component<GameProps, GameState>{
    constructor(props: GameProps){
        super(props);
        this.state = {
            checked: '',
            dialogOpen: false,
            game: null,
            registeringSurvey: false,
            surveryMessage: '',
            openSnack: false
          };
    }
      
      componentDidMount(){
          this.getActiveGame();
      }

      getActiveGame = async()=>{
        const response: any = await ReqWithLoadingAction(request.get,`${baseURL}/activeGame`);
        if(response.data){
            this.setState({ game: response.data,
                checked: '',
                dialogOpen: false,
            })
        }
      }

      handleToggle = (value: any) => () => {
          const {checked} = this.state;
          if(checked == value ){
            this.setState({
                checked: '',
              });
          }else{
            this.setState({
                checked: value,
              });
          }
      };
      
      handleClose = () => {
          if(!this.state.registeringSurvey){
              this.setState({ dialogOpen: false });
            }
      };

      handleOpen = () => {
        this.setState({ dialogOpen: true });
      };

      submitSurvery = async ()=>{
          this.setState({ registeringSurvey: true });
          const response: any = await getRequest(`${baseURL}/commitSurvey`);
          if(response.data){
                this.setState({
                    registeringSurvey: false,
                    dialogOpen: false,
                    openSnack: true,
                    surveryMessage: response.data.message
                })
          }else {

          }
      }

      render() {
        const { classes, loading } = this.props;
        const { game } = this.state;
        return loading ? <div style={{display:'flex', justifyContent:'center'}}><BeatLoader
        sizeUnit={"px"}
        size={20}
        color={indigo[300]}
        loading={loading}/></div>:
        (
            <Grid container spacing={40} alignItems="flex-end">
            <Grid item md={12} sm={12} xs={12}>
              {game && 
                <Card>
                <CardHeader
                  title={
                    <div className={classes.gameTitle}>
                    {game.title}
                    <Button variant="contained"
                        onClick={this.getActiveGame} 
                        color="primary" className={classes.button + ' ' + classes.refresh}>
                        <UpdateIcon className={classes.rightIcon} /></Button>
                  </div>
                  }
                  subheader={game.description}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                 <CardContent style={{ flexGrow:1, padding:8 }}>
                  <div className={classes.cardPricing}>
                    <Typography variant="h6" color="textSecondary">
                      شرکت کننده ها : 
                    </Typography>
                  </div>
                <List dense className={classes.root}>
                        {game.players.map((player: any, index: number) => (
                          <ListItem key={player} button onClick={this.handleToggle(player)}>
                            <ListItemAvatar>
                            <Avatar className={classes.avatar}>{player.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={player} className={classes.playerName}/>
                            <ListItemSecondaryAction>
                             <Checkbox checked={this.state.checked == player} />
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                    </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth
                   variant={'raised'}
                   disabled={!this.state.checked}
                    color="primary"
                     onClick={this.handleOpen}>
                    ثبت
                  </Button>
                </CardActions>
              </Card>
            }
            </Grid>
       <Dialog
          fullScreen={false}
          open={this.state.dialogOpen}
          disableBackdropClick={this.state.registeringSurvey}
            disableEscapeKeyDown={this.state.registeringSurvey}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"نظرت قطعیه ؟ "}</DialogTitle>
          <DialogContent>
            <DialogContentText>
             {this.state.registeringSurvey ? <div>
                <Typography variant="h6" color="textSecondary">
                        لطفا منتظر باشید ....
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                          رای شما در حال ثبت شدن در سیستم می باشد
                    </Typography>

             </div> : ' حواست باشه! رایی که میدی امکان تجدید نظر نداره.'}
              
                          </DialogContentText>
          </DialogContent>
          <DialogActions>
                {
                    !this.state.registeringSurvey && 
                    <React.Fragment>
                         <Button  color="primary" onClick={this.submitSurvery}>
                            ثبت کن
                            </Button>
                            <Button onClick={this.handleClose}color="primary" autoFocus>
                            پشیمون شدم
                            </Button>
                    </React.Fragment>
                }
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.openSnack}
          onClose={()=> this.setState({ openSnack: false, surveryMessage: '' }) }
          TransitionComponent={TransitionUp}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.surveryMessage}</span>}
        />
            </Grid>
        );
      }
}

function TransitionUp(props:any) {
    return <Slide {...props} direction="up" />;
  }

const Comp = withStyles(styles as any)(Game);

const mapStateToProps = (appState: IAppState)=>({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)