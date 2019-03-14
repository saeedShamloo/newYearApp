import * as React from 'react';
import {Button,Typography,List,Paper,withStyles,CssBaseline} from '@material-ui/core';
import {request, urls} from './../../../constants/values';
import { IAppState } from '../../../redux/types';
import { connect } from 'react-redux';
import UpdateIcon from '@material-ui/icons/Update';
import { ReqWithLoadingAction } from '../../../utils/fetch/fetch';
import messages from "../../../constants/messages";
import { styles } from './scoreBoardJSS'
import {Player, default as ScoreItem} from "./ScoreItem";
import Loading from "../../share/Loading/Loading";

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
        const response: any = await ReqWithLoadingAction(request.get,true,urls.scoreBoard as string);
        if(response.data.length){
            this.setState({ players: response.data })
        }
    };

    render(){
        const { classes, loading } = this.props;
        if(loading){
            return <div style={{marginTop:20}}><Loading loading={loading} size={20}/></div>
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <Paper square className={classes.paper + ' ' + classes.wrapper}>
                    <Typography className={classes.text} variant="h5" gutterBottom>
                        {messages.scoreBoard}
                    </Typography>
                    <Button variant="contained"
                            onClick={this.getPlayers}
                            color="primary" className={classes.button + ' ' + classes.refresh}>
                        <UpdateIcon className={classes.rightIcon} />
                    </Button>
                    <List className={classes.list}>
                        {this.state.players.map((player:Player, index: number) => <ScoreItem key={index} player={player}/>)}
                    </List>
                </Paper>

            </React.Fragment>
        )
    }
}

const Comp = withStyles(styles)(LogBoard);
const mapStateToProps = (appState: IAppState)=>({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)