import * as React from 'react';
import Loading from "../../share/Loading/Loading";
import User, {PredictType} from "./User";
import {Button, CssBaseline, List, Paper, Typography, withStyles} from "@material-ui/core";
import messages from "../../../constants/messages";
import Snack from "../../share/snack/Snack";
import UpdateIcon from '@material-ui/icons/Update';
import {styles} from "./predictJSS";
import {getRequest, postRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";
import ErrorMessage from '../../share/messages/Error';

export type PredictProps = {
    classes: any
}

type PredictState = {
    vote: string | number,
    users: any[],
    isFetching: boolean,
    voting: boolean,
    openSnack: boolean,
    message: string,
    hasError: boolean
}

class Predict extends React.Component<PredictProps, PredictState> {
    _isMounted: boolean;
    constructor(props: PredictProps) {
        super(props);
        this.state = {
            vote: '',
            users: [],
            isFetching: true,
            voting: false,
            openSnack: false,
            message: '',
            hasError: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getUser();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getUser = async ()=> {
        this.setState({isFetching: true});
        if(this._isMounted){
            const response: any = await getRequest(urls.mineSurvey as string, true);
            if(response.hasError){
                this.setState({
                    isFetching: false,
                    hasError: true,
                })
            }else {
                const choices = response.data.choices;
                const vote = response.data.myOpinion;
                this.setState({
                    users: choices,
                    vote: vote,
                    isFetching: false
                })
            }
        }
    };

    handleCloseSnack = () => {
        this.setState({openSnack: false})
    };

    handleClick = (value: string | number) => () => {
        const {vote} = this.state;
        if (value == vote) {
            this.setState({vote: ''})
        } else {
            this.setState({vote: value})
        }
    };

    handleSubmit = async () => {
        const {vote} = this.state;
        this.setState({voting: true});
        const response: any = await postRequest(urls.surveyVote as string, true, {
            surveyId: 1 as string,
            vote: vote as string
        });
        let msg = '';
        if (response.hasError) {
            msg = response.error.response.data.message;
        } else {
            msg = messages.surverySumit
        }
        this.setState((prevState: PredictState) => ({
            ...prevState,
            voting: false,
            openSnack: true,
            message: msg
        }))
    };

    render() {
        const {users, isFetching, vote, voting, openSnack, message, hasError} = this.state;
        const {classes} = this.props;
        if (isFetching) {
            return <div style={{marginTop: 20}}><Loading loading={isFetching} size={20}/></div>
        }
        if(hasError){
            return <div style={{padding:15}}><ErrorMessage message={messages.thereIsNoSurvey}/></div>
        }
        return (
            <React.Fragment>
                <CssBaseline/>
                <Paper square className={classes.paper + ' ' + classes.wrapper}>
                    <Typography className={classes.text} variant="h5" gutterBottom>
                        {messages.predict}
                    </Typography>
                    <Button variant="contained"
                            onClick={this.getUser}
                            color="primary" className={classes.button + ' ' + classes.refresh}>
                        <UpdateIcon/>
                    </Button>
                    <React.Fragment>
                        <List className={classes.list}>
                            {users.map((predict: PredictType, index: number) => <User predict={predict}
                                                                                      selected={predict.id == vote}
                                                                                      onClick={this.handleClick(predict.id)}
                                                                                      key={index}/>)}
                        </List>
                        <Button fullWidth
                                variant={'contained'}
                                disabled={voting}
                                color="primary"
                                className={classes.surveyButton}
                                onClick={this.handleSubmit}>
                            {voting ? <Loading loading={voting}/> : messages.submit}
                        </Button>
                    </React.Fragment>
                </Paper>
                <Snack open={openSnack} onClose={this.handleCloseSnack} message={message}/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles as any)(Predict);
