import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import "./SelectMultiple.css"; // Make sure to create a separate CSS file

const SelectMultiple = (props) => {
	return (
		<Autocomplete
			multiple
			limitTags={3}
			id="checkboxes-tags-demo"
			options={props.data}
			disableCloseOnSelect
			getOptionLabel={(option) => option.name}
			renderOption={(props, option, { selected }) => (
				<li {...props} className="option-item">
					{/* Wrap the checkbox and name with a div that will handle the animation */}
					<div
						className={`option-item-wrapper ${
							selected ? "selected" : ""
						}`}
					>
						<Checkbox checked={selected} />
						{option.name}
					</div>
				</li>
			)}
			renderInput={(params) => (
				<TextField {...params} label={props.label} />
			)}
			onChange={props.onChange}
			value={props.value}
			disabled={!props.isProjectSelected}
		/>
	);
};

export default SelectMultiple;
