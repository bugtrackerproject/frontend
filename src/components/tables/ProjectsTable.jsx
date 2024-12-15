import * as React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProjectCrudTable from "./ProjectCrudTable";

function QuickSearchToolbar() {
	return (
		<Box
			sx={{
				textAlign: "right",
				p: 0.5,
				pb: 0,
			}}
		>
			<GridToolbarQuickFilter
				quickFilterParser={(searchInput) =>
					searchInput
						.split(",")
						.map((value) => value.trim())
						.filter((value) => value !== "")
				}
			/>
		</Box>
	);
}

function createData(name, description, createdAt, updatedAt, id) {
	return { name, description, createdAt, updatedAt, id };
}

const ProjectsTable = ({ projects, deleteProject }) => {
	let rows = [];
	if (projects) {
		rows = projects.map((project) => {
			return createData(
				project.name,
				project.description,
				project.createdAt,
				project.updatedAt,
				project.id
			);
		});
	}

	return (
		<ProjectCrudTable
			initialRows={rows}
			sx={{
				"& .MuiDataGrid-cell:hover": {
					color: "primary.main",
				},
				"& .MuiDataGrid-virtualScroller": {
					overflow: "auto", // Enable overflow for scrolling
				},
			}}
			slotProps={{
				loadingOverlay: {
					variant: "linear-progress",
					noRowsVariant: "skeleton",
				},
			}}
			initialState={{
				sorting: {
					sortModel: [{ field: "updatedAt", sort: "desc" }],
				},
			}}
			onDelete={deleteProject}
			/*onRowDoubleClick={(params) => navigate(`/projects/${params.row.id}`)}*/
			components={{
				Toolbar: QuickSearchToolbar,
				NoRowsOverlay: () => (
					<Stack
						height="100%"
						alignItems="center"
						justifyContent="center"
					>
						User has no tickets
					</Stack>
				),
			}}
		/>
	);
};

export default ProjectsTable;
