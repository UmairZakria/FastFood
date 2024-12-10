import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import oeye from '../images/openeye.png'
import ceye from '../images/closedeye.png'
import Mininav from '../components/mininav'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navi = useNavigate()
    const [passwordeye, setPasswordeye] = useState(ceye)
    const [passwordtype, setPasswordtype] = useState("password")
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState({ display: 'none' })


    const handellogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then((res) => {
                const data = res.data
                if (data.status == 'nouser') {
                    console.log('nouser')
                    setError({ display: 'block' })
                    setTimeout(() => {
                        setError({ display: 'none' })

                    }, 3000);
                }
                else if (data.status == 'nopass'){ 
                    console.log(data)
                    setError({ display: 'block' })
                    setTimeout(() => {
                    setError({ display: 'none' })

                }, 3000);
            }
                else if (data.token)  {
                    localStorage.setItem('token',data.token)
                    navi('/dashboard')

                }
                    


            })
            .catch((err) => { console.log(err) })
        console.log(password, email)

    }

    const handeleye = () => {
        if (passwordeye == ceye) {
            setPasswordtype('text')
            setPasswordeye(oeye)
        } else {
            setPasswordtype('password')
            setPasswordeye(ceye)
        }

    }

    return (
        <div className='bg-[#feeacf] w-full  h-screen flex flex-col items-center'>
            <Navbar />
            <div className='w-full   bg-[#fff5e4] lg:w-1/2 lg:rounded-xl md:w-3/4 md:rounded-xl 2xl:w-1/3 h-auto bg-opacity-50   shadow-lg p-1 '>
                <Mininav />
                <div>
                    <form onSubmit={handellogin} className='w-full gap-[9px] px-5 mt-2 py-8 flex flex-col'>
                        <label style={error} htmlFor="" className="text-red-600 font-medium">Invalid User and Password</label>
                        <label htmlFor="Email" className='text-gray-500 font-medium text-sm ' >Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='pt-2 focus:outline-none px-2 bg-transparent border-x-0 border-t-0 border-b-2' />

                        <label className='text-gray-500 font-medium text-sm ' htmlFor="Password">Password</label>
                        <div className='w-full relative'>
                            <input type={passwordtype} value={password} onChange={(e) => setPassword(e.target.value)} className=' pt-2 px-2 w-full focus:outline-none bg-transparent border-b-2 border-x-0 border-t-0' />
                            <img src={passwordeye} alt="" className='absolute top-0 right-2 size-7' onClick={handeleye} />
                        </div>
                        <Link className='text-gray-700 hover:text-gray-500 hover:underline font-semibold text-md'>Forget password?</Link>

                        <input type="submit" value={'Login'} className='text-white shadow-sm bg-[#f74742] hover:bg-[#f74842d8] active:bg-[#f74742] py-3 rounded-xl mt-3' />
                    </form>
                </div>

            </div>
        </div>

    )
}

export default Login
