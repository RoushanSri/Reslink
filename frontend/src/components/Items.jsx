
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, Typography, Box } from '@mui/material';

const columns = [
  {
    field: 'item',
    headerName: 'Item',
    flex: 2,
    renderCell: (params) => (
      <Box>
        <Typography fontWeight="bold">{params.row.itemName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {params.row.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Vendor: {params.row.vendor}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mode: {params.row.mode}
        </Typography>
        <Link href={params.row.productLink} target="_blank" rel="noopener">
          View product
        </Link>
      </Box>
    ),
  },
  { field: 'quantity', headerName: 'Quantity', flex: 0.5 },
  { field: 'price', headerName: 'Price', flex: 0.8 },
  { field: 'total', headerName: 'Total', flex: 0.8 },
];

const rows = [
  {
    id: 1,
    itemName: 'Arduino Mega 2560',
    description: 'Arduino Mega 2560 R3 development board',
    vendor: 'TechSupplies Inc.',
    mode: 'Online',
    productLink: 'https://example.com/product',
    quantity: 2,
    price: 'USD 39.99',
    total: 'USD 79.98',
  },
];

const Items=()=> {
  return (
    <Box sx={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        disableColumnMenu
        disableSelectionOnClick
        sx={{
          border: 0,
          '& .MuiDataGrid-cell': {
            alignItems: 'start',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          fontWeight: 'bold',
        }}
      >
        Total: <Box component="span" ml={1}>USD 79.98</Box>
      </Box>
    </Box>
  );
}

export default Items;