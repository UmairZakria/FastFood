import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import gps from "../../images/gps.png";
import drop from "../../images/drop.png";
import cross from "../../images/cross.png";
import plus from "../../images/plus.png"
import Aproducts from "./Aproducts";


const Adminpanel = () => {
  const navi = useNavigate()
  const [users, setUsers] = useState([])
  const [formstyle, setFormstyle] = useState({ display: 'none' })
  const [x, setX] = useState(0)
  const [y, setY] = useState(5)
  const [link, setLink] = useState([])
  const [name, setName] = useState()
  

  const [email, setEmail] = useState()
  const [city, setCity] = useState()
  const [rowid, setId] = useState()
  const [btnproduct,setBtnproduct] = useState('Add Product');
  const [productadd ,setProductadd] = useState({display:'none'})
  const [productname,setProductname] =useState()
  const [price,setPrice] =useState()
  const [rating,setRating] =useState()
  const [stock,setStock] =useState()
  const [images,setImages] =useState()
  const [phonenumber, setPhonenumber] =useState()
  const [quantity,setQuantity] =useState(1)
  const [listproduct, setListproduct] =useState({display:'none'})
  const [discription,setDiscription] =useState()

  const handelproduct = () => {
    // e.preventDefault()
    axios.post('http://localhost:3001/addproduct',{productname,price,rating,stock,link,discription,quantity})
    .then(result => {
      console.log(result)
      
      
    })
    .catch(error => console.log(error))

  }
  const handelproductadd = () => {
    if (productadd.display === 'none' ){
      setProductadd({display:'flex'})
      setBtnproduct('Close Listing')
    }else{
      setProductadd({display:'none'})
      setBtnproduct('Add Product')


    }

  }
  
  
  const handelforward = () => {
    if (x > users.length) {
    } else {
      setX(x + 5)
      setY(y + 5)
    }
  }
  const handelbackward = () => {
    if (x === 0 && y === 5) {
    } else {
      setX(x - 5)
      setY(y - 5)
    }

  }
  const handelupdate = (id, name, email, city,phonenumber) => {


    setFormstyle({ display: 'flex' })
    setName(name)
    setEmail(email)
    setCity(city)
    setPhonenumber(phonenumber)
    setId(id)
  }
  const handelcross = (e) => {
    e.preventDefault()
    setFormstyle({ display: 'none' })
  }
  const dataUpdate = (id, eve) => {
    eve.preventDefault();

    axios.put("http://localhost:3001/dataupdate" + id, { name, email, city})
      .then(result => {
        console.log(result)


      })
      .catch(err => { console.log(err) })
  }
  const deletedata = (id) => {
    axios.delete("http://localhost:3001/deletedata" + id)
      .then(result => {
        console.log(result)


      })
      .catch(err => { console.log(err) })

  }
  const handeldetails = (id) => {
    const dropror = document.getElementById('drop' + id);
    const details = document.getElementById(id);
    if (details.style.display === 'none') {
      dropror.style.transform = 'rotate(180deg)'
      details.style.display = 'flex'
    } else {
      dropror.style.transform = 'rotate(360deg)'

      details.style.display = 'none'
    }
  }
  const handelprouctshow = () =>{
  if(listproduct.display=='none'){
  
    setListproduct({display:'block'})
  }else{
     setListproduct({display:'none'}) 
  }
    
  }
  const handeladd = (images) => {
    if (images){
      setLink((e) => [...e, images])
      console.log(link)
    }

  }
  const dellink = (index) => {
    // Filter out the link at the specified index
    const updatedLinks = link.filter((_, i) => i !== index);
    // Update the state with the new list
    setLink(updatedLinks);
    console.log(link)
  };


  useEffect(() => {
    axios.get("http://localhost:3001/getuser")
      .then((result) => {
        setUsers(result.data)



      })
      .catch((error) => console.log(error));

  }, [users]);

  return (
    <div className="bg-[#feeacf] w-full h-auto  gap-2  flex flex-col  ">
      <div  className=" h-[90px] w-full p-4">
        <div onClick={()=> navi('/')} className="flex cursor-pointer items-center gap-1 font-bold text-2xl  p- ">
          <img src={gps} alt="" className="size-6" />
          <p>
            <span className="text-[rgb(245,41,40)] font-bold">Fast</span> Food  <span className="text-[rgb(245,41,40)] font-bold">Admin Dashboard</span>
          </p>
        </div>
      </div>
      <div className="px-4 w-full space-y-2   ">
        <h1 className="text-2xl font-bold ">
          User Details :
        </h1>

        <table className="lg:w-[100%]   w-[90%] ">
          <tr className="bg-[#ffdaa9]  ">
            <th className=" text-left  py-3">More</th>
            <th className="hidden lg:table-cell py-3 " >Id</th>

            <th className=" text-left  py-3" >Name</th>
            <th className="hidden lg:table-cell py-3 ">Email</th>
            <th className="hidden lg:table-cell py-3 ">City</th>
            <th className="hidden lg:table-cell  py-3">Delete</th>
            <th className="hidden lg:table-cell py-3 ">Update</th>

          </tr>
          {
            users.slice(x, y).map((user) => {



              return <>
                <tr className=" lg:table-row  border-2 border-red-400">
                  <td className=" " onClick={() => handeldetails(user._id)}><img src={drop} id={'drop' + user._id} className="p-1  bg-red-400 rounded-md" alt="" /></td>
                  <td className="hidden lg:table-cell ">{user._id}</td>
                  <td>{user.name}</td>
                  <td className="hidden lg:table-cell ">{user.email}</td>
                  <td className="hidden lg:table-cell ">{user.city}</td>
                  <td className="hidden lg:table-cell py-3 font-bold cursor-pointer hover:bg-green-400 bg-green-300 px-2 rounded-lg text-white " onClick={() => handelupdate(user._id, user.name, user.email, user.city,user.phonenumber)}> Update </td>
                  <td className="hidden lg:table-cell py-3 font-bold cursor-pointer hover:bg-red-600 bg-red-500 px-2  rounded-lg text-white " onClick={() => deletedata(user._id)} > Delete </td>
                </tr>
                <div id={user._id} className="   hidden gap-2 flex-col ">
                  <tr className='flex gap-2 lg:hidden items-center'>
                    <th className="p-3 rounded-md bg-[#ffdaa9]">Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr className='flex gap-2 items-center'>
                    <th className="p-3 rounded-md bg-[#ffdaa9]">Password:</th>
                    <td style={{scrollbarWidth:'none'}} className="w-[80px]  overflow-x-scroll "><p className="">{user.password}</p></td>
                  </tr>
                  <tr className='flex gap-2 lg:hidden items-center'>
                    <th className="p-3 rounded-md  bg-[#ffdaa9]">city:</th>
                    <td>{user.city}</td>
                  </tr>
                  <tr className='flex gap-2 items-center'>
                    <th className="p-3 rounded-md bg-[#ffdaa9]">PhoneNumber:</th>
                    <td>{user.phonenumber}</td>
                  </tr>
                  <tr className="flex gap-2 lg:hidden  items-center">
                    <th className="p-3 rounded-md bg-[#ffdaa9]">UpdateData:</th>

                    <td className="  py-3 font-semibold cursor-pointer hover:bg-green-400 bg-green-300 px-4 rounded-lg text-white " onClick={() => handelupdate(user._id, user.name, user.email, user.city)}> Update </td>

                  </tr>
                  <tr className="flex gap-2  lg:hidden items-center">
                    <th className="p-3 rounded-md bg-[#ffdaa9]">DeleteData:</th>
                    <td className=" py-3 font-semibold cursor-pointer hover:bg-red-600 bg-red-500 px-4  rounded-lg text-white " onClick={() => deletedata(user._id)} > Delete </td>


                  </tr>

                </div>

              </>


            })
          }
        </table>
        <form style={formstyle} className="flex gap-2 items-start   lg:flex-row flex-col   p-2">

          <label htmlFor="">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 opacity-50 rounded-lg" type="email" />
          <label htmlFor="">Name:</label>

          <input value={name} onChange={(e) => setName(e.target.value)} className="p-2 opacity-50 rounded-lg" type="text" />
          <label htmlFor="">City:</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} className="p-2  opacity-50 rounded-lg" type="text" />
          <div className="flex gap-2">

          <input type="submit" value="Update" onClick={(eve) => dataUpdate(rowid, eve)} className="p-2 font-bold cursor-pointer  hover:bg-green-400 bg-green-300 px-4 rounded-lg text-white" />
          <button onClick={(e) => handelcross(e)}>
            <img src={cross} className="p-1 mx-auto bg-red-400 rounded-md" alt="" />
          </button>
          </div>

        </form>
        <div className="flex gap-4 ">
          <button onClick={handelbackward} className="border-2 bg-red-400 rounded-full">
            <img className="rotate-90" src={drop} alt="" />
          </button>
          <button onClick={handelforward} className="border-2 ] bg-red-400 rounded-full">
            <img className="rotate-[270deg]" src={drop} alt="" />
          </button>
        </div>

      </div>
      <div className="px-4">
        <h1 className="text-2xl font-bold ">Prducts Details:</h1>
        <div>
          <button className="p-3 m-1 bg-[#facf96] font-semibold rounded-lg " onClick={handelproductadd}>{btnproduct}</button>
          <button className="p-3 m-1 bg-[#faa296] font-semibold rounded-lg " onClick={handelprouctshow} >Show Prodcuts</button>

          <div style={productadd} className="h-auto mb-20">
            <form onSubmit={handelproduct} className="flex gap-3  flex-col mx-auto w-[100%] lg:w-1/2">
              <label htmlFor="">Product Name:</label>
              <input onChange={(e)=> setProductname(e.target.value)} value={productname} className="p-2 bg-[#fef4e7] rounded-lg" type="text"  />
              <label htmlFor="">Product Discription:</label>
              <textarea onChange={(e)=> setDiscription(e.target.value)} name="" value={discription} id="" className="h-[100px]" ></textarea>
              <label htmlFor="">Price:</label>
              <input onChange={(e)=> setPrice(e.target.value)} value={price} className="p-2 bg-[#fef4e7] rounded-lg" type="number" />
              <label htmlFor="">Stock:</label>
              <input onChange={(e)=> setStock(e.target.value)} value={stock} className="p-2 bg-[#fef4e7] rounded-lg" type="number" />
              <label htmlFor="">Rating:</label>
              
              <input value={rating} onChange={(e)=> setRating(e.target.value)} className="p-2  bg-[#fef4e7] rounded-lg" type="number" />
              <label htmlFor="">Images:</label>
              <div className="flex flex-col gap-3 items-center ">
                <div className="relative  w-full ">
                <input value={images} onChange={(e)=> setImages(e.target.value)} className="p-2 bg-[#fef4e7] rounded-lg w-full" type="text" placeholder="Add Link of Image" />
                  <button type="button" className="p-2 absolute right-0 bg-[#fef4e7] top-1/2 -translate-y-1/2" onClick={()=>handeladd(images)}>
                    <img src={plus} alt="" />
                  </button>
                </div>
                <div className="bg-[#fef4e7]  flex gap-2 border-2 w-full h-auto">
                  { 
                  link.map((link,index) => (

                    
                    <div className="w-[120px] h-[35px] relative px-2 overflow-hidden rounded-full py-1 bg-[#feeacf]">
                    <button type="button" className="absolute  h-[35px] px-1 right-0 top-1/2 bg-[#feeacf] -translate-y-1/2" onClick={()=> dellink(index)}>
                      <img src={plus} className="rotate-45"  alt="" />
                    </button>
                      <p className="">{link}</p>
                  </div>
                    ))
              
                  }
                </div>
                <span>-OR-</span>
                <input className="p-2 bg-[#fef4e7] rounded-lg w-full " type="file" />

              </div>
              <input type="submit" value="Add Product" className="bg-[#f87171] hover:bg-[#ff5151] p-3 rounded-sm text-white font-semibold" />

            </form>
          </div>
          <div style={listproduct}>
            <Aproducts/>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Adminpanel;
