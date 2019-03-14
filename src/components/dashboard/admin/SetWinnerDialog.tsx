import * as React from 'react';
import {
    Avatar, Button, Checkbox,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText,
    withStyles
} from "@material-ui/core";
import {blue, grey} from '@material-ui/core/colors';
import PersonIcon from '@material-ui/icons/Person';
import messages from "../../../constants/messages";
import {Choice} from "./addGame/AddGameChoice";
import {postRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";
import Loading from "../../share/Loading/Loading";

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    selected: {
        backgroundColor:grey[300]
    },
    listWrapper: {
        minWidth: 250,
        maxWidth: '100%',
        padding: 10
    }
};

export type SetWinnerDialogProps = {
    classes: any,
    gameId: string,
    open: boolean,
    onClose: (msg?: string)=> void,
    choices: Choice[],
}

type SetWinnerDialogState = {
    winner: number,
    isFetching: boolean
}

class SetWinnerDialog extends React.Component<SetWinnerDialogProps, SetWinnerDialogState>{
    constructor(props: SetWinnerDialogProps){
        super(props);
        this.state= {
            winner: 0,
            isFetching: false
        }
    }

    handleSelectUser = (value: number)=> ()=>{
        const {winner} = this.state;
        if(winner == value){
            this.setState({ winner:0 })
        }
        else{
            this.setState({ winner: value })
        }
    };

    handleSetWinner = async ()=>{
        const { gameId, onClose } = this.props;
        const { winner } = this.state;
        this.setState({ isFetching: true });
        const response = await postRequest(urls.finishGame as string, true,{
            gameId,
            winnerId : winner as string
        });
        this.setState({ isFetching: false,winner:0 });
        if(response.hasError){
            const msg = response.error.response.data.message;
            onClose(msg)
        }else{
            onClose(messages.generalSuccess);
        }
    };

    render(){
        const { classes,open, onClose, choices } = this.props;
        const { winner, isFetching } = this.state;
        return(
            <Dialog onClose={onClose} open={open} aria-labelledby="setWinner-dialog" onClose={onClose}>
                <DialogTitle id="setWinner-dialog">{messages.setWinner}</DialogTitle>
                <Divider/>
                <div className={classes.listWrapper}>
                    <List>
                        {choices.map((choice:Choice) => (
                            <ListItem button
                                      onClick={this.handleSelectUser(choice.value as number)}
                                      key={choice.value}
                                      className={choice.choice == winner ? classes.selected : ''}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={choice.choice} />
                                <ListItemSecondaryAction>
                                    <Checkbox checked={choice.value == winner} color={'primary'}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Button fullWidth
                            variant={'contained'}
                            disabled={isFetching || !winner}
                            color="primary"
                            onClick={this.handleSetWinner}>
                        { isFetching ? <Loading loading={isFetching}/> : messages.submit }
                    </Button>
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SetWinnerDialog);