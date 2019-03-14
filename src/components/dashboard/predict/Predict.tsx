import * as React from 'react';
import Loading from "../../share/Loading/Loading";
import User from "./User";
import {Button, List, Paper, Typography} from "@material-ui/core";
import messages from "../../../constants/messages";
import Snack from "../../share/snack/Snack";

export type PredictProps = {}
type PredictState = {
    vote: string | number,
    users: any[],
    isFetching: boolean,
    voting: boolean,
    openSnack: false,
    message: string,
}

const users = [
    {
        id: 1,
        firstName: 'اصغر',
        lastName: 'اصغری',
        userName: 'a.asghari',
        selected: false
    },
    {
        id: 2,
        firstName: 'اصغر2',
        lastName: 'اصغری2',
        userName: 'a.asghari2',
        selected: true
    }, {
        id: 3,
        firstName: 'اصغر3',
        lastName: 'اصغری3',
        userName: 'a.asghari3',
        selected: false
    },
    {
        id: 4,
        firstName: 'اصغر4',
        lastName: 'اصغری4',
        userName: 'a.asghari4',
        selected: false
    },
    {
        id: 5,
        firstName: 'اصغر5',
        lastName: 'اصغری5',
        userName: 'a.asghari5',
        selected: false
    },
    {
        id: 6,
        firstName: 'اصغر6',
        lastName: 'اصغری6',
        userName: 'a.asghari6',
        selected: false
    },
    {
        id: 7,
        firstName: 'اصغر7',
        lastName: 'اصغری7',
        userName: 'a.asghari7',
        selected: false
    },
];


class Predict extends React.Component<PredictProps, PredictState> {
    constructor(props: PredictProps) {
        super(props);
        this.state = {
            vote: '',
            users: [],
            isFetching: true,
            voting: false,
            openSnack: false,
            message: ''
        }
    }

    componentDidMount() {
        // implement request
        setTimeout(() => {
            this.setState({users: this.getUser(), vote: 1, isFetching: false})
        }, 2000)
    }

    getUser() {
        // implement request
        return users;
    }

    handleCloseSnack = () => {
        this.setState({openSnack: false})
    }

    handleClick = (value: string) => () => {
        this.setState({vote: value})
    };

    handleSubmit = () => {
        this.setState({voting: true});
        // TODO: implement request
        setTimeout(() => {
            this.setState((prevState: PredictState) => ({
                ...prevState,
                voting: false,
                openSnack: true,
                message: messages.submitVoteSuccessfully
            }))
        }, 2000)
    };

    render() {
        const {users, isFetching, vote, voting, openSnack, message} = this.state;
        if (isFetching) {
            return <div style={{marginTop:20}}><Loading loading={isFetching} size={20}/></div>
        }
        return (
            <Paper style={{padding: 15}}>
                <Typography variant="h5" gutterBottom>
                    {messages.predict}
                </Typography>
                <List dense>
                    {users.map((user: User, index: number) => <User user={user}
                                                                    selected={user.userName == vote}
                                                                    onClick={this.handleClick(user.userName)}
                                                                    key={index}/>)}
                </List>
                <Button fullWidth
                        variant={'contained'}
                        disabled={voting}
                        color="primary"
                        onClick={this.handleSubmit}>
                    {voting ? <Loading loading={voting}/> : messages.submit}
                </Button>
                <Snack open={openSnack} onClose={this.handleCloseSnack} message={message}/>
            </Paper>
        );
    }
}

export default Predict;
