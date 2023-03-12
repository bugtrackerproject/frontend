import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const SelectRoles = (props) => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.data}
        getOptionLabel={(option) => option}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        onChange = {props.onChange} 
        value = {props.value}
      />
    );
  }
  
  export default SelectRoles
