import React from "react";
import filter from "../images/filter.png";
import menu from "../images/menu.png";
import gps from "../images/gps.png";
import search from "../images/search.png";
import pizza from "../images/pizza.png";
import burger from "../images/aniburg.png";
import hotdog from "../images/hotdog.png";
import cartmg from "../images/cart.png";

import arrow from "../images/arrow.png";
import Item from "../components/item";

import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import crossbl from "../images/crossbl.png";

import Footer from "../components/footer";
import { fetchProducts } from '../cart/cartSlice'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {adduser} from "../user/UserSlice"
const Home = () => {
  const navi = useNavigate
  const dispatch = useDispatch();
  const [cartscc, SetCartscc] = useState({ display: "none" });



  const items = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart.cart);
  // const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  
  const user =  useSelector((state) => state.user.user)


  const error = useSelector((state) => state.cart.error);

  const carlen = cart.length;
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/dashboard', {
        headers: {
          Authorization: token, // Send the token in the header
        },
      });
      const userdata = response.data
      if (userdata.Status === 'fail2'){
        console.log(userdata)
        localStorage.removeItem('token');
        window.location.reload(true)         

        console.log('token expire')

      }else{
        const user = userdata.user.user
        dispatch(adduser(user))

      }





    };

     fetchDashboardData();


  }, []);
  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch fetchProducts when component mounts
  }, [dispatch]);
  useEffect(() => {
    if (carlen <= 0) {
      SetCartscc({ display: "none" });
    } else {
      SetCartscc({ display: "flex" });
    }
  }, [cart]);

  const [menus, setMenus] = useState(menu);
  const [profile, setProfile] = useState({ display: "none" });

  const handeldiv = () => {
    if (menus == menu) {
      setMenus(crossbl);
      setProfile({ display: "flex" });
    } else {
      setProfile({ display: "none" });

      setMenus(menu);
    }
  };
  if (status === 'loading') {
    return <div className="flex items-center justify-center w-full h-screen bg-[rgb(255,234,208)] text-2xl font-bold text-yellow-400 ">Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error : {error}</div>;
  }

  return (
    <>
    <div className="py-5 w-full text-black lg:w-full lg:bg-[rgb(255,234,208)]">
      <nav className=" relative w-full flex mb-4 items-center justify-between ">
        <div className="flex items-center gap-1 font-semibold text-2xl">
        <img src={gps} alt="" className="size-6" />
          <p>
            <span className="text-[rgb(245,41,40)] font-bold">Fast</span> Food
          </p>
        </div>
        <div
          onClick={handeldiv}
          className="p-2 relative bg-[rgb(255,244,227)] rounded-full"
        >
          <img src={menus} alt="" className="size-6" />
          <div
            style={cartscc}
            className="absolute top-[-25%] -right-3   size-6 flex items-center justify-center p-1 bg-black rounded-full text-white z-10"
          >
            {carlen}
          </div>
        </div>
        <div
          style={profile}
          className="w-full lg:w-[300px] md:w-[300px] z-10 hidden flex-col p-1 py-5 h-auto border-3 shadow-sm shadow-black bg-[rgb(255,234,208)] rounded-tl-xl rounded-b-xl border-red-800  absolute  top-[100%] right-0 "
        >
          <NavLink
            to="/dashboard"
            // className="p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between"
            className={(e) => {
              return e.isActive
                ? "p-5 w-ful bg-white flex active:bg-slate-50 justify-between"
                : "p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between";
            }}
          >
            <span>Home</span> <img src={arrow} alt="" />
          </NavLink>


          <NavLink
            to="/profile"
            // className="p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between"
            className={(e) => {
              return e.isActive
                ? "p-5 w-ful bg-white flex active:bg-slate-50 justify-between"
                : "p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between";
            }}
          >
            
            <span>Profile</span> <img src={arrow} alt="" />
          </NavLink>
          <NavLink
            to="/cart"
            // className="p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between"
            className={(e) => {
              return e.isActive
                ? "p-5 w-ful bg-white flex active:bg-slate-50 justify-between"
                : "p-5 w-full hover:bg-white flex active:bg-slate-50 justify-between";
            }}
          >
            <div className="flex items-center gap-2">
              Cart
              <div className="relative ">
                <img src={cartmg} className="size-8" alt="" />
                <div
                  style={cartscc}
                  className="absolute top-[-9%] right-1   size-5 flex items-center justify-center p-1 bg-white rounded-full text-black z-10"
                >
                  {carlen}
                </div>
              </div>
            </div>
            <img src={arrow} alt="" />
          </NavLink>

          {/* <div onClick={handeldiv} className="h-[65vh]  bg-transparent  backdrop-blur-md w-full"></div> */}
        </div>
      </nav>

      <div className=" flex flex-col text-3xl">
        <h1 className="pb-5 px-2 md:text-5xl lg:text-5xl lg:leading-12">
          Hi <span className="underline md:no-underline">{user.name }</span><br /> 
          Find the 
          <span className="text-[rgb(245,41,40)] font-bold">
            Best <br /> Food
          </span>{" "}
          Around You
        </h1>
        <div className=" h-[50px] px-2 gap-2 w-full flex ">
          <div className="w-full h-full relative">
            <input
              type="text"
              id="search"
              placeholder=" Search Your Food"
              className=" search   w-full  box-border p-3 pr-[90px] text-lg placeholder:text-[16px] bg-[rgb(255,245,228)] rounded-lg h-full "
            />

            <img
              src={search}
              className="absolute rounded-lg p-2 bg-[rgb(255,234,208)] search -right-5 top-[50%] translate-x-[-50%]  translate-y-[-50%]"
            />
          </div>
          <button className="bg-[rgb(247,74,69)] p-3 rounded-lg">
            <img className="size-6" src={filter} alt="" />
          </button>
        </div>
        <div className="py-5 w-full">

          <div
            style={{ scrollbarWidth: "none" }}
            id="catogery"
            className=" flex flex-shrink-0  overflow-x-scroll w-full h-[40px]  gap-2"
          >
            <button className="flex gap-2 flex-shrink-0 text-sm items-center px-2 py-1 rounded-xl text-white bg-[rgb(246,65,61)]">
              <div className="p-[2px] bg-white rounded-full shadow-black">
                <img className="size-5 " src={burger} alt="" />
              </div>
              Burger
            </button>
            <button className="flex gap-2 font-bold text-sm flex-shrink-0 items-center px-2 py-1 rounded-xl text-black bg-[rgb(255,248,231)]">
              <div className=" bg-white rounded-full shadow-md shadow-black">
                <img className="size-5 " src={pizza} alt="" />
              </div>
              Pizza
            </button>
            <button className="flex gap-2 flex-shrink-0 font-bold text-sm items-center px-2 py-1 rounded-xl text-black bg-[rgb(255,248,231)]">
              <div className=" bg-white rounded-full shadow-md shadow-black">
                <img className="size-5 " src={hotdog} alt="" />
              </div>
              Hotdog
            </button>{" "}
            <button className="flex gap-2 flex-shrink-0 font-bold text-sm items-center px-2 py-1 rounded-xl text-black bg-[rgb(255,248,231)]">
              <div className=" bg-white rounded-full shadow-md shadow-black">
                <img className="size-5 " src={pizza} alt="" />
              </div>
              Pizza
            </button>
          </div>
        </div>
        <div className="my-5 gap-4 flex flex-wrap  items-center justify-center md:justify-start  mx-auto  ">
          {items.map((item) => (
            <Item
            
              name={item.productname}
              id={item._id}
              price={item.price}
              item={item}
              img={item.images}
              rating ={item.rating}
            />
          ))
          
          }

        </div>
      </div>
    </div>
    <Footer/>
    </>

  );
};

export default Home;
