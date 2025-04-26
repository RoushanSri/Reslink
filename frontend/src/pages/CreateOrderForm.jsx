import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ChevronLeft, Calendar, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateOrderForm() {
    const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      responsiblePerson: 'John Doe',
      orderDate: '',
      deliveryAddress: '',
      expectedDeliveryDate: '',
      trackingNumber: '',
      remarks: '',
      items: [
        { 
          name: '',
          description: '',
          quantity: 1,
          price: 0,
          currency: 'USD',
          vendor: '',
          project: '',
          purchaseMode: 'Online',
          purpose: '',
          purchaseLink: 'https://'
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic Information", "Order Items", "Review & Submit"];
  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    total: 0
  });
  const watchItems = watch("items");
  useEffect(() => {
    if (watchItems) {
      const subtotal = watchItems.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity) || 0);
      }, 0);
      
      const tax = subtotal * 0.1;
      const total = subtotal + tax;
      
      setTotals({
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
      });
    }
  }, [watchItems]);

  const nextStep = async () => {
    let isValid = false;
    
    if (activeStep === 0) {
      isValid = await trigger(['responsiblePerson', 'orderDate', 'deliveryAddress', 'expectedDeliveryDate']);
    } else if (activeStep === 1) {
      const itemsValid = await trigger('items');
      isValid = itemsValid;
    }
    
    if (isValid && activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted successfully:", data);
    alert("Order submitted successfully!");
  };

  const addNewItem = () => {
    append({ 
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      currency: 'USD',
      vendor: '',
      project: '',
      purchaseMode: 'Online',
      purpose: '',
      purchaseLink: 'https://'
    });
  };
  const formatCurrency = (value, currency) => {
    return `${currency} ${parseFloat(value).toFixed(2)}`;
  };
  const getItemTotal = (price, quantity) => {
    return Number(price) * Number(quantity);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg">
      <div className="mb-8">
        <button 
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
          onClick={() => navigate("/")}
        >
          <ChevronLeft size={20} />
          <span>Back to Orders</span>
        </button>
        
        <h1 className="text-3xl font-bold">Create New Order</h1>
        <p className="text-gray-600">Fill in the details to create a new procurement order</p>
      </div>
      <div className="flex mb-8 p-1 bg-gray-100 rounded-xl">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center ${
              activeStep === index 
                ? 'bg-white rounded-md font-medium' 
                : 'text-gray-500'
            }`}
            onClick={() => {
              if (index < activeStep) setActiveStep(index);
            }}
            disabled={index > activeStep}
          >
            {step}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-2">Order Information</h2>
            <p className="text-gray-600 mb-6">Enter the basic details for this order</p>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2">
                  Responsible Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md ${errors.responsiblePerson ? 'border-red-500' : ''}`}
                  placeholder="Enter name"
                  {...register('responsiblePerson', { 
                    required: 'Responsible person is required' 
                  })}
                />
                {errors.responsiblePerson && (
                  <p className="text-red-500 text-sm mt-1">{errors.responsiblePerson.message}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">Automatically set to your account</p>
              </div>
              <div>
                <label className="block mb-2">
                  Order Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full p-2 border rounded-md pl-10 ${errors.orderDate ? 'border-red-500' : ''}`}
                    {...register('orderDate', { 
                      required: 'Order date is required' 
                    })}
                  />
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                {errors.orderDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.orderDate.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-2">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full p-2 border rounded-md h-24 ${errors.deliveryAddress ? 'border-red-500' : ''}`}
                  placeholder="Enter the complete delivery address"
                  {...register('deliveryAddress', { 
                    required: 'Delivery address is required',
                    minLength: {
                      value: 10,
                      message: 'Address must be at least 10 characters'
                    }
                  })}
                />
                {errors.deliveryAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-2">
                  Expected Delivery Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full p-2 border rounded-md pl-10 ${errors.expectedDeliveryDate ? 'border-red-500' : ''}`}
                    placeholder="Select date"
                    {...register('expectedDeliveryDate')}
                  />
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                {errors.expectedDeliveryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expectedDeliveryDate.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-2">
                  Tracking Number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter tracking number (if available)"
                  {...register('trackingNumber')}
                />
              </div>
              <div>
                <label className="block mb-2">
                  Remarks
                </label>
                <textarea
                  className="w-full p-2 border rounded-md h-24"
                  placeholder="Any additional information about this order"
                  {...register('remarks')}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                onClick={nextStep}
              >
                Continue to Items
              </button>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
            <div>
            <h2 className="text-xl font-bold mb-2">Order Items</h2>
            <p className="text-gray-600 mb-6">Add the items for this procurement order</p>
            </div>
            <div>
                <button
                  type="button"
                  className="flex items-center px-4 py-2 border-0 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                  onClick={addNewItem}
                >
                  <Plus size={20} className="mr-1" />
                  <span>Add Another Item</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {fields.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Item #{index + 1}</h3>
                    {fields.length > 1 && (
                      <button 
                        type="button" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => remove(index)}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.name ? 'border-red-500' : ''}`}
                        placeholder="Enter item name"
                        {...register(`items.${index}.name`, { 
                          required: 'Item name is required' 
                        })}
                      />
                      {errors.items?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter description"
                        {...register(`items.${index}.description`)}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.quantity ? 'border-red-500' : ''}`}
                        placeholder="Enter quantity"
                        {...register(`items.${index}.quantity`, { 
                          required: 'Quantity is required',
                          min: {
                            value: 1,
                            message: 'Quantity must be at least 1'
                          }
                        })}
                      />
                      {errors.items?.[index]?.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].quantity.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number" 
                        step="0.01"
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.price ? 'border-red-500' : ''}`}
                        placeholder="Enter price"
                        {...register(`items.${index}.price`, { 
                          required: 'Price is required',
                          min: {
                            value: 0,
                            message: 'Price must be 0 or greater'
                          }
                        })}
                      />
                      {errors.items?.[index]?.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].price.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.currency ? 'border-red-500' : ''}`}
                        {...register(`items.${index}.currency`, { 
                          required: 'Currency is required' 
                        })}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                      </select>
                      {errors.items?.[index]?.currency && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].currency.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Vendor <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.vendor ? 'border-red-500' : ''}`}
                        {...register(`items.${index}.vendor`, { 
                          required: 'Vendor is required' 
                        })}
                      >
                        <option value="">Select vendor</option>
                        <option value="vendor1">Vendor 1</option>
                        <option value="vendor2">Vendor 2</option>
                        <option value="vendor3">Vendor 3</option>
                      </select>
                      {errors.items?.[index]?.vendor && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].vendor.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Project <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.project ? 'border-red-500' : ''}`}
                        {...register(`items.${index}.project`, { 
                          required: 'Project is required' 
                        })}
                      >
                        <option value="">Select project</option>
                        <option value="project1">Project 1</option>
                        <option value="project2">Project 2</option>
                        <option value="project3">Project 3</option>
                      </select>
                      {errors.items?.[index]?.project && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].project.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Purchase Mode <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.purchaseMode ? 'border-red-500' : ''}`}
                        {...register(`items.${index}.purchaseMode`, { 
                          required: 'Purchase mode is required' 
                        })}
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                      </select>
                      {errors.items?.[index]?.purchaseMode && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].purchaseMode.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2">
                        Purpose <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full p-2 border rounded-md ${errors.items?.[index]?.purpose ? 'border-red-500' : ''}`}
                        placeholder="Enter purpose"
                        {...register(`items.${index}.purpose`, { 
                          required: 'Purpose is required' 
                        })}
                      />
                      {errors.items?.[index]?.purpose && (
                        <p className="text-red-500 text-sm mt-1">{errors.items[index].purpose.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block mb-2">
                      Purchase Link
                    </label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-md"
                      placeholder="https://"
                      {...register(`items.${index}.purchaseLink`)}
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-right font-medium">
                      Item Total: {watchItems[index]?.currency || 'USD'} {getItemTotal(watchItems[index]?.price || 0, watchItems[index]?.quantity || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button 
                type="button"
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                onClick={prevStep}
              >
                Back
              </button>
              
              <button
                type="button"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                onClick={nextStep}
              >
                Continue to Review
              </button>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-1">Review Order</h2>
            <p className="text-gray-600 mb-6">Review your order details before submitting</p>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border flex items-start">
              <AlertCircle size={24} className="text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Important</p>
                <p>Please review all details carefully. Once submitted, the order will be sent for approval.</p>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mb-3">Order Summary</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left border-b">Item</th>
                    <th className="p-3 text-left border-b">Quantity</th>
                    <th className="p-3 text-left border-b">Price</th>
                    <th className="p-3 text-right border-b">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {watchItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{item.name || `Item #${index + 1}`}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">
                        {formatCurrency(item.price, item.currency)}
                      </td>
                      <td className="p-3 text-right">
                        {formatCurrency(getItemTotal(item.price, item.quantity), item.currency)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b">
                    <td colSpan={3} className="p-3 text-right font-medium">Subtotal</td>
                    <td className="p-3 text-right">USD {totals.subtotal}</td>
                  </tr>
                  <tr className="border-b">
                    <td colSpan={3} className="p-3 text-right font-medium">Tax (10%)</td>
                    <td className="p-3 text-right">USD {totals.tax}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="p-3 text-right font-medium">Total</td>
                    <td className="p-3 text-right font-bold">USD {totals.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-8">
              <button 
                type="button"
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                onClick={prevStep}
              >
                Back
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
              >
                Submit Order
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}