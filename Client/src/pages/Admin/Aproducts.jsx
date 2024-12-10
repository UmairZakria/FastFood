import React, { useEffect,useState } from 'react'
import Item from '../../components/item'
import { useSelector } from 'react-redux';
import axios from 'axios';
import plus from '../../images/plus.png'

const Aproducts = () => {
  const [items , setItem] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/getproducts')
    .then((res)=>{setItem(res.data)
      // console.log(res)
      console.log(items)
    }
  )
    .catch((err) => console.log(err))
  }, [])
  
  return (

    <div className='w-full '>
        <div className="grid grid-cols-2 my-5 gap-3 sm:grid-cols-4 lg:grid-cols-7 md:grid-cols-5 ">
          {items.map((item) => (
                 <div key={item.id} id={item.id}  
                 className=" text-lg h-auto relative bg-[rgb(255,244,227)] rounded-lg "
               >
                 <img  src={item.images}className="w-full lg:w-full  object-cover   lg:mx-auto h-[55%]  rounded-t-lg " alt="" />
         
                 <div className="px-3 ">
                   <h1 className="font-bold text-lg ">{item.name}</h1>
                   <div className="flex text-sm justify-between">
                     <p>Rating =</p>
                     <p className="flex items-center">
                       {/* <img src={star} className="size-4" alt="" /> */}
                       <p>{item.rating}</p>
                     </p>
                   </div>
                   <div className='flex justify-between items-center'>
                    Price =
                   <p className="font-bold text-[16px] mt-4">${item.price}</p>
                    
                   </div>
                   <div className='flex justify-between items-center'>
                    <button>
                      <img src={plus} className='rotate-45' alt="" />
                    </button>
                    <button className='p-1 bg-green-300 rounded-lg' > Update</button>

                   </div>
                 </div>


               </div>
          ))
          
          }

        </div>
      
    </div>
  )
}

export default Aproducts
