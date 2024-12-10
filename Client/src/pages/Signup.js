import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import oeye from '../images/openeye.png'
import ceye from '../images/closedeye.png'

import Navbar from '../components/Navbar'
import Mininav from '../components/mininav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navi = useNavigate()
    const [passwordeye ,setPasswordeye] = useState(ceye)
    const [passwordtype ,setPasswordtype] = useState("password"

    )
    
    const [succes , setSucces] = useState({display:'none'})
    const [password ,setPassword] = useState()

    const [name ,setName] = useState()
    const [city ,setCity] = useState()

    const [email ,setEmail] = useState()
    const [phonenumber ,setPhonenumber] = useState()


    const Submitform = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/adduser',{name,email,phonenumber,city,password})
        .then(result => {console.log(result)
            setSucces({display:'block'})
            setTimeout(() => {
            navi('/Login')
                
            }, 2000);

        })
        .catch(error => console.log(error))
    }
    const handeleye = () =>{
        if (passwordeye == ceye){
            setPasswordtype('text')
            setPasswordeye(oeye)
        }else{
            setPasswordtype('password')
            setPasswordeye(ceye)
        }

    }

  return (
    <div className='bg-[#feeacf] w-full h-screen flex flex-col  items-center'>
        <Navbar/>


        <div className='w-full    bg-[#fff5e4] h-auto bg-opacity-50 lg:w-1/2 lg:rounded-xl md:w-3/4 md:rounded-xl 2xl:w-1/3   shadow-lg p-1 '>
            <Mininav/>


            <div>
                <form onSubmit={Submitform} className='w-full gap-2 px-5 mt-2 pt-6 flex flex-col'>
                <label style={succes} className='text-red-500 font-medium text-md ' >User Succesfully Rigistered 😊. Login Now!</label>
                    
                    <label htmlFor="Email" className='text-gray-500 font-medium text-sm ' >Name</label>
                    <input type="text"  className='pt-2 focus:outline-none px-2 bg-transparent border-x-0 border-t-0 border-b-2'
                    onChange={(e)=> setName(e.target.value)}
                    />
                    <label htmlFor="Email" className='text-gray-500 font-medium text-sm ' >Email Address</label>
                    <input type="email"  className='pt-2 focus:outline-none px-2 bg-transparent border-x-0 border-t-0 border-b-2'
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <label htmlFor="Email" className='text-gray-500 font-medium text-sm ' >Phone Number</label>
                    <input type="number"  className='pt-2 focus:outline-none px-2 bg-transparent border-x-0 border-t-0 border-b-2'
                    onChange={(e)=> setPhonenumber(e.target.value)}
                    />
                    <label htmlFor="Email" className='text-gray-500 font-medium text-sm ' >City</label>
                    <input type="text"  className='pt-2 focus:outline-none px-2 bg-transparent border-x-0 border-t-0 border-b-2'
                    onChange={(e)=> setCity(e.target.value)}
                    />

                    <label className='text-gray-500 font-medium text-sm ' htmlFor="Password">Password</label>
                    <div className='w-full relative'>
                    <input type={passwordtype} className=' pt-2 px-2 w-full focus:outline-none bg-transparent border-b-2 border-x-0 border-t-0' 
                    onChange={(e)=> setPassword(e.target.value)}
                     />
                        <img src={passwordeye} alt="" className='absolute top-0 right-2 size-7' onClick={handeleye } />
                    </div>
                    <Link className='text-gray-700 hover:text-gray-500 hover:underline font-semibold text-md'>Forget password?</Link>
                    
                    <input type="submit" value={'Signup'} className='text-white shadow-sm bg-[#f74742] hover:bg-[#f74842d8] active:bg-[#f74742] py-3 rounded-xl mt-3' />
                </form>
            </div>

        </div>
    </div>

  )
}

export default Signup
