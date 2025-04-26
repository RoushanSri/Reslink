
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

function OrderList({ rawData }) {

  const navigate= useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'order', headerName: 'Order', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'person', headerName: 'Person', flex: 1 },
    { field: 'project', headerName: 'Project', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold
          ${params.value === 'Pending' ? 'bg-yellow-500' :
            params.value === 'Completed' ? 'bg-green-500' :
            params.value === 'Cancelled' ? 'bg-red-500' :
            'bg-gray-400'
          }
        `}>
          {params.value}
        </span>
      )
    },
    { field: 'delivery', headerName: 'Delivery', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
  ];

  const handleClick = (params)=>{
    const orderId = params.row.order;
    navigate(`/${orderId}`);
  }

  const rows = rawData.map((item, index) => ({
    id: index + 1,
    order: item.order,
    date: item.date,
    person: item.person,
    project: item.project,
    status: item.status,
    delivery: item.delivery,
    total: item.total,
  }));

  return (
    <div style={{ height: 600, width: '100%' }} className="mt-4 mb-4">
      <div className="flex items-center justify-between mb-4 gap-4">
        <input type="text" placeholder="Search orders.." className="w-full border-2 p-2 rounded border-gray-100 "/>
        <div className="flex items-center space-x-2">
        <button className="px-4 py-1 border-1 border-gray-400 text-black rounded">
          Filter
        </button>
        <select name="order" id="order" className="px-6 py-1 border-1 border-gray-400 text-black rounded">
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="delivered">Delivered</option>
        </select>
        </div>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        onRowClick={handleClick}
      />
    </div>
  );
}

export default OrderList;
