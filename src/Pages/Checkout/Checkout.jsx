import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Payment from "../Payment/Payment";

const Checkout = () => {
  // const addressOptions = [
  //   {
  //     id: 1,
  //     label: "123 Main St, CityA (Default)",
  //     deliveryTime: "Delivery: 2-7 Days",
  //   },
  //   {
  //     id: 2,
  //     label: "456 Oak St, CityB",
  //     deliveryTime: "Delivery: 3-5 Days",
  //   },
  //   // Add more addresses as needed
  // ];

  const [address, setAddress] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [cartItems, setCartItems] = useState([]);

  const quantitiesInCart = useSelector((state) => state.cart.quantities);

  const [pricingBreakdown, setPricingBreakdown] = useState({
    total: 0,
    shipping: 0,
    discount: 0,
  });

  const [discountPercent, setDiscountPercent] = useState(15);
  const [ShippingPercent, setShippingPercent] = useState(5);

  const calculateSubtotal = () => {
    const totalItems = cartItems.map((item) => ({
      price: item.productDetails.price,
      quantity: quantitiesInCart.find(
        (product) => product.id === item.productDetails._id
      )?.quantity,
    }));

    const totalPrice = totalItems.reduce((acc, value) => {
      return acc + value.price * value.quantity;
    }, 0);

    const discountPrice = (totalPrice * discountPercent) / 100;
    const shippingPrice = (totalPrice * ShippingPercent) / 100;

    setPricingBreakdown((prev) => ({
      ...prev,
      total: totalPrice.toFixed(2),
      discount: discountPrice.toFixed(2),
      shipping: shippingPrice.toFixed(2),
    }));
  };

  const fetchCartData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/app/cart/getCartData`,
      {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      }
    );

    setCartItems(() => response.data.result);
  };

  const fetchAddressData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/app/user/getAddress`,
      {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      }
    );

    console.log(response.data.result[0], "address");

    setAddress(() => Array(response.data.result[0]));
  };

  const totalPrice = () => {
    return (
      parseInt(pricingBreakdown.total) +
      parseInt(pricingBreakdown.shipping) -
      parseInt(pricingBreakdown.discount)
    );
  };
  useEffect(() => {
    fetchCartData();
    fetchAddressData();
  }, []);
  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-15 xl:px-20">
        <div className="flex justify-between w-full mt-4 p-2 text-xs  sm:text-base  ">
          <div className="left-0">
            <Link
              to="/viewcart"
              className="text-gray-900 font-bold ml-auto flex items-center gap-2"
            >
              <FaArrowLeft />
              viewcart
            </Link>
          </div>

          <div className=" relative">
            <ul className="relative flex w-fit h-fit items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  1
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid sm:px-10 lg:grid-cols-3 lg:px-20 xl:px-20">
        <div className="px-4 pt-4 col-span-2">
          <p className="text-lg font-medium">Order Summary</p>

          {/* order section */}
          <div className="mt-4 space-y-3 rounded-lg border  bg-white px-2 py-2 sm:px-6">
            {/* <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-16 w-16 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-2">
                <span className="font-semibold text-sm">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400 text-sm">
                  42EU - 8.5US
                </span>
                <p className="text-sm font-bold ">&#8377;138.99</p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-16 w-16 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-2">
                <span className="font-semibold text-sm">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400 text-sm">
                  42EU - 8.5US
                </span>
                <p className="mt-auto text-sm font-bold ">&#8377;238.99</p>
              </div>
            </div> */}

            {cartItems?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <img
                    className="m-2 h-16 w-16 rounded-md border object-cover object-center"
                    src={item.productDetails.images[0]}
                    alt={item.productDetails?.name}
                  />
                  <div className="flex max-w-5xl w-full flex-col px-4 py-2">
                    <span className="font-semibold text-sm">
                      {item.productDetails?.name}
                    </span>
                    <span className="float-right text-gray-400 text-sm">
                      {item.productDetails.variations?.sizes[0]?.XS}
                    </span>
                    <p className="mt-auto text-sm font-bold ">
                      &#8377;
                      {(
                        item.productDetails.price *
                        (quantitiesInCart.find(
                          (product) => product.id === item.productDetails._id
                        )?.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* payment Details */}
        <div className="mt-10 bg-white px-4 pt-8 lg:mt-0 ">
          <div className="">
            <div className="container mx-auto">
              <h1 className="text-lg  mb-4">Select your Address</h1>
              <form className="mt-2 grid gap-4">
                {/* <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-2"
                for="radio_1"
              >
                
                <div className="ml-10">
                  <span className="mt-1 font-semibold text-sm">
                    Ekart Delivery
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-7 Days
                  </p>
                </div>
              </label>
            </div> */}
                {/* <div className="grid grid-cols-2 gap-2">
                  {addressOptions.map((address) => (
                    <div
                      key={add._id}
                      className=" mb-2 flex flex-row-reverse rounded-md justify-between items-center ring-1 ring-gray-400 peer-checked:ring-2 peer-checked:ring-gray-700"
                    >
                      <input
                        className="peer hidden"
                        id={`radio_${add._id}`}
                        type="radio"
                        name="radio"
                        checked={selectedAddress === add._id}
                        onClick={() => setSelectedAddress(add._id)}
                      />
                      <span className="peer-checked:ring-2 peer-checked:ring-gray-700 box-content block h-3 w-3 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        className={`peer-checked:ring-2 peer-checked:ring-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-2 ${
                          selectedAddress === add._id ? "bg-gray-50" : ""
                        }`}
                        htmlFor={`radio_${add._id}`}
                      >
                        <div>
                          <span className="mt-1 font-semibold text-sm">
                            {address.label}
                          </span>
                          <p className="text-slate-500 text-sm leading-6">
                            {address.deliveryTime}
                          </p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div> */}

                <div className="grid grid-cols-2 gap-2 ">
                  {address?.map((add, index) => (
                    <div
                      key={index}
                      className={` flex flex-row-reverse rounded-md items-center justify-between px-2 ring-1 ring-gray-400 cursor-pointer ${
                        selectedAddress === add?._id
                          ? "ring-2 ring-gray-700"
                          : ""
                      }`}
                      onClick={() => setSelectedAddress(add?._id)}
                    >
                      <span
                        className={`box-content block h-3 w-3 rounded-full border-8 border-gray-300 bg-white ${
                          selectedAddress === add?._id
                            ? "ring-2 ring-gray-700"
                            : "peer-checked:ring-2 peer-checked:ring-gray-700"
                        }`}
                      ></span>

                      <div>
                        <span className="font-semibold text-sm">
                          {`${add?.house} ${add?.city} `}
                        </span>
                        <p className="text-slate-500 text-sm leading-6">
                          {address?.deliveryTime}
                        </p>
                      </div>
                    </div>
                  ))}

                  {address?.length === 2 ? (
                    ""
                  ) : (
                    <span className=" ring-1 rounded-md flex items-center justify-center p-0">
                      + Create new address
                    </span>
                  )}
                </div>

                {/* new div for the cart */}
              </form>
            </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-lg  text-gray-900">
                  &#8377;{pricingBreakdown.total}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-lg  text-gray-900">
                  + &#8377;{pricingBreakdown.shipping}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Discount</p>
                <p className="text-sm font-semibold text-gray-900">
                  - &#8377;{pricingBreakdown.discount}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xl font-medium text-gray-900">Total</p>
              <p className="text-xl font-semibold text-gray-900">
                &#8377; {totalPrice()}
              </p>
            </div>
          </div>

          {selectedAddress === null ? (
            <button
              disabled
              className=" flex flex-1 my-4 justify-center items-center w-full rounded-md  bg-gray-200 text-gray-900 px-6 py-3 font-medium ring-2 ring-gray-900"
            >
              Place Order
            </button>
          ) : (
            <Link
              to={`${import.meta.env.VITE_PAYMENT_PAGE}/${totalPrice()}`}
              target="_blank"
              totalPrice={totalPrice}
              className=" flex flex-1 my-4 justify-center items-center w-full rounded-md  bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Place Order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;






























// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import Payment from "../Payment/Payment";

// const Checkout = () => {
//   // const addressOptions = [
//   //   {
//   //     id: 1,
//   //     label: "123 Main St, CityA (Default)",
//   //     deliveryTime: "Delivery: 2-7 Days",
//   //   },
//   //   {
//   //     id: 2,
//   //     label: "456 Oak St, CityB",
//   //     deliveryTime: "Delivery: 3-5 Days",
//   //   },
//   //   // Add more addresses as needed
//   // ];

//   const [address, setAddress] = useState([]);

//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const [cartItems, setCartItems] = useState([]);

//   const quantitiesInCart = useSelector((state) => state.cart.quantities);

//   const [pricingBreakdown, setPricingBreakdown] = useState({
//     total: 0,
//     shipping: 0,
//     discount: 0,
//   });

//   const [discountPercent, setDiscountPercent] = useState(15);
//   const [ShippingPercent, setShippingPercent] = useState(5);

//   const calculateSubtotal = () => {
//     const totalItems = cartItems.map((item) => ({
//       price: item.productDetails.price,
//       quantity: quantitiesInCart.find(
//         (product) => product.id === item.productDetails._id
//       )?.quantity,
//     }));

//     const totalPrice = totalItems.reduce((acc, value) => {
//       return acc + value.price * value.quantity;
//     }, 0);

//     const discountPrice = (totalPrice * discountPercent) / 100;
//     const shippingPrice = (totalPrice * ShippingPercent) / 100;

//     setPricingBreakdown((prev) => ({
//       ...prev,
//       total: totalPrice.toFixed(2),
//       discount: discountPrice.toFixed(2),
//       shipping: shippingPrice.toFixed(2),
//     }));
//   };

//   const fetchCartData = async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/app/cart/getCartData`,
//       {
//         headers: {
//           token: localStorage.getItem("authToken"),
//         },
//       }
//     );

//     setCartItems(() => response.data.result);
//   };

//   const fetchAddressData = async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/app/user/getAddress`,
//       {
//         headers: {
//           token: localStorage.getItem("authToken"),
//         },
//       }
//     );

//     console.log(response.data.result[0], "address");

//     if(response.data.result && response.data.result.length>0)
//     {
     
//       setAddress(()=>Array(response.data.result[0]))
//     }

//     else
//     {
    
//       setAddress(()=>([]))
//     }

//     // setAddress(() => Array(response.data.result[0]));
//   };

//   const totalPrice = () => {
//     return (
//       parseInt(pricingBreakdown.total) +
//       parseInt(pricingBreakdown.shipping) -
//       parseInt(pricingBreakdown.discount)
//     );
//   };
//   useEffect(() => {
//     fetchCartData();
//     fetchAddressData();
//   }, []);
//   useEffect(() => {
//     calculateSubtotal();
//   }, [cartItems]);

//   return (
//     <div>
//       <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-15 xl:px-20">
//         <div className="flex justify-between w-full mt-4 p-2 text-xs  sm:text-base  ">
//           <div className="left-0">
//             <Link
//               to="/viewcart"
//               className="text-gray-900 font-bold ml-auto flex items-center gap-2"
//             >
//               <FaArrowLeft />
//               viewcart
//             </Link>
//           </div>

//           <div className=" relative">
//             <ul className="relative flex w-fit h-fit items-center justify-between space-x-2 sm:space-x-4">
//               <li className="flex items-center space-x-3 text-left sm:space-x-4">
//                 <a
//                   className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
//                   href="#"
//                 >
//                   1
//                 </a>
//                 <span className="font-semibold text-gray-900">Shipping</span>
//               </li>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//               <li className="flex items-center space-x-3 text-left sm:space-x-4">
//                 <a
//                   className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
//                   href="#"
//                 >
//                   2
//                 </a>
//                 <span className="font-semibold text-gray-500">Payment</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="grid sm:px-10 lg:grid-cols-3 lg:px-20 xl:px-20">
//         <div className="px-4 pt-4 col-span-2">
//           <p className="text-lg font-medium">Order Summary</p>

//           {/* order section */}
//           <div className="mt-4 space-y-3 rounded-lg border  bg-white px-2 py-2 sm:px-6">
//             {/* <div className="flex flex-col rounded-lg bg-white sm:flex-row">
//               <img
//                 className="m-2 h-16 w-16 rounded-md border object-cover object-center"
//                 src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
//                 alt=""
//               />
//               <div className="flex w-full flex-col px-4 py-2">
//                 <span className="font-semibold text-sm">
//                   Nike Air Max Pro 8888 - Super Light
//                 </span>
//                 <span className="float-right text-gray-400 text-sm">
//                   42EU - 8.5US
//                 </span>
//                 <p className="text-sm font-bold ">&#8377;138.99</p>
//               </div>
//             </div>

//             <div className="flex flex-col rounded-lg bg-white sm:flex-row">
//               <img
//                 className="m-2 h-16 w-16 rounded-md border object-cover object-center"
//                 src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
//                 alt=""
//               />
//               <div className="flex w-full flex-col px-4 py-2">
//                 <span className="font-semibold text-sm">
//                   Nike Air Max Pro 8888 - Super Light
//                 </span>
//                 <span className="float-right text-gray-400 text-sm">
//                   42EU - 8.5US
//                 </span>
//                 <p className="mt-auto text-sm font-bold ">&#8377;238.99</p>
//               </div>
//             </div> */}

//             {cartItems?.map((item) => {
//               return (
//                 <div
//                   key={item._id}
//                   className="flex flex-col rounded-lg bg-white sm:flex-row"
//                 >
//                   <img
//                     className="m-2 h-16 w-16 rounded-md border object-cover object-center"
//                     src={item.productDetails.images[0]}
//                     alt={item.productDetails?.name}
//                   />
//                   <div className="flex max-w-5xl w-full flex-col px-4 py-2">
//                     <span className="font-semibold text-sm">
//                       {item.productDetails?.name}
//                     </span>
//                     <span className="float-right text-gray-400 text-sm">
//                       {item.productDetails.variations?.sizes[0]?.XS}
//                     </span>
//                     <p className="mt-auto text-sm font-bold ">
//                       &#8377;
//                       {(
//                         item.productDetails.price *
//                         (quantitiesInCart.find(
//                           (product) => product.id === item.productDetails._id
//                         )?.quantity || 1)
//                       ).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* payment Details */}
//         <div className="mt-10 bg-white px-4 pt-8 lg:mt-0 ">
//           <div className="">
//             <div className="container mx-auto">
//               <h1 className="text-lg  mb-4">Select your Address</h1>
//               <form className="mt-2 grid gap-4">
//                 {/* <div className="relative">
//               <input
//                 className="peer hidden"
//                 id="radio_1"
//                 type="radio"
//                 name="radio"
//                 checked
//               />
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
//               <label
//                 className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-2"
//                 for="radio_1"
//               >
                
//                 <div className="ml-10">
//                   <span className="mt-1 font-semibold text-sm">
//                     Ekart Delivery
//                   </span>
//                   <p className="text-slate-500 text-sm leading-6">
//                     Delivery: 2-7 Days
//                   </p>
//                 </div>
//               </label>
//             </div> */}
//                 {/* <div className="grid grid-cols-2 gap-2">
//                   {addressOptions.map((address) => (
//                     <div
//                       key={add._id}
//                       className=" mb-2 flex flex-row-reverse rounded-md justify-between items-center ring-1 ring-gray-400 peer-checked:ring-2 peer-checked:ring-gray-700"
//                     >
//                       <input
//                         className="peer hidden"
//                         id={`radio_${add._id}`}
//                         type="radio"
//                         name="radio"
//                         checked={selectedAddress === add._id}
//                         onClick={() => setSelectedAddress(add._id)}
//                       />
//                       <span className="peer-checked:ring-2 peer-checked:ring-gray-700 box-content block h-3 w-3 rounded-full border-8 border-gray-300 bg-white"></span>
//                       <label
//                         className={`peer-checked:ring-2 peer-checked:ring-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-2 ${
//                           selectedAddress === add._id ? "bg-gray-50" : ""
//                         }`}
//                         htmlFor={`radio_${add._id}`}
//                       >
//                         <div>
//                           <span className="mt-1 font-semibold text-sm">
//                             {address.label}
//                           </span>
//                           <p className="text-slate-500 text-sm leading-6">
//                             {address.deliveryTime}
//                           </p>
//                         </div>
//                       </label>
//                     </div>
//                   ))}
//                 </div> */}

//                 <div className="grid grid-cols-2 gap-2 ">
//                   {console.log("length of add",address.length)}
//                   { address.map((add, index) => (
//                     <div
//                       key={index}
//                       className={` flex flex-row-reverse rounded-md items-center justify-between px-2 ring-1 ring-gray-400 cursor-pointer ${
//                         selectedAddress === add?._id
//                           ? "ring-2 ring-gray-700"
//                           : ""
//                       }`}
//                       onClick={() => setSelectedAddress(add?._id)}
//                     >
//                       <span
//                         className={`box-content block h-3 w-3 rounded-full border-8 border-gray-300 bg-white ${
//                           selectedAddress === add?._id
//                             ? "ring-2 ring-gray-700"
//                             : "peer-checked:ring-2 peer-checked:ring-gray-700"
//                         }`}
//                       ></span>

//                       <div>
//                         <span className="font-semibold text-sm">
//                           {`${add?.house} ${add?.city} `}
//                         </span>
//                         <p className="text-slate-500 text-sm leading-6">
//                           {address?.deliveryTime}
//                         </p>
//                       </div>
//                     </div>
//                   ))}


                  

//                   {address?.length === 2 ? (
//                     ""
//                   ) : (
//                     <span className=" ring-1 rounded-md flex items-center justify-center p-0">
//                       + Create new address
//                     </span>
//                   )}
//                 </div>

//                 {/* new div for the cart */}
//               </form>
//             </div>
//             <div className="mt-6 border-t border-b py-2">
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-medium text-gray-900">Subtotal</p>
//                 <p className="font-semibold text-lg  text-gray-900">
//                   &#8377;{pricingBreakdown.total}
//                 </p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-medium text-gray-900">Shipping</p>
//                 <p className="font-semibold text-lg  text-gray-900">
//                   + &#8377;{pricingBreakdown.shipping}
//                 </p>
//               </div>
//               <div className="mt-6 flex items-center justify-between">
//                 <p className="text-sm font-medium text-gray-900">Discount</p>
//                 <p className="text-sm font-semibold text-gray-900">
//                   - &#8377;{pricingBreakdown.discount}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-6 flex items-center justify-between">
//               <p className="text-xl font-medium text-gray-900">Total</p>
//               <p className="text-xl font-semibold text-gray-900">
//                 &#8377; {totalPrice()}
//               </p>
//             </div>
//           </div>

//           {selectedAddress === null ? (
//             <button
//               disabled
//               className=" flex flex-1 my-4 justify-center items-center w-full rounded-md  bg-gray-200 text-gray-900 px-6 py-3 font-medium ring-2 ring-gray-900"
//             >
//               Place Order
//             </button>
//           ) : (
//             <Link
//               to={`${import.meta.env.VITE_PAYMENT_PAGE}/${totalPrice()}`}
//               target="_blank"
//               totalPrice={totalPrice}
//               className=" flex flex-1 my-4 justify-center items-center w-full rounded-md  bg-gray-900 px-6 py-3 font-medium text-white"
//             >
//               Place Order
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;