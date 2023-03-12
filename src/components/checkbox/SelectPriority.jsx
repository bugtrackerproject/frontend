import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const SelectPriority = (props) => {
    return (
      <Autocomplete
        defaultValue={props.defaultValue}
        disablePortal
        id="combo-box-demo"
        options={props.data}
        getOptionLabel={(option) => option}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Type" variant="standard" />}
        onChange = {props.onChange} 
        value = {props.value}
      />
    );
  }
  
  export default SelectPriority
