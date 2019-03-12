import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const styles = (theme: any) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    noLabel: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  
const names = [
    'سعید شامل','دانش رضوی','حسین مسبوق','عباس پیرمرادی'
  ];

class AddressForm extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            name: [],
          };
    }

    handleChange = (event: React.ChangeEvent<any>) => {
        this.setState({ name: event.target.value });
      };

    render(){
        const { classes } = this.props;
        return (
            <div style={{ padding:15 }}>
              <Typography variant="h6" gutterBottom>
               اضافه کردن بازی جدید
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="نام بازی"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox">شرکت کننده</InputLabel>
                  <Select
                    multiple
                    value={this.state.name}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map(name => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={this.state.name.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                  />
                </Grid>
              </Grid>
            </div>
          );
    }
}

export default withStyles(styles as any)(AddressForm);