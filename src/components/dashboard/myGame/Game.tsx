import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Typography,
    Card,
    Grid,
    CardContent,
    CardHeader,
    CardActions,
    Button,
    List,
} from '@material-ui/core';
import {request, urls} from '../../../constants/values';
import {IAppState} from '../../../redux/types';
import {connect} from 'react-redux';
import UpdateIcon from '@material-ui/icons/Update';
import {postRequest, ReqWithLoadingAction} from '../../../utils/fetch/fetch';
import Loading from "../../share/Loading/Loading";
import ChoiceItem from "./ChoiceItem";
import {styles} from './gameJSS'
import ConfirmDialog from "./ConfirmDialog";
import Snack from "../../share/snack/Snack";
import messages from "../../../constants/messages";
import ThereIsNoGame from "./ThereIsNotGame";

export type GameProps = {
    classes: any,
    loading: boolean,
};
export type GameState = {
    dialogOpen: boolean,
    vote: string,
    gameId: string,
    game: any,
    registeringSurvey: boolean,
    openSnack: boolean,
    surveyMessage: string,
    hasError: boolean
};

class Game extends React.Component<GameProps, GameState> {
    _isMounted: boolean;
    constructor(props: GameProps) {
        super(props);
        this._isMounted = false;
        this.state = {
            vote: '',
            gameId: '',
            dialogOpen: false,
            game: null,
            registeringSurvey: false,
            surveyMessage: '',
            openSnack: false,
            hasError: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getActiveGame();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getActiveGame = async () => {
        const response: any = await ReqWithLoadingAction(request.get, true, urls.myGame as string);
        if (this._isMounted && response.data) {
            this.setState({
                game: response.data.gameDefinition,
                gameId: response.data.id,
                vote: '',
                dialogOpen: false,
            })
        }else {
            this.setState({
                game: {},
                gameId: '',
                vote: '',
                dialogOpen: false,
                hasError: true
            })
        }
    };

    handleToggle = (value: string) => () => {
        const {vote} = this.state;
        if (vote == value) {
            this.setState({
                vote: '',
            });
        } else {
            this.setState({
                vote: value,
            });
        }
    };

    handleClose = () => {
        if (!this.state.registeringSurvey) {
            this.setState({dialogOpen: false});
        }
    };

    handleOpen = () => {
        this.setState({dialogOpen: true});
    };

    submitSurvey = async () => {
        this.setState({registeringSurvey: true});
        const { gameId,vote } = this.state;
        const response: any = await postRequest(urls.vote as string,true,{
            vote,
            gameId
        });

        let message= '';
        if(response.data != undefined){
           message = messages.submitVoteSuccessfully
        }else{
            message = response.error.response.data.message;
        }

        this.setState((prevState: GameState) => ({
            ...prevState,
            registeringSurvey: false,
            dialogOpen: false,
            openSnack: true,
            surveyMessage: message
        }))
    };

    render() {
        const {classes, loading} = this.props;
        const {game, hasError} = this.state;
        if (loading) {
            return <div style={{marginTop:20}}><Loading loading={loading} size={20}/></div>
        }
        if(hasError){
            return  <ThereIsNoGame onRefresh={this.getActiveGame}/>
        }

        return (
            <Grid container spacing={0} alignItems="flex-end">
                <Grid item md={12} sm={12} xs={12}>
                    {game &&
                    <Card className={classes.gameItem}>
                        <CardHeader
                            title={
                                <div className={classes.gameTitle}>
                                    {game.name}
                                    <Button variant="contained"
                                            onClick={this.getActiveGame}
                                            color="primary" className={classes.button + ' ' + classes.refresh}>
                                        <UpdateIcon className={classes.rightIcon}/></Button>
                                </div>
                            }
                            subheader={game.description}
                            titleTypographyProps={{align: 'center',gutterBottom:true}}
                            subheaderTypographyProps={{align: 'center'}}
                            className={classes.cardHeader}
                        />
                        <CardContent style={{flexGrow: 1, padding: 8}}>
                            <div className={classes.cardPricing}>
                                <Typography variant="h6" color="textSecondary">
                                    {messages.choices}
                                </Typography>
                            </div>
                            <List dense className={classes.root}>
                                {game.choices.map((choice: any, index: number) => <ChoiceItem choice={choice}
                                                                                              selected={this.state.vote == choice.value}
                                                                                              onClick={this.handleToggle}
                                                                                              key={index}/>)}
                            </List>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Button fullWidth
                                    variant={'contained'}
                                    disabled={!this.state.vote}
                                    color="primary"
                                    onClick={this.handleOpen}>
                                {messages.submit}
                            </Button>
                        </CardActions>
                    </Card>
                    }
                </Grid>
                <ConfirmDialog open={this.state.dialogOpen}
                               registeringSurvey={this.state.registeringSurvey}
                               handleClose={this.handleClose}
                               submitSurvey={this.submitSurvey}/>
                <Snack open={this.state.openSnack}
                       onClose={() => this.setState({openSnack: false, surveyMessage: ''})}
                       message={this.state.surveyMessage}/>
            </Grid>
        );
    }
}

const Comp = withStyles(styles)(Game);

const mapStateToProps = (appState: IAppState) => ({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)