import * as React from 'react';
import MaterialTable from 'material-table';
import AlarmIcon from '@material-ui/icons/AlarmOnOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Button, Dialog, DialogTitle} from '@material-ui/core';
import AddGame from './AddGame';

export type AdminProps = {};
export type AdminState= {
    data: any[],
    openDialog: boolean
}

const styles = {
    cellStyle: {fontSize: '14px'},
    headerStyle: {fontSize: '16px'}
}

class Admin extends React.Component <AdminProps, AdminState> {
    toolbar: any;
    constructor(props:AdminProps){
        super(props);
        this.state = {
            data: [{gameName: 'ماست خوری'}, {gameName: 'خرپلیس'}],
            openDialog: false
        }
        this.toolbar = ()=> <TableToolbar handleAdd={this.handleAdd}/>
    }

    handleAcitve = (e:Event, rowData: any)=>{}
    handleDelete = (e:Event, rowData: any)=>{}
    handleAdd = ()=>{
            this.setState({ openDialog: true })
    }

    render() {
        return (
            <React.Fragment>
                    <MaterialTable
        options={{
            search: false,
            paging: false,
            toolbar: true,
            header:true
        }}
        components = {{
            Toolbar: this.toolbar
        }}
        columns={[
            {
                title: 'نام بازی',
                field: 'gameName',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
             {
                title: 'انجام شده',
                field: 'done',
                cellStyle: styles.cellStyle,
                headerStyle: styles.headerStyle
            },
        ]}
            data={this.state.data}
            title="لیست بازی ها"
            actions={[
            {
                icon: ()=> <AlarmIcon />,
                tooltip: 'فعال سازی',
                onClick: this.handleAcitve
            },
            {
                icon: ()=> <CloseIcon />,
                tooltip: 'حذف',
                onClick: this.handleDelete
            },
        ]}/>
            <Dialog open={this.state.openDialog} onClose={()=> this.setState({ openDialog: false })}>
            <AddGame/>
            </Dialog>
            </React.Fragment>
        )
    }
}

export default Admin;

const TableToolbar = (props: any)=> {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding:'10px 15px 0 15px' }}>
        <Typography variant="h6"> لیست بازی ها </Typography>
        <Button variant="outlined" size="small" color="primary" onClick={props.handleAdd}>
          <AddIcon />
        </Button>
    </div>
    );
}