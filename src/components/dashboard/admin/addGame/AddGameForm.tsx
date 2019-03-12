import * as React from 'react';
import {Grid,Typography,TextField,FormControlLabel,Checkbox, Button} from '@material-ui/core';
import AddGameChoice, {Choice} from "./AddGameChoice";
import {postRequest} from "../../../../utils/fetch/fetch";
import {urls} from "../../../../constants/values";
import Loading from '../../../share/Loading/Loading';

export type AddGameFormProps = {
    classes?: any,
    onCloseDialog: ()=> void
}

type AddGameFormState = {
    values: any,
    choices: Choice[],
    isFetching: boolean
}

class AddGameForm extends React.Component<AddGameFormProps, AddGameFormState>{
    defaultState: AddGameFormState;
    constructor(props: AddGameFormProps){
        super(props);
        this.defaultState = {
            values: {
                name: '',
                answer: '',
                anticipateWinSoccer: '',
                anticipateLoseSoccer: '',
                maxWinners: '',
                description: '',
                playersCount: '',
                isPhysicalGame: true,
            },
            choices: [],
            isFetching: false
        };
        this.state = this.defaultState
    }

    handleInputChange = (event: Event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState: AddGameFormState) =>({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
    };

    handleSubmit = async(e:Event)=>{
        e.preventDefault();
        const { onCloseDialog } = this.props;
        const { values, choices } = this.state;
        this.setState({ isFetching: true });
        let params = values;
        if(!values.isPhysicalGame){
            params.playersCount = 0;
            params = { ...params, choices}
        }
        const response = await postRequest(urls.addGame as string,true,params);
        if(response.data= 'ok'){
            this.setState((prevState: AddGameFormState)=> ({
                ...prevState,
                ...this.defaultState
            }));
            onCloseDialog();
        }
    };

    handleAddChoice = (choice: Choice)=>{
        const { choices } = this.state;
        const newChoice = [...choices, choice];
      this.setState((prevState: AddGameFormState)=> ({
          ...prevState,
          choices: newChoice
      }))
    };

    handleDeleteChoice = (key: string)=>{
        const { choices } = this.state;
        const index = choices.findIndex((choice:Choice)=> choice.value == key);
        const newChoice = [...choices];
        newChoice.splice(index,1);
        this.setState((prevState:AddGameFormState)=> ({...prevState, choices: newChoice}));
    };

    render(){
        const { values, choices,isFetching } = this.state;

        return (
            <div style={{padding:15}}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        اضافه کردن بازی جدید
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary"
                                               name="isPhysicalGame"
                                               checked={values.isPhysicalGame}
                                               onChange={this.handleInputChange}/>}
                            label="بازی فیزیکی"
                        />
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="نام بازی"
                                fullWidth
                                value={values.name}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        {
                            values.isPhysicalGame &&
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="playersCount"
                                    name="playersCount"
                                    label="تعداد مسابقه دهندگان"
                                    fullWidth
                                    value={values.playersCount}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                        }
                        {
                            !values.isPhysicalGame &&
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="answer"
                                    name="answer"
                                    label="پاسخ"
                                    fullWidth
                                    multiline={true}
                                    value={values.answer}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                        }

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="anticipateWinSoccer"
                                name="anticipateWinSoccer"
                                label="امتیاز پیش بینی درست"
                                fullWidth
                                type={'number'}
                                value={values.anticipateWinSoccer}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="anticipateLoseSoccer"
                                name="anticipateLoseSoccer"
                                label="امتیاز شرکت در پیش بینی"
                                fullWidth
                                type={'number'}
                                value={values.anticipateLoseSoccer}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {/*<TextField*/}
                                {/*required*/}
                                {/*id="maxWinners"*/}
                                {/*name="maxWinners"*/}
                                {/*label="حداکثر تعداد برندگان"*/}
                                {/*fullWidth*/}
                                {/*type={'number'}*/}
                                {/*value={values.maxWinners}*/}
                                {/*onChange={this.handleInputChange}*/}
                            {/*/>*/}
                        </Grid>
                        { !values.isPhysicalGame && <AddGameChoice onAddGameChoice={this.handleAddChoice}
                                                                   onDeleteChoice={this.handleDeleteChoice}
                                                                   choices={choices}/> }
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="توضیحات"
                                fullWidth
                                value={values.description}
                                multiline={true}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} style={{margin: 15}}>
                            <Button type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isFetching}
                                    color="primary">{ isFetching ? <Loading loading={true}/> : 'ثبت بازی' }</Button>
                        </Grid>
                    </Grid>
                    </form>
                </React.Fragment>
            </div>
        );
    }
}

export default AddGameForm;