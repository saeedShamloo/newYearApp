import * as React from 'react';
import MaterialTable from 'material-table';
import SetWinnerIcon from '@material-ui/icons/Check';
import BlockVoting from '@material-ui/icons/Block';
import Snack from "../../share/snack/Snack";
import {getRequest, postRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";
import messages from "../../../constants/messages";
import SetWinnerDialog from "./SetWinnerDialog";
import {Choice} from "./addGame/AddGameChoice";

export type RunningGamesTableProps = {};
export type RunningGamesTableState = {
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

class RunningGamesTable extends React.Component <RunningGamesTableProps, RunningGamesTableState> {

    constructor(props: RunningGamesTableProps) {
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
    }

    componentDidMount(){
        this.getGameList();
    }

    /*================= finish game ====================*/
    handleFinishGame = (e: Event, rowData: any) => {
        const winnerItem = {
            gameId: rowData.id,
            choices: rowData.gameDefinition.choices
        };
        this.setState({ winnerItem, openWinnerDialog:true })
    };

    closeWinnerDialog = (msg?: string)=>{
        if(msg && typeof msg == "string"){
            this.setState({ openErrorSnack: true, errorMessage: msg, openWinnerDialog: false });
            this.getGameList();
        }else{
            this.setState({ openWinnerDialog: false })
        }
    };
    /*============================================*/

    handleFinishVoting = async(e:Event, rowData: any)=>{
        this.setState({ isFetching: true });
        const response = await postRequest(urls.finishVoting as string , true, {
            id: rowData.id
        });
        let msg = '';

        if(response.hasError){
            msg = response.error.response.data.message;
        }else{
            msg = messages.generalSuccess
        }
        this.setState({
            isFetching: false,
            openErrorSnack: true,
            errorMessage: msg
        });
        this.getGameList();
    };

    getGameList = async()=>{
        this.setState({isFetching: true});
        const response = await getRequest(urls.runningGameList as string,true);
        this.setState({ isFetching: false,data:response.data});
    };

    handleAdd = () => {
        this.setState({openDialog: true})
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
                field: 'gameDefinition.description',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.correctAnswer,
                field: 'gameDefinition.answer',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.playerCount,
                field: 'gameDefinition.playersCount',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: messages.winnerScore,
                field: 'gameDefinition.anticipateWinScore',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
        ];
        const actions = [
            (rowData: any)=>({
                icon: () => <BlockVoting/>,
                tooltip: messages.finishVoting,
                onClick: this.handleFinishVoting,
                disabled: rowData.votingClosed == true
            }),
            (rowData: any)=>({
                icon: () => <SetWinnerIcon/>,
                tooltip: messages.setWinner,
                onClick: this.handleFinishGame,
                disabled: rowData.votingClosed == false || rowData.finished == true
            }),
        ];

        return (
            <div style={{marginTop: 15}}>
                <MaterialTable
                    options={{
                        search: false,
                        paging: false,
                        toolbar: true,
                        header: true
                    }}
                    isLoading={isFetching}
                    columns={columns}
                    data={this.state.data}
                    title= {messages.runningGameList}
                    actions={actions}/>
                <SetWinnerDialog choices={winnerItem.choices}
                                 open={this.state.openWinnerDialog}
                                 gameId={winnerItem.gameId}
                                 onClose={this.closeWinnerDialog}/>
                <Snack open={this.state.openSnack} onClose={() => this.setState({openSnack: false})}
                       message={messages.addGameSuccess}/>
                <Snack open={this.state.openErrorSnack} onClose={() => this.setState({openErrorSnack: false})}
                       message={this.state.errorMessage}/>
            </div>
        )
    }
}

export default RunningGamesTable;