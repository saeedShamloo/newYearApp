import * as React from 'react';
import {
    Card,
    Avatar,
    CardActions,
    CardContent,
    Button,
    Typography,
    withStyles
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import messages from '../../../constants/messages';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelPlayGameIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import InvolveGameIcon from '@material-ui/icons/SentimentSatisfied';
import { styles } from './profileJss';
import Loading from '../../../components/share/Loading/Loading';
import {getRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";

export type ProfileProps = {
    userName: string,
    user: string,
    onLogout: () => void,
    classes: any
}

type ProileContentState = {
    requestingCancelPlay: boolean,
    showRequestResult: boolean,
    requestingUnresign: boolean,
    cancelPlayResult: string
}

class ProfileContent extends React.Component < ProfileProps,
ProileContentState > {
    constructor(props : ProfileProps) {
        super(props);
        this.state = {
            requestingCancelPlay: false,
            requestingUnresign : false,
            showRequestResult: false,
            cancelPlayResult: ''
        }
    }

    cancelPlay = async() => {
        this.setState({requestingCancelPlay: true});
        const response = await getRequest(urls.resign as string, true);
        let msg = '';
        if(response.hasError){
            msg = response.error.response.data.message;
            if(msg == 'user already resigned!'){
                msg = messages.alreadyResigned
            }
        }else {
            msg = messages.cancelPlayGameSucces
        }
        this.setState({ requestingCancelPlay: false,
            showRequestResult: true,
            cancelPlayResult: msg
        });

        setTimeout(()=>{
            this.setState({showRequestResult: false, cancelPlayResult: ''})
        },3000)
    };

    unResign = async ()=>{
        this.setState({requestingUnresign: true});
        const response = await getRequest(urls.unResign as string, true);
        let msg = '';
        if(response.hasError){
            msg = response.error.response.data.message;
            if(msg == 'user already involved!'){
                msg = messages.alreadyInvolved
            }
        }else {
            msg = messages.unResingSucces
        }
        this.setState({ requestingUnresign: false,
            showRequestResult: true,
            cancelPlayResult: msg
        });

        setTimeout(()=>{
            this.setState({showRequestResult: false, cancelPlayResult: ''})
        },3000)
    };

    render() {
        const {user, userName, classes, onLogout} = this.props;
        const {requestingCancelPlay, showRequestResult, cancelPlayResult, requestingUnresign} = this.state;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.avatarContainer}>
                        <Avatar className={classes.avatar}>
                            <PersonIcon/>
                        </Avatar>
                    </div>
                    <Typography variant="subtitle1" align='center'>
                        {messages.username}
                        : {user}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle2" align='center'>
                        {messages.fullName}
                        : {userName}
                    </Typography>
                    { showRequestResult &&
                         <Typography color="secondary" variant="subtitle2" align='center'>
                        {cancelPlayResult}
                    </Typography> }
                </CardContent>
                <CardActions className={classes.actionsWrapper}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={this.cancelPlay}
                        color="primary"
                        disabled={requestingCancelPlay || showRequestResult}
                        size="small">
                        <CancelPlayGameIcon className={classes.logOutIcon}/> {requestingCancelPlay
                            ? <Loading loading={requestingCancelPlay}/>
                            : messages.cancelAnticipate}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={this.unResign}
                        color="primary"
                        className={classes.logOutBtn}
                        disabled={requestingUnresign || showRequestResult}
                        size="small">
                        <InvolveGameIcon className={classes.logOutIcon}/>
                        {requestingUnresign
                        ? <Loading loading={requestingUnresign}/>
                        : messages.unResign}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onLogout}
                        color="secondary"
                        className={classes.logOutBtn}
                        size="small">
                        <ExitToAppIcon className={classes.logOutIcon}/> {messages.exit}
                    </Button>
                </CardActions>
            </Card>
        );
    }

}

export default withStyles(styles as any)(ProfileContent);