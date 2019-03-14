import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Avatar, Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import CommentIcon from '@material-ui/icons/Comment';
import {PredictType} from "../User";
import { scoreItemStyles } from '../../scoreBoard/scoreBoardJSS';
import messages from "../../../../constants/messages";

export type PredictResultItemType = {
    result: number,
    surveyChoice: PredictType
}
export type PredictResultItemProps = {
    predictItem: PredictResultItemType,
    classes: any
};

const PredictResultItem = (props: PredictResultItemProps)=>{
    const { predictItem, classes } = props;

    return (
        <React.Fragment>
            <Divider/>
            <ListItem button>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                <ListItemText
                    primary={predictItem.surveyChoice.choice}
                    secondaryTypographyProps={{
                        variant: 'subtitle1'
                    }}
                    secondary={messages.surveys+ ' : ' + predictItem.result}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                        <CommentIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
};

export default withStyles(scoreItemStyles)(PredictResultItem)