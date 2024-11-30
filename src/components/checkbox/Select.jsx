import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const Select = (props) => {
    return (
      <Autocomplete
        defaultValue={props.defaultValue}
        disablePortal
        id="combo-box-demo"
        options={props.data}
            getOptionLabel={(option) => {
                // If the option is an object and has a `name` property, return it
                if (typeof option === 'object' && option.name) {
                    return option.name;
                }
                // If the option is not an object, return it directly (for types array)
                return option;
            }}
        sx={{  }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        onChange = {props.onChange} 
        value = {props.value}
      />
    );
  }
  
  export default Select
