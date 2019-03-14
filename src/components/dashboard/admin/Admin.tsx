import * as React from 'react';
import MaterialTable from 'material-table';
import AlarmIcon from '@material-ui/icons/AlarmOnOutlined';
import SetWinnerIcon from '@material-ui/icons/Check';
import BlockVoting from '@material-ui/icons/Block';
import AddIcon from '@material-ui/icons/Add';
import {Typography, Button, Dialog} from '@material-ui/core';
import AddGameForm from "./addGame/AddGameForm";
import Snack from "../../share/snack/Snack";
import {getRequest, postRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";
import messages from "../../../constants/messages";
import SetWinnerDialog from "./SetWinnerDialog";
import {Choice} from "./addGame/AddGameChoice";

export type AdminProps = {};
export type AdminState = {
    data: any[],
    openDialog: boolean,
    openSnack: boolean,
    isFetching: boolean,
    errorMessage: string,
    openErrorSnack: boolean,
    openWinnerDialog: boolean,
    winnerItem: {
        choices: Choice[],
        gameId: string
    }
}

const styles = {
    cellStyle: {fontSize: '14px'},
    headerStyle: {fontSize: '16px'}
};

class Admin extends React.Component <AdminProps, AdminState> {
    toolbar: any;

    constructor(props: AdminProps) {
        super(props);
        this.state = {
            data: [],
            openDialog: false,
            openWinnerDialog: false,
            openSnack: false,
            isFetching: true,
            errorMessage: '',
            openErrorSnack: false,
            winnerItem: {
                gameId: '',
                choices: []
            }
        };
        this.toolbar = () => <TableToolbar handleAdd={this.handleAdd}/>
    }

    componentDidMount(){
        this.getGameList();
    }

    /*================= finish game ====================*/
    handleFinishGame = (e: Event, rowData: any) => {
        const winnerItem = {
            gameId: rowData.id,
            choices: rowData.choices
        };
        this.setState({ winnerItem, openWinnerDialog:true })
    };

    closeWinnerDialog = (msg?: string)=>{
        if(msg && typeof msg == "string"){
            this.setState({ openErrorSnack: true, errorMessage: msg, openWinnerDialog: false })
        }else{
            this.setState({ openWinnerDialog: false })
        }
    };
    /*============================================*/

    handleActive = async(e: Event, rowData: any) => {
       const { id } = rowData;
       this.setState({
           isFetching: true
       });
       const response = await postRequest(urls.startGame as string, true , {id});
       // TODO: change handleActive
       this.setState((prevState: AdminState)=> ({
           ...prevState,
            isFetching: false,
           errorMessage: response.hasError ? response.error.response.data.message : '',
           openErrorSnack: response.hasError ? true : false
       }))
    };

    handleFinishVoting = async(e:Event, rowData: any)=>{
        this.setState({ isFetching: true });
        const response = await postRequest(urls.finishVoting as string , true, {
            id: rowData.id
        });
        let msg = '';

        if(response.hasError){
            msg = messages.generalError;
        }else{
            msg = messages.generalSuccess
        }
        this.setState({
            isFetching: false,
            openErrorSnack: true,
            errorMessage: msg
        })
    };

    getGameList = async()=>{
        const response = await getRequest(urls.gameList as string,true);
        this.setState({ isFetching: false,data:response.data});
    };

    handleAdd = () => {
        this.setState({openDialog: true})
    };

    handleCloseAddForm = () => {
        this.setState({openDialog: false});
    };

    handleShowSuccessMsg = () => {
        this.setState({openDialog: false, openSnack: true});
        this.getGameList();
    };

    render() {
        const { isFetching, winnerItem } = this.state;
        const columns = [
            {
                title: messages.gameName,
                field: 'name',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.description,
                field: 'description',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.correctAnswer,
                field: 'answer',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.playerCount,
                field: 'playersCount',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.winnerScore,
                field: 'anticipateWinScore',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
        ];
        const actions = [
            {
                icon: () => <AlarmIcon/>,
                tooltip: messages.makeActive,
                onClick: this.handleActive
            },
            {
                icon: () => <BlockVoting />,
                tooltip: messages.finishVoting,
                onClick: this.handleFinishVoting
            },
            {
                icon: () => <SetWinnerIcon/>,
                tooltip: messages.setWinner,
                onClick: this.handleFinishGame
            },
        ];

        console.log(this.state);

        return (
            <React.Fragment>
                <MaterialTable
                    options={{
                        search: false,
                        paging: false,
                        toolbar: true,
                        header: true
                    }}
                    isLoading={isFetching}
                    components={{
                        Toolbar: this.toolbar
                    }}
                    columns={columns}
                    data={this.state.data}
                    title= {messages.gameList}
                    actions={actions}/>
                <Dialog open={this.state.openDialog} onClose={this.handleCloseAddForm}>
                    <AddGameForm onCloseDialog={this.handleShowSuccessMsg}/>
                </Dialog>
                <SetWinnerDialog choices={winnerItem.choices}
                                 open={this.state.openWinnerDialog}
                                 gameId={winnerItem.gameId}
                                 onClose={this.closeWinnerDialog}/>
                <Snack open={this.state.openSnack} onClose={() => this.setState({openSnack: false})}
                       message={messages.addGameSuccess}/>
                <Snack open={this.state.openErrorSnack} onClose={() => this.setState({openErrorSnack: false})}
                       message={this.state.errorMessage}/>
            </React.Fragment>
        )
    }
}

export default Admin;

const TableToolbar = (props: any) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 15px 0 15px'}}>
            <Typography variant="h6"> {messages.gameList} </Typography>
            <Button variant="outlined" size="small" color="primary" onClick={props.handleAdd}>
                <AddIcon/>
            </Button>
        </div>
    );
};