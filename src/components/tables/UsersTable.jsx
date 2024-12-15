import * as React from "react";

import { useSelector } from "react-redux";
import UserCrudTable from "./UserCrudTable";

function createData(name, email, role, id) {
	return { name, email, role, id };
}

const UsersTable = ({ users }) => {
	const rows = users.map((user) => {
		return createData(user.name, user.email, user.role, user.id);
	});

	return rows ? (
		<UserCrudTable
			key={JSON.stringify(rows.map((row) => row.id))}
			initialRows={rows}
			sx={{
				boxShadow: 1,
				backgroundColor: "white",
			}}
			slotProps={{
				loadingOverlay: {
					variant: "linear-progress",
					noRowsVariant: "skeleton",
				},
			}}
		/>
	) : null;
};

export default UsersTable;
