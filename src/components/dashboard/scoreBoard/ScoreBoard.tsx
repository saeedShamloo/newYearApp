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
import FunDialog from './FunDialog';

export type LogBoardProps = {
    classes: any,
    loading: boolean
};
export type LogBoardState = {
    players: any[],
    openDialog: boolean
};

class LogBoard extends React.Component<LogBoardProps, LogBoardState>{
    _isMounted: boolean;
    constructor(props: LogBoardProps){
        super(props);
        this.state= {
            players: [],
            openDialog: false
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.getPlayers();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getPlayers = async ()=>{
        const response: any = await ReqWithLoadingAction(request.get,true,urls.scoreBoard as string);
        const players = response.data;
        if(this._isMounted && Array.isArray(players)){
            this.setState({ players })
        }
    };

    openDialog = ()=>{
        this.setState({ openDialog: true })
    }

    closeDialog = ()=>{
        this.setState({ openDialog: false })
    }

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
                        <UpdateIcon/>
                    </Button>
                    <List className={classes.list}>
                        {this.state.players.map((player:Player, index: number) => <ScoreItem key={index}
                                                                                            onclick={this.openDialog}
                                                                                             player={player}/>)}
                    </List>
                </Paper>
                <FunDialog open={this.state.openDialog} onClose={this.closeDialog}/>
            </React.Fragment>
        )
    }
}

const Comp = withStyles(styles as any)(LogBoard);
const mapStateToProps = (appState: IAppState)=>({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)