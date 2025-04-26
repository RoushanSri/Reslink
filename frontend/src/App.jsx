import React from 'react'
import MainLayout from './pages/MainLayout.jsx'
import { Route, Routes } from 'react-router-dom'
import Orders from './pages/Orders.jsx'
import OrderList from './components/OrderList.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import Details from './components/Details.jsx'
import Items from './components/Items.jsx'
import Invoice from './components/Invoice.jsx'
import Timelines from './components/Timelines.jsx'
import CreateOrderForm from './pages/CreateOrderForm.jsx'

const rawData = [
  {
    order: "001",
    date: "2023-10-01",
    person: "John Doe",
    project: "Project Alpha",
    status: "Completed",
    address: "123 Main St, Cityville",
    tracking: "TRK123456",
    delivery: "2023-10-05",
    total: "$150.00",
  },
  {
    order: "002",
    date: "2023-10-02",
    person: "Jane Smith",
    project: "Project Beta",
    status: "In Progress",
    address: "456 Elm St, Townsville",
    tracking: "TRK654321",
    delivery: "2023-10-10",
    total: "$200.00",
  },
  {
    order: "003",
    date: "2023-10-03",
    person: "Alice Johnson",
    project: "Project Gamma",
    status: "Pending",
    address: "789 Oak St, Villageburg",
    tracking: "TRK789012",
    delivery: "2023-10-15",
    total: "$300.00",
  },
];

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Orders />}>
            <Route path="" element={<OrderList rawData={rawData}/>} />
          </Route>
          <Route path="/:id" element={<OrderDetails rawData={rawData}/>}>
            <Route path="" element={<Details />} />
            <Route path="items" element={<Items />} />
            <Route path="timeline" element={<Timelines />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="/addOrder" element={<CreateOrderForm/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

