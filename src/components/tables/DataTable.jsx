import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ 
    rows, 
    columns,
    loading,
    sx,
    onRowDoubleClick,
    onRowClick,
    slotProps,
    components,
    initialState,
    pageSizeOptions,
    autoPageSize,
    processRowUpdate,
    onProcessRowUpdateError
}) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            onRowDoubleClick={onRowDoubleClick}
            onRowClick={onRowClick}
            components={components}
            slotProps={slotProps}
            initialState={initialState}
            pageSizeOptions={pageSizeOptions}
            autoPageSize={autoPageSize}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={onProcessRowUpdateError}
         />
    )
}

export default DataTable