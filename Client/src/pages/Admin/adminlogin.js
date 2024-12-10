import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import oeye from '../../images/openeye.png'
import ceye from '../../images/closedeye.png'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const nevigate = useNavigate()
    const [passwordeye ,setPasswordeye] = useState(ceye)
    const [passwordtype ,setPasswordtype] = useState("password")
    const [password ,setPassword] = useState()
    const [username ,setUsername] = useState()
    const [ error ,setError] = useState({display:'none'})

    const handelsubmit = (e) =>{
        e.preventDefault()
        if (username === "admin" && password === "admin"){
            console.log('okay')
            nevigate('/adminpanel', { state: { id: 3433 } });

        }
        

        else{
            setError({display:'block'})
            setTimeout(() => {
            setError({display:'none'})
                
            }, 3000);
            console.log(username,password)

        }
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
    
        <div className='bg-[#feeacf] w-full justify-center gap-2 h-screen flex flex-col items-center'>
            <div>
            <h1 className='text-3xl font-semibold '>Admin Login </h1>
            <p style={error} className='font-bold text-red-500 text-2xl  hidden '> Inavlid Details ! </p>
            </div>
        
        <div className='w-full   bg-[#fff5e4] lg:w-1/2 lg:rounded-xl md:w-3/4 md:rounded-xl 2xl:w-1/3 h-auto bg-opacity-50   shadow-lg p-1 '>
            
            <div>
                <form onSubmit={handelsubmit} className='w-full gap-[9px] px-5 mt-2 py-8 flex flex-col'>
                    <label htmlFor="Email" className='text-gray-500 font-medium text-sm ' >Username</label>
                    <input type="text"  className='pt-2 focus:outline-none px-2 bg-transparent border-x-0 border-t-0 border-b-2'
                    onChange={(e)=> setUsername(e.target.value)}
                    
                    />

                    <label className='text-gray-500 font-medium text-sm ' htmlFor="Password">Password</label>
                    <div className='w-full relative'>
                    <input type={passwordtype} className=' pt-2 px-2 w-full focus:outline-none bg-transparent border-b-2 border-x-0 border-t-0'
                    onChange={(e)=> setPassword(e.target.value)}
                    
                    />
                        
                        <img src={passwordeye} alt="" className='absolute top-0 right-2 size-7' onClick={handeleye } /> 
                    </div>
                    <Link className='text-gray-700 hover:text-gray-500 hover:underline font-semibold text-md'>Forget password?</Link>
                    
                    <input type="submit" value={'Login'} className='text-white shadow-sm bg-[#f74742] hover:bg-[#f74842d8] active:bg-[#f74742] py-3 rounded-xl mt-3' />
                </form>
            </div>

        </div>
    </div>

      
    
  )
}

export default Admin
