import * as React from 'react';
import {Button, Divider, withStyles, Paper, Typography} from "@material-ui/core";
import messages from "../../../constants/messages";
import {postRequest} from "../../../utils/fetch/fetch";
import {urls} from "../../../constants/values";
import Loading from "../../share/Loading/Loading";
import {grey} from "@material-ui/core/colors";

const styles = {
    wrapper: {
        marginTop:15,
        padding:15,
        position: 'relative'
    },
    button: {
        margin: '15px 0 0 15px'
    },
    loading: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center'
    }
};

export type PredictButtonsProps = {
    classes: any,
    showPredictMessage: (msg: string)=> void
};

type PredictButtonsState = {
  isFetching: boolean
};

class PredictButtons extends React.Component<PredictButtonsProps, PredictButtonsState>{

    constructor(props: PredictButtonsProps){
        super(props);
        this.state = {
            isFetching: false
        }
    }

    handleStart = async () => {
        const {showPredictMessage} = this.props;
        this.setState({ isFetching: true });
        // const response = await postRequest(urls.startPredict as string, true);
        // let msg = '';
        // if (response.data) {
        //
        // } else {
        //
        // }
        setTimeout(()=>{
            this.setState({isFetching: false});
            showPredictMessage(messages.generalSuccess)
        }, 2000)
    };
    handleFinish = async () => {
        const {showPredictMessage} = this.props;
        this.setState({ isFetching: true });
        // const response = await postRequest(urls.startPredict as string, true);
        // let msg = '';
        // if (response.data) {
        //
        // } else {
        //
        // }
        setTimeout(()=>{
            this.setState({isFetching: false});
            showPredictMessage(messages.generalError)
        }, 2000);
    };

    render(){
        const { classes } = this.props;
        const { isFetching } = this.state;
        return(
            <Paper elevation={2} className={classes.wrapper}>
                <Typography variant={'h6'} gutterBottom> {messages.predict} </Typography>
                <Divider/>
                <Button className={classes.button}
                        variant={'contained'}
                        color="primary"
                        onClick={this.handleStart}>
                    {messages.startPredict}
                </Button>
                <Button className={classes.button}
                        variant={'contained'}
                        color="secondary"
                        onClick={this.handleFinish}>
                    {messages.finishPredict}
                </Button>
                { isFetching ? <div className={classes.loading}><Loading loading={isFetching} size={15}/></div> : null }
            </Paper>
        );
    }
}

export default withStyles(styles)(PredictButtons);