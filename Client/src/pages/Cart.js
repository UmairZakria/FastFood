import food from "../images/food.jpg";
import drop from "../images/drop.png";
import cross from "../images/cross.png";

import { useEffect } from "react";

import { Link } from "react-router-dom";

import Productadd from "../components/productadd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  // const [totalQuantity,totalPrice,cart] = useSelector((state) => state.cart)
  const items = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();


  const [total, setTotal] = useState(totalPrice.toFixed(2));
  const [delivery, setDelivery] = useState("Free");
  
  
 

  useEffect(() => {
    
    setTotal(totalPrice.toFixed(2));
    console.log(cart)
  }, [cart]);

  return (
    <>
      <div className="lg:w-full lg:bg-[rgb(255,234,208)] ">
        <div className="relative w-full lg:w-[400px] lg:shadow-xl shadow-black mx-auto  h-screen overflow-hidden">
          <img
            src={food}
            className="absolute -z-10 w-full h-1/3 bg-contain "
            alt=""
          />
          <nav className="h-[80px] text-white  w-full px-5 bg-[rgba(255,214,67,0.9)]  flex items-center justify-between ">
            <button onClick={()=> navigate(-1)} className="rotate-90">
              <img src={drop} width={35} alt="" className="" />
            </button>
            <Link  to="/cart" className="text-2xl font-semibold">
              Cart
            </Link>
            <button onClick={()=> navigate(-1)} className="">
              <img src={cross} width={30} height={30} alt="sosme" />
            </button>
          </nav>
          <div className="h-full w-full bg-[rgb(255,214,67)] ">
            <div className="h-full w-full rounded-t-3xl  py-5  bg-[rgb(255,240,210)]">
              <div className="flex gap-3 flex-col w-full px-2 h-[50%] mb-2 overflow-y-scroll ">
                {cart.map((item) => (
                  <Productadd
                  name={item.productname}
                  id={item._id}
                  price={item.price}
                  img={item.images}
                  quantity={item.quantity}
                  />
                
                ))}
                {/* < Productadd name={"Zinger Burger"} price={36} pic={bburger} />

            < Productadd name={"Simple Burger"} price={20} pic={sburger} /> */}
              </div>
              <div className="w-full flex flex-col h-full gap-[10px] bg-white rounded-t-2xl px-4 py-4">
                <div className="flex text-gray-400 w-full justify-between font-semibold">
                  <p>Subtotal</p>
                  <p>${total}</p>
                </div>
                <div className="h-[2px] bg-[rgb(255,240,210)]"></div>
                <div className="flex w-full justify-between font-semibold">
                  <p>Delivery</p>
                  <p>{delivery}</p>
                </div>
                <div className="h-[2px] bg-[rgb(255,240,210)]"></div>
                <div className="flex w-full justify-between font-semibold">
                  <p>Total</p>
                  <p>${total}</p>
                </div>
                <button className=" py-4 rounded-xl bg-[rgb(247,71,66)] uppercase text-white font-bold">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
