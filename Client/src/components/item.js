import React from "react";
import { useDispatch } from "react-redux";
import { addtocart } from "../cart/cartSlice";
import wplus from '../images/whiteplus.png'
import heart from '../images/heart.png'
import star from '../images/star.png'
import tick from '../images/tick.png'
import { useState, usee } from "react";
import Product from "../pages/product";
import { useNavigate } from "react-router-dom";




const Item = (Props) => {
  const Dispatch = useDispatch();
  const [heartc , setHeartc] = useState({backgroundColor: 'gray'})
  const [succes,setSucces] = useState({display:'none'})
  const navigate = useNavigate();

  const handelproduct= () => {
    navigate('/product', { state: { id: Props.id } });
    
  }
  const handelcart = () => {
    Dispatch(addtocart(Props.item))
    console.log(Props.item)
    setSucces({display:'flex'})
    setTimeout(function() {
      setSucces({display:'none'});
    }, 2000);
  }
  

  const handelfav = () => {
    if (heartc.backgroundColor == "gray"){

      setHeartc({backgroundColor: 'red'})
    }else{
      setHeartc({backgroundColor: 'gray'})

    }

  }
  return (
    <>
      <div key={Props.id} id={Props.id}  
        className=" text-lg h-[200px] w-[140px] relative bg-[rgb(255,244,227)] rounded-lg "
      >
        <img onClick={handelproduct} src={Props.img}className="w-full lg:w-full  object-cover   lg:mx-auto h-[55%]  rounded-t-lg " alt="" />

        <div onClick={handelproduct} className="px-3 ">
          <h1 className="font-bold text-lg ">{Props.name}</h1>
          <div className="flex text-sm justify-between">
            <p>Rating</p>
            <p className="flex items-center">
              <img src={star} className="size-4" alt="" />
              <p>{Props.rating}</p>
            </p>
          </div>
          <p className="font-bold text-[16px] mt-4">${Props.price}</p>
        </div>
        <div>
          <button onClick={handelcart} className="absolute bottom-0 right-0 size-8 flex items-center justify-center rounded-tl-xl bg-[rgb(254,192,0)] hover:bg-[rgb(230,172,0)] active:bg-[rgb(255,216,100)]">
            <img src={wplus} alt="" className="size-4" />
          </button>
          <button onClick={handelfav} style={heartc} className="absolute top-1 right-1 rounded-lg  ">
            <img src={heart} className="size-5" alt="" />
          </button>
        </div>
        <div style={succes} className="absolute transition-all ease w-full h-full hidden flex-col text-white items-center justify-center top-0 right-0 bg-[rgb(255,224,187)] ">
          <img src={tick} alt="" />
          <p className="font-bold">Added to Cart</p>
        </div> 
      </div>
      
    </>
  );
};

export default Item;
