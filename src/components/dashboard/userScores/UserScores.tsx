import * as React from 'react';
import {connect} from 'react-redux';
import {Button, CssBaseline, Grid, Typography, withStyles} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import {request, urls} from '../../../constants/values';
import {baseURL, ReqWithLoadingAction} from '../../../utils/fetch/fetch';
import {IAppState} from '../../../redux/types';
import ScoreCard, {ScoreType} from "./ScoreCard";
import messages from "../../../constants/messages";
import Loading from "../../share/Loading/Loading";
import { mainStyles } from './userScoreJSS';

export type UserScoresProps = {
    classes: any,
    loading?: boolean
};
export type UserScoresState = {
    scores: any[]
};

class UserScores extends React.Component <UserScoresProps, UserScoresState> {
    constructor(props: UserScoresProps) {
        super(props);
        this.state = {
            scores: [],
        }
    }

    async componentDidMount() {
        this.getScores();
    }

    getScores = async () => {
        const response: any = await ReqWithLoadingAction(request.get, true, urls.scores as string);
        if (response.data.length) {
            this.setState({scores: response.data})
        }
    };

    render() {
        const {classes, loading} = this.props;
        if (loading) {
            return <div style={{marginTop:15}}><Loading loading={loading} size={20}/></div>
        }
        return (
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
                            {messages.userScoreTitle}
                        </Typography>
                        <Button variant="contained"
                                onClick={this.getScores}
                                color="primary" className={classes.button + ' ' + classes.refresh}>
                            <UpdateIcon className={classes.rightIcon}/>
                        </Button>
                    </div>
                    <Grid container spacing={40} alignItems="stretch">
                        {this.state.scores.map((score: ScoreType, index: number) => <ScoreCard key={index}
                                                                                               score={score}/>)}
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

const Comp = withStyles(mainStyles)(UserScores);
const mapStateToProps = (appState: IAppState) => ({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)