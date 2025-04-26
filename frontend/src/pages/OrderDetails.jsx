import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import StatusUpdates from "../components/StatusUpdates";
import OrderSummary from "../components/OrderSummary";

function OrderDetails({ rawData }) {

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const getOrder = rawData.find((order) => order.order === id);
    if (getOrder) {
      setOrder(getOrder);
    } else {
      setOrder(null);
    }
  }, []);

  const statusData = {
    currentStatus: order?.status,
    expectedDelivery: order?.delivery,
    invoiceStatus: "Pending"
  };

  const orderData = {
    subtotal: 79.98,
    shipping: "Free",
    tax: 8.00,
    total: 87.98
  };

  return (
    <div className="h-fit w-full p-4 md:px-24">
      <div className="flex items-center w-full h-4">
        <Link to={"/"}>
          <div className="w-fit p-2 text-sm flex gap-2 items-center font-semibold hover:bg-gray-100 rounded">
            <MdArrowBack />
            <span className="flex justify-center items-start">Back to Order</span>
          </div>
        </Link>
      </div>
      <div className="md:flex w-full h-full">
        <div className="flex flex-col items-center w-full h-full p-4">
          <div className="flex items-center justify-between w-full mb-2">
            <div>
              <h1 className="text-2xl font font-semibold">{order?.order}</h1>
              <div className="flex gap-2 mt-2 justify-center items-center">
                <div className="bg-indigo-300 text-white px-3 rounded-full">{order?.status}</div>
                <span className="text-gray-700">Expected Delivery: {order?.delivery}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-gray-600">Order placed on</span>
              <span className="font-semibold text-xl">{order?.date}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full p-1 bg-gray-100 mb-4">
            <Link to={``} className={`p-1 ${location.pathname==`/${order?.order}`?"bg-white":""} w-full text-center rounded`}>
              Details
            </Link>
            <Link to={`items`} className={`p-1 ${location.pathname==`/${order?.order}/items`?"bg-white":""} w-full text-center rounded`}>
              Items
            </Link>
            <Link to={`timeline`} className={`p-1 ${location.pathname==`/${order?.order}/timeline`?"bg-white":""} w-full text-center rounded`}>
              Timeline
            </Link>
            <Link to={`invoice`} className={`p-1 ${location.pathname==`/${order?.order}/invoice`?"bg-white":""} w-full text-center rounded`}>
              Invoice
            </Link>
          </div>
          <Outlet context={{ order }} />
        </div>
        <div className="flex flex-col md:w-2/5 w-full">
        <div className="flex flex-col items-center w-full h-fit p-4 bg-white rounded shadow-lg">
          <h1 className="text-2xl w-full font-semibold flex text-start">Order Actions
          </h1>
          <div className="flex flex-col items-center justify-center w-full mt-4 p-2 bg-white">
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-white bg-black rounded">
              Edit Order
            </button>
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-black rounded hover:bg-gray-200">
              Track Shipment
            </button>
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-black rounded hover:bg-gray-200">
              Download Invoice
            </button>
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-black rounded hover:bg-gray-200">
              Print Order
            </button>
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-black rounded hover:bg-gray-200">
              Share Order
            </button>
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-white bg-green-400 rounded">
              Mark as Delivered
            </button>
            <button className="w-full px-4 py-2 border-1 mt-2 border-gray-400 ml-4 text-start text-white rounded bg-red-400">
              Cancel Order
            </button>
          </div>
        </div>
        <StatusUpdates statusData={statusData}/>
        <OrderSummary orderData={orderData} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;

// import React from "react";
// import { MdOutlineWatchLater } from "react-icons/md";
// import { FaShippingFast } from "react-icons/fa";
// import { IoDocumentTextOutline } from "react-icons/io5";

// function OrderSummary({ orderData }) {
//   // Default values in case props aren't provided
//   const { subtotal = 79.98, shipping = "Free", tax = 8.00, total = 87.98 } = orderData || {};
  
//   return (
//     <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
//       <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
//       <div className="space-y-3">
//         <div className="flex justify-between">
//           <span className="text-gray-600">Subtotal</span>
//           <span>USD {subtotal.toFixed(2)}</span>
//         </div>
        
//         <div className="flex justify-between">
//           <span className="text-gray-600">Shipping</span>
//           <span>{shipping}</span>
//         </div>
        
//         <div className="flex justify-between">
//           <span className="text-gray-600">Tax</span>
//           <span>USD {tax.toFixed(2)}</span>
//         </div>
        
//         <div className="border-t border-gray-200 pt-3 mt-3"></div>
        
//         <div className="flex justify-between font-bold">
//           <span>Total</span>
//           <span>USD {total.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatusUpdates({ statusData }) {
//   const { 
//     currentStatus = "In Transit", 
//     expectedDelivery = "April 22, 2023", 
//     invoiceStatus = "Pending" 
//   } = statusData || {};
  
//   return (
//     <div className="rounded-lg border border-gray-200 p-6 shadow-sm mt-4">
//       <h2 className="text-2xl font-bold mb-4">Status Updates</h2>
      
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
//             <MdOutlineWatchLater className="text-blue-600 text-xl" />
//           </div>
//           <div>
//             <p className="font-semibold text-lg">Current Status</p>
//             <p className="text-gray-600">{currentStatus}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <div className="bg-green-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
//             <FaShippingFast className="text-green-600 text-xl" />
//           </div>
//           <div>
//             <p className="font-semibold text-lg">Expected Delivery</p>
//             <p className="text-gray-600">{expectedDelivery}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <div className="bg-yellow-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
//             <IoDocumentTextOutline className="text-yellow-600 text-xl" />
//           </div>
//           <div>
//             <p className="font-semibold text-lg">Invoice Status</p>
//             <p className="text-gray-600">{invoiceStatus}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Example of how to use these components together
// function OrderDetails() {
  

//   return (
//     <div className="max-w-md mx-auto">
//       <OrderSummary orderData={orderData} />
//       <StatusUpdates statusData={statusData} />
//     </div>
//   );
// }

// export { OrderSummary, StatusUpdates, OrderDetails };
