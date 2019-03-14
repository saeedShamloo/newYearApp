import * as React from 'react';
import messages from '../../../constants/messages';
import {Button} from '@material-ui/core';
import ErrorMessage from '../../share/messages/Error';

const styles = {
    wrapper: {marginTop:20},
    button:{float:'left', margin:10}
};
export type ThereIsNoGameProps ={
    onRefresh: ()=> void     
};

const ThereIsNoGame = (props: ThereIsNoGameProps)=>{
    const { onRefresh } = props;
    return (
        <div style={styles.wrapper}>
            <ErrorMessage message={messages.thereIsNotActiveGame}/>
            <Button variant='contained'
                    color={'primary'}
                    style={styles.button}
                    onClick={onRefresh}>{messages.refresh}</Button>
        </div>
    );
};

export default ThereIsNoGame;

