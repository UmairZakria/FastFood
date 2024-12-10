import React from 'react'
import arrow from '../images/arrow.png'
import cart from '../images/cart.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'



const UserProfile = () => {
    const [succes , setSucces] = useState({display:'none'})
    const [up, setUp] = useState(false)
    const user = useSelector((state) => state.user.user)
    const [edit , setEdit] = useState({display:'flex'})
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState()
    const [phonenumber, setPnumber] = useState()
    const [id, setId] = useState(user._id)
    const navi = useNavigate()
    const handellogout = () => {
        localStorage.removeItem('token');
        window.location.reload(true);

        
        navi('/')
    }
    const handelupdate =() =>{
        if (user){
            setUp(true)
            setEdit({display:'none'})
            setName(user.name)
            setEmail(user.email)
            setCity(user.city)
            setPnumber(user.phonenumber)
        }else{
            navi('/dashboard')


        }

    }
    const dataupdate = (e) =>{
        e.preventDefault();

        axios.put("http://localhost:3001/dataupdate" + id, { name, email, city,phonenumber })
          .then(result => {
            console.log(result)
            setSucces({display:'block'})
            setTimeout(() => {
                localStorage.removeItem('token')
                window.location.reload(true);
                navi('/login')
                
            },3000);


    
    
          })
          .catch(err => { console.log(err) })
    }

    return (
        
        <div className='lg:w-full h-screen bg-[#feeacf] '>

            <div className='w-full lg:mx-auto   lg:w-1/2'>
                <div className='flex flex-col w-full items-center justify-center gap-4 py-[30px]'>
                    <div className='rounded-full p-3 shadow-md shadow-gray-600 bg-green-300'>
                        <img src="https://img.icons8.com/ios-filled/30/gender-neutral-user.png" alt="" />
                    </div>
                    <div className='flex flex-col items-center '>
                        <h1 className='text-xl font-semibold'>{user.name}</h1>
                        <small className='text-gray-700 '>{user.email}</small>
                    </div>
                    <button onClick={handelupdate} style={edit} className='bg-black rounded-xl px-3 py-2 text-white font-semibold'>Edit Profile</button>
                </div>
                {up ? (
                <div>

                    <form onSubmit={dataupdate} className='lg:w-3/4 md:w-1/2 w-full pt-4 px-3 mx-auto gap-1 flex flex-col'>
                        <label style={succes} className='text-red-500 font-medium text-md ' >Information Succesfully Updated 😊. redricting to Login Now!</label>

                        <label htmlFor="">Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value) } className='pt-2 focus:outline-none  mx-2 mb-2 px-2 bg-transparent border-x-0 border-t-0 border-b-2 border-[#ffcb86] '   type="text" />
                        <label htmlFor="">City:</label>
                        <input  value={city} onChange={(e) => setCity(e.target.value) } className='pt-2 focus:outline-none  mb-2 px-2 bg-transparent border-x-0 border-t-0 border-b-2 border-[#ffcb86] mx-2 '  type="text" />
                        <label htmlFor="">Phone Number:</label>
                        <input  value={phonenumber} onChange={(e) => setPnumber(e.target.value) } className='pt-2 focus:outline-none mb-2 px-2 bg-transparent border-x-0 border-t-0 border-b-2 border-[#ffcb86] mx-2 '  type="text" />
                        <label htmlFor="">Email :</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value) }  className='pt-2 focus:outline-none mb-2 px-2 bg-transparent border-x-0 border-t-0 border-b-2 border-[#ffcb86] mx-2 '  type="text" />
                        <div className='w-full flex gap-2'>
                        <button onClick={()=>{setUp(false);setEdit({display:'block'})}} type='button' className='text-black rounded-xl w-full py-3  bg-white border-[1px] border-black  font-semibold'>Cancel</button>
                        <button type='submit' className='bg-black rounded-xl w-full  py-3 text-white font-semibold '>Update</button>

                        </div>
                    </form>
                </div>

                ):(
                        <>
                            <div className='px-2'>
                                <small className='text-gray-700 py-2 '>Navigate</small>
                                <div className='bg-[#fff5e4] rounded-xl w-full p-1 flex flex-col items-center'>
                                    <div className=' cursor-pointer hover:bg-white rounded-lg flex w-full items-center py-1 flex-row justify-between px-3'>
                                        <div className='flex flex-row items-center gap-2 p-2'>

                                            <div className='p-1 bg-white rounded-sm'><img src="https://img.icons8.com/color/28/checkout.png" alt="" /></div>
                                            <h1 className='text-[15px] font-semibold'>My Oders</h1>
                                        </div>
                                        <div>
                                            <img src={arrow} alt="" />
                                        </div>

                                    </div>
                                    <div className='w-3/4 h-[1px] my-1 bg-gray-400'></div>
                                    <div onClick={() => navi('/cart')} className=' cursor-pointer hover:bg-white rounded-lg flex w-full items-center flex-row justify-between px-3'>
                                        <div className='flex flex-row items-center gap-2 p-2'>

                                            <div className='p-1 bg-white rounded-sm'><img src={cart} className='size-7' alt="" /></div>
                                            <h1 className='text-[15px] font-semibold'>Cart</h1>
                                        </div>
                                        <div>
                                            <img src={arrow} alt="" />
                                        </div>

                                    </div>
                                    <div className='w-3/4 h-[1px] my-1 bg-gray-400'></div>

                                    <div onClick={() => navi('/dashboard')} className=' cursor-pointer hover:bg-white rounded-lg flex w-full items-center flex-row justify-between px-3'>
                                        <div className='flex flex-row items-center gap-2 p-2'>

                                            <div className='p-1 bg-white rounded-sm'><img src="https://img.icons8.com/ios-filled/28/home.png" className='size-7' alt="" /></div>
                                            <h1 className='text-[15px] font-semibold'>Home</h1>
                                        </div>
                                        <div>
                                            <img src={arrow} alt="" />
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='px-2 my-4 ' >
                                <small className='text-gray-700 py-2 '>Get Out</small>

                                <div onClick={handellogout} className='flex cursor-pointer hover:bg-white rounded-md w-full items-center  flex-row justify-start  px-3 bg-[#f3f3f3]'>
                                    <div className='flex flex-row items-center gap-2 p-2'>

                                        <div className='p-1  rounded-sm'><img src="https://img.icons8.com/ios/28/FA5252/exit--v1.png" alt="" /></div>
                                        <h1 className='text-[15px] font-semibold text-red-600'>Logout</h1>
                                    </div>


                                </div>

                            </div>

                        </>
                    )}
            </div>
        </div>
    )
}

export default UserProfile
