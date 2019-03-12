import {blueGrey, grey} from "@material-ui/core/colors";

export const mainStyles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    appBar: {
        position: 'relative'
    },
    toolbarTitle: {
        flex: 1
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [
            theme
                .breakpoints
                .up(900 + theme.spacing.unit * 3 * 2)
            ]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    titleSection: {
        maxWidth: 680,
        margin: '0 auto 20px auto',
        paddingRight: 40,
        position: 'relative'
    },
    winIcon: {
        verticalAlign: 'middle',
        background: '#2aa88a',
        color: grey[50]
    },
    refresh: {
        maxWidth: 40,
        minWidth: 40,
        position: 'absolute',
        right: 0,
        top: 0
    },
});

export const cardStyles = theme => ({
    cardHeader: {
        backgroundColor: theme.palette.grey[200]
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 1
    },
    avatar: {
        height:25,
        width:25,
        background: blueGrey[800]
    },
    cardActions: {
        [
            theme
                .breakpoints
                .up('sm')
            ]: {
            paddingBottom: theme.spacing.unit * 2
        }
    },
    playerName: {
        fontSize: '.8em'
    },
    wrapper: {height: '100%', display: 'flex', flexDirection: 'column'}
});

export const playerStyle = () => ({
    avatar: {
        height:25,
        width:25,
        background: blueGrey[800]
    },
    playerName: {
        fontSize: '.8em'
    },
});
