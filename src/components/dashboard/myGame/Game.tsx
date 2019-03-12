import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Typography,
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
import {ReqWithLoadingAction} from '../../../utils/fetch/fetch';
import Loading from "../../share/Loading/Loading";
import ChoiceItem from "./ChoiceItem";
import {styles} from './gameJSS'
import ConfirmDialog from "./ConfirmDialog";
import Snack from "../../share/snack/Snack";

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
    surveyMessage: string
};

class Game extends React.Component<GameProps, GameState> {
    _isMounted: boolean;
    constructor(props: GameProps) {
        super(props);
        this._isMounted = false;
        this.state = {
            checked: '',
            dialogOpen: false,
            game: null,
            registeringSurvey: false,
            surveyMessage: '',
            openSnack: false
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
                checked: '',
                dialogOpen: false,
            })
        }
    };

    handleToggle = (value: string) => () => {
        const {checked} = this.state;
        if (checked == value) {
            this.setState({
                checked: '',
            });
        } else {
            this.setState({
                checked: value,
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
        setTimeout(()=>{
            this.setState((prevState: GameState) => ({
                ...prevState,
                registeringSurvey: false,
                dialogOpen: false,
                openSnack: true,
                surveyMessage: 'بازی اضافه شد'
            }))
        },2000)
        // const response: any = await getRequest(`${baseURL}/commitSurvey`);
        // if(response.data){
        //       this.setState((prevState: GameState) => ({
        //         ...prevState,
        //           registeringSurvey: false,
        //           dialogOpen: false,
        //           openSnack: true,
        //           surveyMessage: response.data.message
        //     }))
        // }else {
        //
        // }
    };

    render() {
        const {classes, loading} = this.props;
        const {game} = this.state;
        if (loading) {
            return <Loading loading={loading} size={20}/>
        }
        return (
            <Grid container spacing={40} alignItems="flex-end">
                <Grid item md={12} sm={12} xs={12}>
                    {game &&
                    <Card>
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
                            titleTypographyProps={{align: 'center'}}
                            subheaderTypographyProps={{align: 'center'}}
                            className={classes.cardHeader}
                        />
                        <CardContent style={{flexGrow: 1, padding: 8}}>
                            <div className={classes.cardPricing}>
                                <Typography variant="h6" color="textSecondary">
                                    شرکت کننده ها :
                                </Typography>
                            </div>
                            <List dense className={classes.root}>
                                {game.choices.map((choice: any, index: number) => <ChoiceItem choice={choice}
                                                                                              selected={this.state.checked == choice.value}
                                                                                              onClick={this.handleToggle}
                                                                                              key={index}/>)}
                            </List>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Button fullWidth
                                    variant={'contained'}
                                    disabled={!this.state.checked}
                                    color="primary"
                                    onClick={this.handleOpen}>
                                ثبت
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