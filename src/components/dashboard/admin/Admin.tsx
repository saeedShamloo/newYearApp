import * as React from 'react';
import MaterialTable from 'material-table';
import AlarmIcon from '@material-ui/icons/AlarmOnOutlined';
import SetWinnerIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import {Typography, Button, Dialog} from '@material-ui/core';
import AddGameForm from "./addGame/AddGameForm";
import Snack from "../../share/snack/Snack";
import {getRequest, postRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";
import Loading from "../../share/Loading/Loading";

export type AdminProps = {};
export type AdminState = {
    data: any[],
    openDialog: boolean,
    openSnack: boolean,
    isFetching: boolean
}

const styles = {
    cellStyle: {fontSize: '14px'},
    headerStyle: {fontSize: '16px'}
}

class Admin extends React.Component <AdminProps, AdminState> {
    toolbar: any;

    constructor(props: AdminProps) {
        super(props);
        this.state = {
            data: [],
            openDialog: false,
            openSnack: false,
            isFetching: true
        }
        this.toolbar = () => <TableToolbar handleAdd={this.handleAdd}/>
    }

    componentDidMount(){
        this.getGameList();
    }

    handleSetWinner = (e: Event, rowData: any) => {
        console.log(rowData);
    };

    handleAcitve = async(e: Event, rowData: any) => {
       const { id } = rowData;
       const response = await postRequest(urls.startGame as string, true , {id});
       console.log(response);
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
        const { isFetching } = this.state;
        const columns = [
            {
                title: 'نام بازی',
                field: 'name',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: 'توضیحات',
                field: 'description',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: 'جواب صحیح',
                field: 'answer',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: 'تعداد شرکت کننده',
                field: 'playersCount',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
            {
                title: 'امتیاز برنده',
                field: 'anticipateWinScore',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
        ];
        const actions = [
            {
                icon: () => <AlarmIcon/>,
                tooltip: 'فعال سازی',
                onClick: this.handleAcitve
            },
            {
                icon: () => <SetWinnerIcon/>,
                tooltip: 'تعیین برنده',
                onClick: this.handleSetWinner
            },
        ];

        if(isFetching){
            return (
                <Loading loading={isFetching}/>
            );
        }

        return (
            <React.Fragment>
                <MaterialTable
                    options={{
                        search: false,
                        paging: false,
                        toolbar: true,
                        header: true
                    }}
                    components={{
                        Toolbar: this.toolbar
                    }}
                    columns={columns}
                    data={this.state.data}
                    title="لیست بازی ها"
                    actions={actions}/>
                <Dialog open={this.state.openDialog} onClose={this.handleCloseAddForm}>
                    <AddGameForm onCloseDialog={this.handleShowSuccessMsg}/>
                </Dialog>
                <Snack open={this.state.openSnack} onClose={() => this.setState({openSnack: false})}
                       message={'بازی با موفقیت افزوده شد'}/>
            </React.Fragment>
        )
    }
}

export default Admin;

const TableToolbar = (props: any) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 15px 0 15px'}}>
            <Typography variant="h6"> لیست بازی ها </Typography>
            <Button variant="outlined" size="small" color="primary" onClick={props.handleAdd}>
                <AddIcon/>
            </Button>
        </div>
    );
}