import * as React from 'react';
import { BeatLoader } from 'react-spinners';
import {indigo} from "@material-ui/core/colors";

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export type LoadingProps = {
    size?: number,
    color?: string,
    loading: boolean
}

function Loading(props: LoadingProps) {
    const {size =10, color=indigo[800],loading=false} = props;
    return(
        <div style={styles}>
            <BeatLoader
                sizeUnit={"px"}
                size={size}
                color={color}
                loading={loading}/>
        </div>
    );
}

export default Loading;