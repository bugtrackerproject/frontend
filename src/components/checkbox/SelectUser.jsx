import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import './selectusers.scss'





const SelectUser = (props) => {

  return (
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={props.data}
    getOptionLabel={(option) => option.name}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="User" />}
    onChange = {props.onChange} 
    value = {props.value}
  />
  );
}


export default SelectUser