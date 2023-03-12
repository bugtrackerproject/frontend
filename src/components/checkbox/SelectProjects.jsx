import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

 const SelectProjects = (props) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.data}
      getOptionLabel={(option) => option.name}
      sx={{ minWidth: 200 }}
      renderInput={(params) => <TextField {...params} label="Project" />}
      onChange = {props.onChange} 
      value = {props.value} 
    />
  );
}

export default SelectProjects
