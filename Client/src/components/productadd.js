
import plus from "../images/plus.png";
import minus from "../images/minus.png";
import { useEffect, useState } from "react";
import cross from "../images/cross.png";

import { useDispatch , useSelector } from "react-redux";
import { removeitem } from "../cart/cartSlice";
import { changeQuantity } from "../cart/cartSlice";


const Productadd = (Props) => {
    // const pr = 12;
  const cart = useSelector((state) => state.cart.cart)

    const Dispatch = useDispatch();
    const [quantity, setQuantity] = useState(Props.quantity);
    const [total, setTotal] = useState(Props.price);
    const handleQuantityChange = (id, newQuantity) => {
      Dispatch(changeQuantity({ id, quantity: newQuantity }));
    };

    useEffect(() => {
      setTotal(Props.price * Props.quantity)
      
    }, [cart])
    
     const handleplus =  () => {
       handleQuantityChange(Props.id, Props.quantity + 1)
      // setTotal(Props.price * Props.quantity)

  
    }
    const handleminus = () => {
      handleQuantityChange(Props.id, Props.quantity - 1)}
  return (
    <div>
      <div className="bg-white px-2 rounded-lg w-full h-[80px] flex items-center justify-between ">
        <div className="flex items-center gap-2 font-bold">
          <button onClick={() => Dispatch(removeitem(Props.id)) } className="bg-black rounded-full p-1  cursor-grab">
            <img src={cross} className=""  width={18} height={18} alt="product_img" />

          </button>

          <img src={Props.img} className="size-[80px] bg-cover p-1" alt="product_img" />
          <div className="flex flex-col gap-1">
            <p>{Props.name}</p>
            <p>${Props.price}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1  items-end">
          <div className="flex gap-1">
            <button onClick={handleplus}>
              <img src={plus} width={20} height={20} alt="" />
            </button>
            <p>{Props.quantity}</p>
            <button onClick={handleminus}  disabled={Props.quantity <= 1}>
              <img src={minus} width={20} height={20} alt="" />
            </button>
          </div>
          <p className="font-semibold text-gray-400">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default Productadd;
