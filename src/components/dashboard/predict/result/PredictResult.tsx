import * as React from 'react';
import {Button,Typography,List,Paper,withStyles,CssBaseline} from '@material-ui/core';
import {request, urls} from '../../../../constants/values';
import { IAppState } from '../../../../redux/types';
import { connect } from 'react-redux';
import UpdateIcon from '@material-ui/icons/Update';
import { ReqWithLoadingAction } from '../../../../utils/fetch/fetch';
import messages from "../../../../constants/messages";
import Loading from "../../../share/Loading/Loading";
import { styles } from '../../scoreBoard/scoreBoardJSS'
import PredictResultItem , {PredictResultItemType} from "./PredictResultItem";

export type PredictResultProps = {
    classes: any,
    loading: boolean
};
export type PredictResultState = {
    predicts: any[]
};

class PredictResult extends React.Component<PredictResultProps, PredictResultState>{
    constructor(props: PredictResultProps){
        super(props);
        this.state= {
            predicts: []
        }
    }

    componentDidMount(){
        this.result();
    }

    result = async ()=>{
        const response: any = await ReqWithLoadingAction(request.get,true,urls.surveyResult as string);
        if(response.data){
            this.setState({ predicts: response.data.surveyChoiceResults })
        }
    };

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
                            onClick={this.result}
                            color="primary"
                            className={classes.button + ' ' + classes.refresh}>
                        <UpdateIcon/>
                    </Button>
                    <List className={classes.list}>
                        {this.state.predicts.map((predictItem:PredictResultItemType, index: number) => <PredictResultItem key={index}
                                                                                                                          predictItem={predictItem}/>)}
                    </List>
                </Paper>
            </React.Fragment>
        )
    }
}

const Comp = withStyles(styles)(PredictResult);
const mapStateToProps = (appState: IAppState)=>({
    loading: appState.loading
});

export default connect(mapStateToProps)(Comp)