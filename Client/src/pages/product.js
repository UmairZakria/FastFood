import React, { useEffect, useState } from "react";
import drop from "../images/drop.png";
import cross from "../images/cross.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtocart } from "../cart/cartSlice";
import star from "../images/star.png";
import tick from '../images/tick.png'
import axios from "axios";
import Productitem from "../components/Productitem";



const Product = () => {
  const state = useLocation();
  // const [name, setName] = useState("");
  // const [discription, setDiscription] = useState("");
  // const [rating, setRating] = useState();

  // const [price, setPrice] = useState();
  // const [img, setImg] = useState();
  const [data, setData] = useState({})
  console.log(data)


  // const [atcart ,setAtcart] = useState(true)


  useEffect(() => {
    const id = state.state.id;
    console.log("id is:" + id)
    axios.post("http://localhost:3001/getoneproduct", { id })
      .then((data) => {
        console.log(data)
        setData(data.data)
      })
      .catch(err => console.error(err))

  }, [])


  return (

    <>
    
      {
        data ?       (<Productitem
        productname={data.productname}
        id={data._id}
        price={data.price}
        discription = {data.discription}
        data={data}
        images={data.images}
        rating={data.rating}
        
        
        /> 
      ): (<div>loading...</div>)
      }

    </>
  );
};

export default Product;
