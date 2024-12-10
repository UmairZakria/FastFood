import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addtocart } from "../cart/cartSlice";
import React, { useEffect, useState } from "react";
import star from "../images/star.png";
import tick from '../images/tick.png'

import arrow from "../images/arrow.png";
import drop from "../images/drop.png"



const Productitem = (data) => {
  const navigate = useNavigate();
  const images =   data.images  || []



  const Dispatch = useDispatch();
  const [indexval, setIndexval] = useState(0)
  const [succes, setSucces] = useState({ display: "none" });
  const items = useSelector((state) => state.cart.items);
  let touchStartX = 0;
  const handelcart = () => {

    Dispatch(addtocart(data.data));

    setSucces({ display: "flex" });
    setTimeout(function () {
      setSucces({ display: "none" });
    }, 2000);
  };
  const nextimg = () => {
    if (indexval == (images.length - 1)){
      setIndexval(0)

    }
    else{
      
      setIndexval(indexval+1)

    }
  }
  const lastimg =()=>{
    if (indexval == 0){

    }else{
      setIndexval(indexval-1)

    }
  }
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    
    if (touchStartX - touchEndX > 40) {
      
      nextimg();
    } else if (touchStartX - touchEndX < -40) {
      
      lastimg();
    }
  }

  return (

    <div className="w-full  bg-[#ffead0]   ">
      {/* {id} */}
      
      <div className="relative w-full  flex flex-col  h-full lg:w-1/2 mx-auto md:w-3/4  bg-[fef4e7] ">
        <button onClick={() => navigate(-1)} className="rotate-180 z-10 absolute top-0 p-1 bg-white rounded-tl-3xl left-0">
          <img src={arrow} width={28} alt="" className="" />
        </button>
        <div className="w-full  ">

          <div
            style={{ scrollbarWidth: "none" }}
            className="  h-[75vmin] relative group  bg-cover w-full flex justify-center  rounded-sm  "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            >
              
            <img src={images[indexval]} alt="" className="h-full w-full duration-700    object-cover" />
            {/* <img src={data.images} alt="" className="h-full w-full    bg-cover" /> */}
            <button onClick={nextimg} className=" hidden group-hover:block   absolute top-1/2 -translate-x-1/2 p-1 bg-black/30 rounded-b-2xl -rotate-90 right-0">
              <img src={drop}  alt="" />
            </button>
            <button onClick={lastimg} className=" hidden group-hover:block  absolute top-1/2 -translate-x-1/2 p-1 bg-black/30 rounded-b-2xl rotate-90 left-8">
              <img src={drop}  alt="" />
            </button>
            <div className="absolute bottom-0 w-full flex justify-center gap-1 items-center ">
            {
              images.map((_,index) =>(

                <input className="appearance-none bg-transparent border border-gray-500 rounded-full w-3 h-3 checked:bg-[#ffead0] checked:border-transparent"  key={index} value={index} checked={indexval === index} onChange={() =>setIndexval(index)} type="radio" />
              )
                
              
              
            )
          }
          </div>




          </div>
        </div>


        <div
          style={{ scrollbarWidth: "none" }}
          className="bg-white w-full   flex-grow    py-5  "
        >

          <div className="px-4 w-full flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{data.productname}</h1>

          <p className="flex w-full text-2xl items-center justify-between  flex-row font-bold text-black">
            Price:
            <span className="text-gray-600">
            $ {data.price}

            </span>
          </p>
          </div>
          <div className="px-4 ">
            <div
              style={{ scrollbarWidth: "none" }}
              className="text-sm     w-full "
            >
              <p className="flex flex-col" ><span>Details :</span>{data.discription}</p>
            </div>
            <div className="flex  gap-4 mt-3">
              <div className="flex gap-2 items-center">
                {data.rating}
                <img src={star} className="size-5" alt="" />
              </div>
              <div>🔥 100 kacl</div>
            </div>
            <div>
              <h1 className="font-bold text-xl">ingredients</h1>
              <div className="flex py-2 gap-4 ">
                <div className="bg-[rgb(255,248,232)] shadow-sm shadow-black rounded-lg p-2">
                  <img src="https://img.icons8.com/doodle/48/paprika--v1.png" className="size-7" alt="" />
                </div>
                <div className="bg-[rgb(255,248,232)] shadow-sm shadow-black rounded-lg p-2">
                  <img src="https://img.icons8.com/ios-filled/50/FA5252/tomato.png" className="size-7" alt="" />
                </div>
                <div className="bg-[rgb(255,248,232)] shadow-sm shadow-black rounded-lg p-2">
                  <img src="https://img.icons8.com/external-ddara-flat-ddara/100/external-cucumbers-vegetables-ddara-flat-ddara.png" className="size-7" alt="" />
                </div>
                <div className="bg-[rgb(255,248,232)] shadow-sm shadow-black rounded-lg p-2">
                  <img src="https://img.icons8.com/plasticine/50/potato.png" className="size-7" alt="" />
                </div>
                <div className="bg-[rgb(255,248,232)] shadow-sm shadow-black rounded-lg p-2">
                  <img src="https://img.icons8.com/emoji/48/meat-on-bone-emoji.png" className="size-7" alt="" />
                </div>
              </div>
            </div>
            <div
              style={succes}
              className="absolute hidden  w-full h-[100%]   flex-col text-white items-center justify-center top-1/2 -translate-y-1/2 right-0 bg-[rgb(255,224,187)] "
            >
              <img src={tick} className="size-36 " alt="" />
              <p className="font-bold text-3xl">Added to Cart</p>
            </div>
            <button
              onClick={handelcart}
              className="w-full py-4 rounded-xl bg-[rgb(247,71,66)] hover:bg-[rgba(247,72,66,0.86)] active:bg-[rgb(252,89,83)] uppercase text-white font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Productitem
