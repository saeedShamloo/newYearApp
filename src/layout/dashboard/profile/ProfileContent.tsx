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
import { styles } from './profileJss';
import Loading from '../../../components/share/Loading/Loading';
import Snack from '../../../components/share/snack/Snack';

export type ProfileProps = {
    userName: string,
    user: string,
    onLogout: () => void,
    classes: any
}

type ProileContentState = {
    requestingCancelPlay: boolean,
    showRequestResult: boolean,
    cancelPlayResult: string
}

class ProfileContent extends React.Component < ProfileProps,
ProileContentState > {
    constructor(props : ProfileProps) {
        super(props);
        this.state = {
            requestingCancelPlay: false,
            showRequestResult: false,
            cancelPlayResult: ''
        }
    }

    cancelPlay = () => {
        this.setState({requestingCancelPlay: true});
        // implement request
        setTimeout(() => {
            this.setState({requestingCancelPlay: false,
                 showRequestResult: true, cancelPlayResult: messages.cancelPlayGameSucces})
        }, 2000);

        setTimeout(()=>{
            this.setState({showRequestResult: false, cancelPlayResult: ''})
        },5000)
    }

    render() {
        const {user, userName, classes, onLogout} = this.props;
        const {requestingCancelPlay, showRequestResult, cancelPlayResult} = this.state;
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
                        disabled={requestingCancelPlay}
                        size="small">
                        <CancelPlayGameIcon className={classes.logOutIcon}/> {requestingCancelPlay
                            ? <Loading loading={requestingCancelPlay}/>
                            : messages.cancelAnticipate}
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