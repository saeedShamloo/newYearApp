import {blueGrey} from "@material-ui/core/colors";

export const styles = (theme: any) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        flex: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    cardHeader: {
        backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing.unit * 2,
        },
    },
    refresh: {
        position: 'absolute',
        top: 0,
        right:0,
        maxWidth:40,
        minWidth:40,
    },
    gameTitle: {
        position: 'relative'
    },


});

export const playerNameStyle = ()=>({
    avatar: {
        alignItems: 'flex-start',
        background: blueGrey[800]
    },
    playerName: {
        fontSize: '0.8em'
    },
});